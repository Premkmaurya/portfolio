import React, { useLayoutEffect, useRef } from "react";
import { FiExternalLink } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import ScrollExpand from "../common/ScrollExpand"

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

const Work = () => {
  const sectionRef = useRef(null);
  const featuredRef = useRef(null);
  const projectsRef = useRef(null);

  // useLayoutEffect(() => {
  //   const scroller = getScrollParent(sectionRef.current);

  //   const ctx = gsap.context(() => {
  //     const q = gsap.utils.selector(sectionRef);

  //     // Same split as Loader.jsx: lines, each one masked so text rises out of a clip
  //     const splitOpts = { type: "words,lines", linesClass: "line", mask: "lines" };
  //     const splitFeatured = new SplitText(featuredRef.current, splitOpts);
  //     const splitProjects = new SplitText(q(".work-project-text"), splitOpts);
  //     const splitButton = new SplitText(q(".work-btn-text"), splitOpts);

  //     const tl = gsap.timeline({
  //       defaults: { ease: "power3.out" },
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         scroller,
  //         start: "top 70%",
  //         toggleActions: "play none none reverse",
  //         invalidateOnRefresh: true,
  //         markers: true, // remove once the start marker sits on the section's top edge
  //       },
  //     });

  //     tl.from(splitFeatured.lines, { yPercent: 100, opacity: 0, duration: 1, stagger: 0.08 })
  //       .from(
  //         splitProjects.lines,
  //         { yPercent: 100, opacity: 0, duration: 1.2, stagger: 0.1 },
  //         "-=0.6"
  //       )
  //       .from(splitButton.lines, { yPercent: 100, opacity: 0, duration: 1, stagger: 0.08 }, "-=0.6")
  //       .from(q(".work-btn-arrow"), { opacity: 0, x: -12, duration: 0.8 }, "<0.2");

  //     return () => {
  //       splitFeatured.revert();
  //       splitProjects.revert();
  //       splitButton.revert();
  //     };
  //   }, sectionRef);

  //   // Re-measure when layout above Work changes (portrait image, fonts loading)
  //   let raf;
  //   const refresh = () => {
  //     cancelAnimationFrame(raf);
  //     raf = requestAnimationFrame(() => ScrollTrigger.refresh());
  //   };
  //   const content = scroller === window ? document.body : scroller.firstElementChild;
  //   const ro = new ResizeObserver(refresh);
  //   if (content) ro.observe(content);
  //   document.fonts?.ready.then(refresh);

  //   return () => {
  //     cancelAnimationFrame(raf);
  //     ro.disconnect();
  //     ctx.revert();
  //   };
  // }, []);

  return (
    <div className="flex min-w-screen">
      <div className="w-screen h-full">
        <ScrollExpand
          src="/mine.png"
          alt="Prem Maurya"
          title="Crafting Digital Experiences"
          scrollHint="Scroll to reveal"
          useWindowScroll
          startWidth={42}
          startHeight={58}
          startRadius={24}
          mediaZoom={1.35}
          className="w-screen text-[#F3EEE8]"
        >
          <h2 className="font-[--pp-editorial-old-ultrabold] text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-[-0.04em] text-[#F3EEE8]">
            Let's build<br />something great
          </h2>
          <p className="mt-4 text-[clamp(1rem,1.5vw,1.4rem)] leading-[1.3] text-[#F3EEE8]/80 max-w-[32rem]">
            Open for collaborations and new opportunities.
          </p>
        </ScrollExpand>
      </div>
      <section
        ref={sectionRef}
        className="w-screen h-screen ml-6 flex flex-row"
      >
        <div className="h-full w-[55%] flex py-10 items-end justify-center">
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
            ref={projectsRef}
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
  );
};

export default Work;