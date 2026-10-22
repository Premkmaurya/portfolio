import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { Loader } from "./components/common/Loader";
import { Nav } from "./components/common/Nav";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import About from "./components/sections/About";
import Work from "./components/sections/Work";
import WhatIDo from "./pages/WhatIDo";
import Footer from "./components/sections/Footer";

gsap.registerPlugin(SplitText, ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [navLight, setNavLight] = useState(false);

  const revealRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (loading) return;
    const scroller = revealRef.current;
    const hero = scroller.querySelector(".hero-section");

    const onScroll = () => {
      // Light nav across light sections (About, Work); dark nav on Hero and WhatIDo / Footer
      const whatIDo = scroller.querySelector(".what-i-do-section");
      const darkThreshold = whatIDo
        ? whatIDo.offsetTop
        : hero
          ? (hero.offsetHeight / 607) * 4900
          : 4900;

      const isPastHero =
        scroller.scrollTop >= hero.offsetHeight - scroller.clientHeight * 0.5;
      const isBeforeDark = scroller.scrollTop < darkThreshold;

      setNavLight(isPastHero && isBeforeDark);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set the correct color on load
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [loading]);

  useEffect(() => {
    if (loading) return;

    let cancelled = false;
    let lenis;
    let ctx;

    const initAnimations = async () => {
      // Wait for web fonts so SplitText calculates correct line breaks.
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      if (cancelled) return;

      const scroller = revealRef.current;
      const content = containerRef.current;

      if (!scroller || !content) return;

      lenis = new Lenis({
        wrapper: scroller,
        content,
        smoothWheel: true,
        smoothTouch: false,
        direction: "vertical",
        gestureDirection: "vertical",
        infinite: false,
        lerp: 0.05,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time) => lenis.raf(time * 1000);

      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      ctx = gsap.context(() => {
        const copy = scroller.querySelector(".reveal-copy");

        if (!copy) return;

        // Split only after fonts and initial layout are ready.
        const split = SplitText.create(copy, {
          type: "lines",
          linesClass: "line",
          mask: "lines",
        });

        const timeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        timeline
          .to(scroller, {
            y: 0,
            duration: 1.1,
            ease: "power3.inOut",
          })
          .from(
            ".reveal-title",
            {
              yPercent: 100,
              opacity: 0,
              duration: 1.1,
              stagger: 0.08,
            },
            "-=0.8",
          )
          .from(
            split.lines,
            {
              yPercent: 100,
              opacity: 0,
              duration: 1.1,
              stagger: 0.08,
            },
            "<",
          )
          .from(
            ".reveal-meta",
            {
              yPercent: 100,
              opacity: 0,
              duration: 1.1,
              stagger: 0.08,
            },
            "<",
          )
          .call(() => setReveal(true));

        // Recalculate line wrapping when the viewport changes.
        const refreshSplit = () => {
          split.revert();

          const updatedSplit = SplitText.create(copy, {
            type: "lines",
            linesClass: "line",
            mask: "lines",
          });

          gsap.set(updatedSplit.lines, {
            clearProps: "all",
          });

          ScrollTrigger.refresh();
        };

        // Avoid rebuilding the timeline on every resize.
        // Clean up the listener and split with the context.
        window.addEventListener("resize", refreshSplit);

        return () => {
          window.removeEventListener("resize", refreshSplit);
          split.revert();
        };
      }, scroller);
    };

    initAnimations();

    return () => {
      cancelled = true;

      if (ctx) ctx.revert();

      if (lenis) lenis.destroy();

      if (typeof tick !== "undefined") {
        gsap.ticker.remove(tick);
      }
    };
  }, [loading]);

  return (
    <>
      <Nav reveal={reveal} isLight={navLight} />
      <div className="h-full">
        <Loader setLoading={setLoading} reveal={reveal} />
        {!loading && (
          <div
            ref={revealRef}
            className="absolute inset-0 z-30 min-h-screen min-w-screen overflow-x-hidden overflow-y-auto translate-y-full"
          >
            <div
              ref={containerRef}
              className="h-full min-h-screen min-w-screen"
            >
              {/* Hero Section */}
              <div className="hero-section bg-[#3A3632] text-[#F3EEE8] selection:bg-[#FAF9F6] selection:text-[#3A3632] w-full shrink-0 min-h-screen h-full flex flex-col justify-between">
                <div className="mx-auto flex h-full max-w-[1700px] flex-col pl-4 sm:pl-24 md:pl-28 pr-6 sm:pr-10 md:pr-16 pb-5 pt-8">
                  <div className="flex flex-1 flex-col-reverse sm:flex-row items-start justify-between gap-8 pt-2 md:pt-[12vw] lg:pt-4">
                    <div className="flex flex-1 justify-end items-end w-full mb-4 sm:mb-0">
                      <h1 className="font-[--pp-editorial-old-ultrabold] leading-[0.72] tracking-[-0.08em] max-[361px]:text-[clamp(5rem,13vw,18rem)] text-[clamp(6rem,13vw,20rem)]">
                        <div className="overflow-hidden">
                          <span className="reveal-title block">PREM</span>
                        </div>
                        <div className="overflow-hidden">
                          <span className="reveal-title block">MAURYA</span>
                        </div>
                      </h1>
                    </div>

                    <div className="mt-6 flex max-w-[32rem] items-start justify-start sm:justify-end pt-2 md:mt-8 lg:mt-10">
                      <div className="text-[clamp(1.4rem,1.85vw,2.8rem)] leading-[1.1] tracking-[-0.04em] text-[#F3EEE8]">
                        <div className="overflow-hidden">
                          <span className="reveal-copy block">
                            I develop modern web applications using React,
                            Next.js, Node.js, and MongoDB, with a focus on
                            responsive interfaces, smooth animations, and AI
                            integrations.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-end justify-between gap-4 pb-3 pt-5 text-[#F3EEE8]">
                    <div className="text-[1.05rem] leading-tight tracking-[-0.03em] text-[#F3EEE8]/90">
                      <div className="mb-1 overflow-hidden">
                        <span className="reveal-meta block">
                          Lucknow, India
                        </span>
                      </div>
                      <div className="mb-1 overflow-hidden">
                        <span className="reveal-meta block">
                          (GMT+5:30) 02:13
                        </span>
                      </div>
                    </div>

                    <div className="text-center text-[1.2rem] block leading-tight tracking-[-0.04em] text-[#F3EEE8]/90">
                      <div className="mb-1 overflow-hidden">
                        <span className="reveal-meta block">Open for</span>
                      </div>
                      <div className="mb-1 overflow-hidden">
                        <span className="reveal-meta block">
                          collaborations
                        </span>
                      </div>
                    </div>

                    <div className="reveal-meta font-[--pp-editorial-old-ultrabold] text-[2rem] tracking-[0.12em] text-[#F3EEE8]">
                      SCROLL
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <About />
              {/* Work Section */}
              <Work />
              {/* what i do section */}
              <WhatIDo />
              {/* Footer Section */}
              <Footer />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
