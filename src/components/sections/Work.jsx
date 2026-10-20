import { useLayoutEffect, useRef, useState } from "react";
import { FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useNavigate } from "react-router-dom";

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

const headings = [
  {
    title: "StudySync",
    previewImage: "/studySync.png",
    description:
      "A comprehensive platform for collaborative learning and educational resources.",
    additionalInfo: {
      technologies: "React, Node.js, Express, MongoDB",
      duration: "3 weeks",
      link: "https://study-sync-ten-lake.vercel.app/",
    },
  },
  {
    title: "Spotify",
    previewImage: "/spotify.png",
    description:
      "A music streaming platform for discovering and listening to songs.",
    additionalInfo: {
      technologies: "React, Node.js, Express, MongoDB",
      duration: "2 weeks",
      link: "https://spotify-ebon-one.vercel.app/",
    },
  },
  {
    title: "UltraPath",
    previewImage: "/ultrapath.png",
    description:
      "A navigation app for finding the best routes and getting real-time traffic updates.",
    additionalInfo: {
      technologies: "React, Node.js, Express, MongoDB",
      duration: "1 month",
      link: "https://lab-report-theta.vercel.app/",
    },
  },
  {
    title: "Timeflow",
    previewImage: "/timeflow.png",
    description:
      "A time management tool for tracking overtime and improving productivity.",
    additionalInfo: {
      technologies: "React, Node.js, Express, MongoDB",
      duration: "1 week",
      link: "https://timeflow-frontend-rsb5.onrender.com/",
    },
  },
];

