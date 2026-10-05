import React, { useLayoutEffect, useRef } from "react";
import { FiExternalLink } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// App.jsx wraps every section in a div with `overflow-x-hidden`, which makes it
// the real scroll container (window never scrolls). ScrollTrigger must watch it.
const getScrollParent = (el) => {
  let node = el?.parentElement;
  while (node && node !== document.body) {
    const { overflowY } = getComputedStyle(node);
    if (overflowY === "auto" || overflowY === "scroll") return node;
    node = node.parentElement;
  }
  return window;
};

const headings = ["VEGE MONEY", "VEGE MONEY", "VEGE MONEY", "VEGE MONEY"];

// --- image reveal tuning --------------------------------------------------
const ENTER_FROM = "right"; // which side the Work section slides in from: "left" | "right"
const SCROLL_VH = 400; // scroll length of the whole sequence, in viewport heights
const HOLD = 0.3; // pause after the image is full-screen, before the section starts entering (timeline units)
const SLIDE = 0.8; // how much scroll the section needs to slide fully in (timeline units; image expand = 1)
const START = { w: 0, h: 0, r: 24 }; // image starts as nothing (w/h = 0) and grows from the center; r = corner radius px
const WORD_GAP = 1; // vw on each side of the center, so THE and WORK start close together
const ZOOM = 1.35; // image starts zoomed in, settles to 1

const insetFrom = `inset(${(100 - START.h) / 2}% ${(100 - START.w) / 2}% ${(100 - START.h) / 2}% ${(100 - START.w) / 2}% round ${START.r}px)`;
const insetTo = "inset(0% 0% 0% 0% round 0px)";
// the image box shrinks toward 0 edge distance; THE / WORK ride that edge outward
const EDGE_VW = (100 - START.w) / 2;
const TOTAL = 1 + HOLD + SLIDE;
const REVEAL_AT = (1 + HOLD + SLIDE * 0.7) / TOTAL; // text lines start once the section is ~70% in

