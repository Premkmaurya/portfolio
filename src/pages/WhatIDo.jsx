import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

const services = [
  {
    number: "01",
    title: "WEB DEVELOPMENT",
    description:
      "Fast, responsive websites and web applications built with clean code, strong UX, and modern technologies.",
    image: "/web-development.webp",
  },
  {
    number: "02",
    title: "UI/UX DESIGN",
    description:
      "Interfaces designed around clarity, usability, visual hierarchy, and a smooth interaction experience.",
    image: "/product-design.webp",
  },
  {
    number: "03",
    title: "CREATIVE DEVELOPMENT",
    description:
      "Interactive digital experiences combining animation, motion, WebGL, and thoughtful frontend engineering.",
    image: "/design.webp",
  },
  {
    number: "04",
    title: "FULL-STACK DEVELOPMENT",
    description:
      "Complete products built from frontend to backend, APIs, databases, authentication, and deployment.",
    image: "/development.webp",
  },
];

const WhatIDo = () => {
  const wrapRef = useRef(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const scroller = getScrollParent(wrapRef.current);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => {
        const parentWidth =
          track.parentElement?.clientWidth || window.innerWidth;

        return -(track.scrollWidth - parentWidth + 40);
      };

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller,
          start: "top top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      id="what-i-do"
      ref={wrapRef}
      className="what-i-do-section relative w-full h-auto sm:h-[300vh]"
    >
      <section
        ref={sectionRef}
        className="relative h-auto min-h-screen w-full flex flex-col md:sticky md:top-0 md:h-screen md:flex-row bg-[#3A3632] text-[#f4f0e8] overflow-hidden"
      >
        {/* Intro */}
        <div className="what-intro flex w-full shrink-0 flex-col justify-between px-5 py-8 md:ml-[10vw] md:h-[90%] md:w-[30vw] md:min-w-[260px] md:px-0 md:py-8 md:z-10">
          <p className="mb-4 text-[10px] uppercase tracking-[0.15em] text-white/50">
            What I do
          </p>

          <p className="font-sans text-[clamp(1.2rem,2vw,2rem)] leading-[1.15] tracking-[-0.03em]">
            I build digital experiences with clarity,
            <br />
            motion, and intention.
          </p>
        </div>

        {/* Horizontal cards */}
        <div className="min-h-screen sm:h-full flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-auto w-full flex-col items-center gap-5 sm:px-5 px-0 py-8 md:h-full md:w-max md:flex-row md:items-center md:gap-6 md:px-12 md:py-0"
          >
            {services.map((service) => (
              <article
                key={service.number}
                className="group service-card relative h-[360px] w-full max-w-[460px] shrink-0 overflow-hidden border-r border-white/15 md:h-[85vh] md:w-[32vw] md:min-w-[330px]"
              >
                <div className="absolute inset-0 z-0 h-full w-full bg-cover bg-center overflow-hidden">
                  <img
                    className="w-full h-full object-cover opacity-50"
                    src={service.image || "/mine.png"}
                    alt={service.title}
                  />
                  <div className="absolute inset-0 bg-[#3A3632] transition-transform duration-500 ease-in-out group-hover:-translate-y-full" />
                </div>
                <div className="absolute inset-0 z-10 h-full w-full bg-cover flex flex-col justify-between bg-center bg-transparent py-8 px-6 text-[#f4f0e8] transition-colors duration-500 ease-in-out">
                  {/* Number */}
                  <div>
                    <span
                      style={{ fontWeight: 300 }}
                      className="font-editorial font-light text-[clamp(3.5rem,6vw,6rem)] leading-none tracking-[-0.05em] transition-colors duration-500 ease-in-out"
                    >
                      {service.number}
                    </span>
                  </div>

                  {/* Main title & Description */}
                  <div>
                    <h3
                      style={{ fontWeight: 300 }}
                      className="service-title font-editorial font-light text-[clamp(1.8rem,3vw,3.2rem)] uppercase leading-[0.9] tracking-[-0.045em] transition-colors duration-500 ease-in-out"
                    >
                      {service.title}
                    </h3>
                    <p
                      style={{ fontWeight: 300 }}
                      className="max-w-[340px] mt-2 text-[0.78rem] font-light leading-[1.4] text-white/80 transition-colors duration-500 ease-in-out"
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatIDo;
