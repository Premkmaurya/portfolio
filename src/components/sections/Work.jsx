import React, { useLayoutEffect, useRef } from "react";
import { FiExternalLink } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const headings = ["VEGE MONEY", "VEGE MONEY", "VEGE MONEY", "VEGE MONEY"];

const Work = () => {
  const sectionRef = useRef(null);
  const featuredRef = useRef(null);
  const projectsRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const projects = projectsRef.current.children;

      // Initial hidden state
      gsap.set(featuredRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(projects, {
        opacity: 0,
        y: 80,
      });

      gsap.set(buttonRef.current, {
        opacity: 0,
        y: 30,
      });

      // Reveal animation when Work section enters viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
          markers: true,
        },
      });

      tl.to(featuredRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      tl.to(projects, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      }, "-=0.2");

      tl.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
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
              <div>
                <span
                  className="
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
          <button ref={buttonRef} className="project-btn">
            <span className="relative z-10 text-[1.3rem] flex items-center gap-4 font-['Segoe UI']">
              View Project
              <FaArrowRightLong className="w-5 h-5" />
              <span className="project-btn-line" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Work;