const Work = () => {
  const wrapRef = useRef(null);
  const frameRef = useRef(null);
  const imgRef = useRef(null);
  const theRef = useRef(null);
  const wordRef = useRef(null);
  const sectionRef = useRef(null);
  const featuredRef = useRef(null);

  useLayoutEffect(() => {
    const scroller = getScrollParent(wrapRef.current);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);

      // Same split as Loader.jsx: lines, each one masked so text rises out of a clip
      const splitOpts = { type: "words,lines", linesClass: "line", mask: "lines" };
      const splitFeatured = new SplitText(featuredRef.current, splitOpts);
      const splitProjects = new SplitText(q(".work-project-text"), splitOpts);
      const splitButton = new SplitText(q(".work-btn-text"), splitOpts);

      // ---- B) Work section text reveal (time-based, plays once the section is mostly in) ----
      const reveal = gsap.timeline({ paused: true });

      reveal
        .from(".preview-box", {
          opacity: 0,
          yPercent: 100,
          duration: 1.2,
          ease: "power3.out"
        })
        .from(splitFeatured.lines, {
          duration: 1.2,
          yPercent: 100,
          opacity: 0,
          stagger: 0.08,
          ease: "power3.out",
        })
        .from(splitProjects.lines, {
          duration: 1.2,
          yPercent: 100,
          opacity: 0,
          stagger: 0.1,
          ease: "power3.out",
        }, "-=0.6")
        .from(splitButton.lines, {
          duration: 1.2,
          yPercent: 100,
          opacity: 0,
          stagger: 0.08,
          ease: "power3.out",
        }, "-=0.6")
        .from(q(".work-btn-arrow"), {
          opacity: 1,
          x: -12,
          duration: 0.8,
          ease: "power3.out",
        }, "<0.2");

      let shown = false;
      const setShown = (on) => {
        if (on === shown) return;
        shown = on;
        on ? reveal.play() : reveal.reverse();
      };

      // ---- A) image reveal + section slide-in, both driven by scroll (scrubbed) ----
      const ease = "power2.inOut"; // shared, so the words stay locked to the image edge
      const tl = gsap.timeline({
        defaults: { ease },
        scrollTrigger: {
          trigger: wrapRef.current,
          scroller,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setShown(self.progress >= REVEAL_AT),
        },
      });

      tl.fromTo(frameRef.current, { clipPath: insetFrom }, { clipPath: insetTo, duration: 1 }, 0)
        .fromTo(imgRef.current, { scale: ZOOM }, { scale: 1, duration: 1 }, 0)
        // THE leaves to the left, WORK to the right, starting flush against the image box
        .to(
          theRef.current,
          {
            x: () => -((EDGE_VW / 100) * window.innerWidth + theRef.current.offsetWidth + 40),
            duration: 1,
          },
          0
        )
        .to(
          wordRef.current,
          {
            x: () => (EDGE_VW / 100) * window.innerWidth + wordRef.current.offsetWidth + 40,
            duration: 1,
          },
          0
        )
        // hold on the full-screen image before the section enters
        .to({}, { duration: HOLD })
        // the Work section slides in from the side, tied 1:1 to your scroll
        .fromTo(
          sectionRef.current,
          { xPercent: ENTER_FROM === "left" ? -100 : 100 },
          { xPercent: 0, duration: SLIDE, ease: "none" }
        );

      return () => {
        splitFeatured.revert();
        splitProjects.revert();
        splitButton.revert();
      };
    }, wrapRef);

    // Re-measure when layout above Work changes (portrait image, fonts loading)
    let raf;
    const refresh = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const content = scroller === window ? document.body : scroller.firstElementChild;
    const ro = new ResizeObserver(refresh);
    if (content) ro.observe(content);
    document.fonts?.ready.then(refresh);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    // Tall wrapper = scroll length. The stage inside sticks to the top while you scroll through it.
    <div ref={wrapRef} className="relative w-screen" style={{ height: `${100 + SCROLL_VH}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#faf9f6]">
        {/* IMAGE: full-screen, shown through a clip-path that grows to the whole screen */}
        <div ref={frameRef} className="absolute inset-0" style={{ clipPath: insetFrom }}>
          <img
            ref={imgRef}
            src="/mine.png"
            alt="Prem Maurya"
            draggable={false}
            className="h-full w-full object-cover will-change-transform"
            style={{ transform: `scale(${ZOOM})` }}
          />
        </div>

        {/* THE (left of the image) and WORK (right of the image) */}
        <div
          className="pointer-events-none absolute inset-y-0 flex items-center"
          style={{ right: `${50 + START.w / 2 + WORD_GAP}vw` }}
        >
          <span
            ref={theRef}
            className="block select-none whitespace-nowrap font-[--pp-editorial-old-ultrabold] text-[5.5vw] font-bold leading-none text-[#111]"
          >
            THE
          </span>
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 flex items-center"
          style={{ left: `${50 + START.w / 2 + WORD_GAP}vw` }}
        >
          <span
            ref={wordRef}
            className="block select-none whitespace-nowrap font-[--pp-editorial-old-ultrabold] text-[5.5vw] font-bold leading-none text-[#111]"
          >
            WORK
          </span>
        </div>

        {/* WORK SECTION: starts off-screen, slides in with the scroll once the image is full-screen */}
        <section
          ref={sectionRef}
          className="absolute inset-0 z-10 flex flex-row bg-[#faf9f6] pl-6"
        >
          <div className="preview-box h-full w-[55%] flex py-10 items-end justify-center">
            <div className="relative w-[65%] h-[50%] border border-[#27232370]"></div>
          </div>

          <div className="h-full w-[45%] px-5 py-14">
            <p
              ref={featuredRef}
              className="font-['Segoe UI'] font-normal text-[0.775rem]"
            >
              FEATURED WORK
            </p>

            <div
              className="h-[80%] mt-4 w-full font-[--pp-editorial-old-ultrabold]"
            >
              {headings.map((heading, index) => (
                <div
                  key={index}
                  className={`group relative h-1/4 w-full overflow-hidden cursor-pointer ${index !== headings.length - 1
                    ? "border-b border-[#1111114b]"
                    : ""
                    } text-[4rem]`}
                >
                  {/* Original text */}
                  <div className="relative">
                    <span
                      className="
                    work-project-text
                    relative z-0 block
                    transition-transform duration-500
                    ease-[cubic-bezier(.22,1,.36,1)]
                    group-hover:-translate-y-full
                  "
                    >
                      {heading}
                    </span>

                    {/* Hover text */}
                    <span
                      className="
                    absolute left-0 top-full z-0 block
                    transition-transform duration-500
                    ease-[cubic-bezier(.22,1,.36,1)]
                    group-hover:-translate-y-full
                  "
                    >
                      {heading}
                    </span>
                  </div>

                  <FiExternalLink
                    className="
                  opacity-0 absolute right-10 top-[30%]
                  translate-x-1/2
                  h-10 w-10
                  transition-all duration-500
                  ease-[cubic-bezier(.22,1,.36,1)]
                  group-hover:opacity-100
                  group-hover:translate-x-0
                "
                  />

                  {/* Animated underline */}
                  {index !== headings.length - 1 && (
                    <span
                      className="
                    absolute bottom-0 left-0 z-10
                    h-[1px] w-full
                    origin-left scale-x-0
                    bg-[#111]
                    transition-transform duration-500
                    ease-[cubic-bezier(.22,1,.36,1)]
                    group-hover:scale-x-100
                  "
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="h-[20%] w-full flex items-center justify-end gap-4 px-10">
              <button className="project-btn">
                <span className="relative z-10 text-[1.3rem] flex items-center gap-4 font-['Segoe UI']">
                  <span className="work-btn-text">View Project</span>
                  <FaArrowRightLong className="work-btn-arrow w-5 h-5" />
                  <span className="project-btn-line" />
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Work;