// --- image reveal tuning --------------------------------------------------
const ENTER_FROM = "right"; // which side the Work section slides in from: "left" | "right"
const SCROLL_VH = 400; // scroll length of the whole sequence, in viewport heights
const HOLD = 0.3; // pause after the image is full-screen, before the section starts entering (timeline units)
const SLIDE = 0.8; // how much scroll the section needs to slide fully in (timeline units; image expand = 1)
const START = { w: 0, h: 0, r: 24 }; // image starts as nothing (w/h = 0) and grows from the center; r = corner radius px
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
  const [active, setActive] = useState(0); // project shown in the preview box (last hovered)

  const navigate = useNavigate();

  useLayoutEffect(() => {
    const scroller = getScrollParent(wrapRef.current);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);

      // Same split as Loader.jsx: lines, each one masked so text rises out of a clip
      const splitOpts = {
        type: "words,lines",
        linesClass: "line",
        mask: "lines",
      };
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
          ease: "power3.out",
        })
        .from(
          splitFeatured.lines,
          {
            duration: 1.2,
            yPercent: 100,
            opacity: 0,
            stagger: 0.08,
            ease: "power3.out",
          },
          "<",
        )
        .from(
          splitProjects.lines,
          {
            duration: 1.2,
            yPercent: 100,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.out",
          },
          "<",
        )
        .from(
          splitButton.lines,
          {
            duration: 1.2,
            yPercent: 100,
            opacity: 0,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          q(".work-btn-arrow"),
          {
            opacity: 1,
            x: -12,
            duration: 0.8,
            ease: "power3.out",
          },
          "<0.2",
        );

      let shown = false;
      const setShown = (on) => {
        if (on === shown) return;
        shown = on;
        on ? reveal.play() : reveal.reverse();
      };

      // ---- A) image reveal + section slide-in ----
      // matchMedia defines responsive scroll-driven motion:
      // - Desktop (≥ 768px): "THE" moves left, "WORK" moves right
      // - Mobile (< 768px): "THE" moves up, "WORK" moves down
      const mm = gsap.matchMedia();

      // ── DESKTOP (≥ 768px): horizontal split animation ──
      mm.add("(min-width: 768px)", () => {
        gsap.set([theRef.current, wordRef.current], {
          clearProps: "x,y,opacity",
        });

        const ease = "power2.inOut";
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

        tl.fromTo(
          frameRef.current,
          { clipPath: insetFrom },
          { clipPath: insetTo, duration: 1 },
          0,
        )
          .fromTo(imgRef.current, { scale: ZOOM }, { scale: 1, duration: 1 }, 0)
          // THE leaves to the left, WORK to the right, riding the image box edges outward
          .to(
            theRef.current,
            {
              x: () =>
                -(
                  (EDGE_VW / 100) * window.innerWidth +
                  (theRef.current?.offsetWidth || 0) +
                  40
                ),
              duration: 1,
            },
            0,
          )
          .to(
            wordRef.current,
            {
              x: () =>
                (EDGE_VW / 100) * window.innerWidth +
                (wordRef.current?.offsetWidth || 0) +
                40,
              duration: 1,
            },
            0,
          )
          // hold on the full-screen image before the section enters
          .to({}, { duration: HOLD })
          // the Work section slides in from the side, tied 1:1 to your scroll
          .fromTo(
            sectionRef.current,
            { xPercent: ENTER_FROM === "left" ? -100 : 100 },
            { xPercent: 0, duration: SLIDE, ease: "none" },
          );

        return () => {
          gsap.set([theRef.current, wordRef.current], {
            clearProps: "x,y,opacity",
          });
        };
      });

      // ── MOBILE (< 768px): vertical split animation (THE ↑, WORK ↓) ──
      mm.add("(max-width: 767px)", () => {
        gsap.set([theRef.current, wordRef.current], {
          clearProps: "x,y,opacity",
        });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
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

        tl.fromTo(
          frameRef.current,
          { clipPath: insetFrom },
          { clipPath: insetTo, duration: 1 },
          0,
        )
          .fromTo(imgRef.current, { scale: ZOOM }, { scale: 1, duration: 1 }, 0)
          // THE moves upward (negative y) to exit the top of the screen
          .to(
            theRef.current,
            {
              y: () =>
                -(
                  window.innerHeight * 0.5 +
                  (theRef.current?.offsetHeight || 0) +
                  40
                ),
              duration: 1,
            },
            0,
          )
          // WORK moves downward (positive y) to exit the bottom of the screen
          .to(
            wordRef.current,
            {
              y: () =>
                window.innerHeight * 0.5 +
                (wordRef.current?.offsetHeight || 0) +
                40,
              duration: 1,
            },
            0,
          )
          // hold on the full-screen image
          .to({}, { duration: HOLD })
          // section slides in
          .fromTo(
            sectionRef.current,
            { xPercent: ENTER_FROM === "left" ? -100 : 100 },
            { xPercent: 0, duration: SLIDE, ease: "none" },
          );

        return () => {
          gsap.set([theRef.current, wordRef.current], {
            clearProps: "x,y,opacity",
          });
        };
      });

      return () => {
        splitFeatured.revert();
        splitProjects.revert();
        splitButton.revert();
        mm.revert();
      };
    }, wrapRef);

    // Re-measure when layout above Work changes (portrait image, fonts loading)
    let raf;
    const refresh = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const content =
      scroller === window ? document.body : scroller.firstElementChild;
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
    <div
      ref={wrapRef}
      className="relative w-screen"
      style={{ height: `${100 + SCROLL_VH}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#faf9f6] selection:bg-[#3A3632] selection:text-[#FAF9F6]">
        {/* IMAGE: full-screen, shown through a clip-path that grows to the whole screen */}
        <div
          ref={frameRef}
          className="absolute inset-0"
          style={{ clipPath: insetFrom }}
        >
          <img
            ref={imgRef}
            src="/mine.png"
            alt="Prem Maurya"
            draggable={false}
            className="h-full w-full object-cover will-change-transform"
            style={{ transform: `scale(${ZOOM})` }}
          />
        </div>

        {/*
          THE WORK heading:
          - Mobile (< 768px): flex-col, "THE" centered directly above "WORK"
          - Desktop (≥ 768px): md:flex-row, "THE" and "WORK" in a single horizontal row with balanced gap
          - GSAP scroll-driven motion:
            * Mobile: "THE" moves upward (negative y), "WORK" moves downward (positive y)
            * Desktop: "THE" moves left (negative x), "WORK" moves right (positive x)
        */}
        <div className="pointer-events-none absolute inset-0 z-[5] flex flex-col md:flex-row items-center justify-center gap-1 sm:gap-2 md:gap-[2vw]">
          <span
            ref={theRef}
            className="block select-none whitespace-nowrap font-[--pp-editorial-old-ultrabold] text-[18vw] md:text-[5.5vw] font-bold leading-none text-[#111] will-change-transform"
          >
            THE
          </span>
          <span
            ref={wordRef}
            className="block select-none whitespace-nowrap font-[--pp-editorial-old-ultrabold] text-[18vw] md:text-[5.5vw] font-bold leading-none text-[#111] will-change-transform"
          >
            WORK
          </span>
        </div>

        {/* WORK SECTION: starts off-screen, slides in with the scroll once the image is full-screen */}
        <section
          ref={sectionRef}
          className="absolute inset-0 z-10 flex flex-col min-h-screen sm:flex-row bg-[#faf9f6] selection:bg-[#3A3632] selection:text-[#FAF9F6] pl-6"
        >
          <div className="preview-box h-0 sm:h-full w-0 sm:w-[55%] flex py-10 items-end justify-center">
            <div className="flex h-full w-[65%] flex-col justify-end gap-6">
              {/* Details of the active project (all stacked, the active one fades in) */}
              <div className="hidden sm:grid font-['Segoe UI'] text-[#111]">
                {headings.map((project, i) => (
                  <div
                    key={project.title}
                    aria-hidden={i !== active}
                    className={`col-start-1 row-start-1 flex flex-col gap-3 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                      i === active
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-3 opacity-0"
                    }`}
                  >
                    <span className="text-[0.775rem] tracking-[0.18em] opacity-60">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(headings.length).padStart(2, "0")}
                    </span>
                    <p className="max-w-[28rem] text-[1rem] leading-[1.45]">
                      {project.description}
                    </p>
                    <dl className="flex gap-10 text-[0.8rem]">
                      <div>
                        <dt className="opacity-50">Technologies</dt>
                        <dd>{project.additionalInfo.technologies}</dd>
                      </div>
                      <div>
                        <dt className="opacity-50">Duration</dt>
                        <dd>{project.additionalInfo.duration}</dd>
                      </div>
                    </dl>
                    <a
                      href={project.additionalInfo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={i === active ? 0 : -1}
                      className="about-link w-fit items-center gap-2 text-[0.85rem]"
                    >
                      Visit project
                      <FiArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                ))}
              </div>

              {/* Preview image: every project's image is stacked, the active one shows */}
              <div className="relative h-[50%] w-full hidden sm:block overflow-hidden border border-[#27232370]">
                {headings.map((project, i) => (
                  <img
                    key={project.title}
                    src={project.previewImage}
                    alt={project.title}
                    draggable={false}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                      i === active
                        ? "scale-100 opacity-100"
                        : "scale-110 opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="h-full w-full sm:w-[45%] px-5 py-2 sm:py-14">
            <p
              ref={featuredRef}
              className="font-['Segoe UI'] font-normal text-[0.775rem]"
            >
              FEATURED WORK
            </p>

            <div className="h-[75%] sm:h-[80%] mt-4 w-full font-[--pp-editorial-old-ultrabold]">
              {headings.map((project, index) => (
                <a
                  key={project.title}
                  href={project.additionalInfo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className={`group relative block h-[18%] sm:h-1/4 w-full overflow-hidden cursor-pointer ${
                    index !== headings.length - 1
                      ? "border-b border-[#1111114b]"
                      : ""
                  } text-[3.4rem] sm:text-[4rem]`}
                >
                  {/* Original text */}
                  <div className="relative">
                    <span
                      className="
                    work-project-text
                    relative z-0 block
                    font-semibold transition-transform duration-500
                    ease-[cubic-bezier(.22,1,.36,1)]
                    group-hover:-translate-y-full
                  "
                    >
                      {project.title}
                    </span>

                    {/* Hover text */}
                    <span
                      className="
                    absolute left-0 top-full z-0 block
                    font-semibold transition-transform duration-500
                    ease-[cubic-bezier(.22,1,.36,1)]
                    group-hover:-translate-y-full
                  "
                    >
                      {project.title}
                    </span>
                  </div>

                  <FiExternalLink
                    className="
                  opacity-0 absolute right-10 top-[30%]
                  translate-x-1/2
                  w-8 h-8
                  sm:h-10 sm:w-10
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
                </a>
              ))}
            </div>

            <div className="h-[25%] sm:h-[20%] w-full flex items-center justify-end gap-4 px-10">
              <button
                className="project-btn cursor-pointer"
                onClick={() => navigate("/works")}
              >
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
