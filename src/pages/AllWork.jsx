import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { Nav } from "../components/common/Nav";
import { works } from "./work";
import { slugify } from "../utils/slug";

gsap.registerPlugin(SplitText);

// --- Desktop gallery motion tuning --------------------------------------
const SMOOTH = 0.085;
const WHEEL = 1.2;
const DRAG = 1.4;
const MAX_TILT = 9;
const PERSPECTIVE = 900;
const INTRO = 0.55;

const clamp = gsap.utils.clamp;

const Works = () => {
  const pageRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    document.title = "Works — Prem Maurya";
    return () => {
      document.title = "portfolio";
    };
  }, []);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!page || !viewport || !track) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Keep the heading/card intro on every screen size.
    let splitHeading;
    const introContext = gsap.context(() => {
      const q = gsap.utils.selector(page);
      const cards = q(".works-card");

      splitHeading = new SplitText(q(".works-heading"), {
        type: "words,lines",
        linesClass: "line",
        mask: "lines",
      });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(splitHeading.lines, {
          yPercent: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.08,
        })
        .from(q(".works-count"), { y: 30, opacity: 0, duration: 1 }, "-=0.9")
        .from(cards, { opacity: 0, duration: 1, stagger: 0.08 }, "-=1");
    }, pageRef);

    // The custom horizontal gallery exists only above 1024px.
    // On mobile/tablet, the cards remain in normal document flow and use native vertical scrolling.
    const media = gsap.matchMedia();

    media.add("(min-width: 1025px)", () => {
      const cards = gsap.utils.toArray(page.querySelectorAll(".works-card"));
      const state = {
        target: 0,
        current: 0,
        max: 0,
        dragging: false,
        lastX: 0,
        moved: 0,
      };
      let lastTilt = 0;

      gsap.set(cards, { transformPerspective: PERSPECTIVE });
      const setX = gsap.quickSetter(track, "x", "px");

      const measure = () => {
        state.max = Math.max(0, track.scrollWidth - viewport.clientWidth);
        state.target = clamp(0, state.max, state.target);
      };

      measure();

      // Preserve the original desktop gallery entrance.
      state.current = reduceMotion ? 0 : -viewport.clientWidth * INTRO;
      setX(-state.current);

      const tick = () => {
        const diff = state.target - state.current;
        state.current += Math.abs(diff) < 0.05 ? diff : diff * SMOOTH;
        setX(-state.current);

        const tilt = reduceMotion
          ? 0
          : clamp(-MAX_TILT, MAX_TILT, diff * 0.03);

        if (tilt !== lastTilt) {
          gsap.set(cards, {
            rotateY: tilt,
            scale: 1 + Math.abs(tilt) / 180,
          });
          lastTilt = tilt;
        }
      };

      gsap.ticker.add(tick);

      const onWheel = (event) => {
        event.preventDefault();
        const delta =
          Math.abs(event.deltaX) > Math.abs(event.deltaY)
            ? event.deltaX
            : event.deltaY;
        state.target = clamp(
          0,
          state.max,
          state.target + delta * (event.deltaMode === 1 ? 32 : 1) * WHEEL
        );
      };

      const onPointerDown = (event) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        state.dragging = true;
        state.lastX = event.clientX;
        state.moved = 0;
      };

      const onPointerMove = (event) => {
        if (!state.dragging) return;
        const deltaX = event.clientX - state.lastX;
        state.lastX = event.clientX;
        state.moved += Math.abs(deltaX);
        state.target = clamp(
          0,
          state.max,
          state.target - deltaX * DRAG
        );
      };

      const onPointerUp = () => {
        state.dragging = false;
      };

      // Prevent a drag gesture from accidentally opening a project.
      const onClickCapture = (event) => {
        if (state.moved > 6) {
          event.preventDefault();
          event.stopPropagation();
        }
        state.moved = 0;
      };

      const onKeyDown = (event) => {
        if (event.key === "ArrowRight") {
          state.target = clamp(
            0,
            state.max,
            state.target + viewport.clientWidth * 0.3
          );
        }
        if (event.key === "ArrowLeft") {
          state.target = clamp(
            0,
            state.max,
            state.target - viewport.clientWidth * 0.3
          );
        }
      };

      page.addEventListener("wheel", onWheel, { passive: false });
      viewport.addEventListener("pointerdown", onPointerDown);
      viewport.addEventListener("click", onClickCapture, true);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
      window.addEventListener("keydown", onKeyDown);

      const resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(track);
      resizeObserver.observe(viewport);

      // This cleanup also runs when resizing across the 1024px breakpoint.
      return () => {
        gsap.ticker.remove(tick);
        page.removeEventListener("wheel", onWheel);
        viewport.removeEventListener("pointerdown", onPointerDown);
        viewport.removeEventListener("click", onClickCapture, true);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
        window.removeEventListener("keydown", onKeyDown);
        resizeObserver.disconnect();

        // Remove desktop-only transforms before switching to the vertical layout.
        gsap.set(track, { clearProps: "transform" });
        gsap.set(cards, { clearProps: "transform,transformPerspective" });
      };
    });

    return () => {
      media.revert();
      splitHeading?.revert();
      introContext.revert();
    };
  }, []);

  return (
    <>
      <Nav reveal isLight progress={1} />

      <div
        ref={pageRef}
        className="flex min-h-screen flex-col select-none overflow-x-hidden bg-[#ece8e1] text-[#2a2622] min-[1025px]:h-screen min-[1025px]:min-h-0 min-[1025px]:overflow-hidden min-[1025px]:pl-18"
      >
        <header className="flex items-start justify-between px-5 pt-[12vh] sm:px-[4.5vw] md:pt-[10vh] min-[1025px]:pt-[4vh]">
          <h1 className="works-heading pb-2 font-editorial text-[clamp(2.2rem,9vw,5rem)] uppercase leading-none tracking-[-0.03em] min-[1025px]:text-[clamp(3.5rem,9vw,9rem)]">
            All Work
          </h1>
          <span className="works-count font-editorial text-[clamp(2.2rem,9vw,5rem)] leading-none tracking-[-0.03em] min-[1025px]:text-[clamp(3.5rem,9vw,9rem)]">
            ({works.length})
          </span>
        </header>

        {/* Mobile: normal vertical page flow. Desktop: animated horizontal gallery. */}
        <div
          ref={viewportRef}
          className="relative mt-[3vh] w-full flex-none overflow-visible px-5 pb-10 sm:px-[4.5vw] min-[1025px]:min-h-0 min-[1025px]:flex-1 min-[1025px]:cursor-grab min-[1025px]:overflow-hidden min-[1025px]:px-0 min-[1025px]:pb-0 min-[1025px]:touch-none min-[1025px]:active:cursor-grabbing"
        >
          <div
            ref={trackRef}
            className="flex w-full flex-col items-start gap-9 min-[1025px]:w-max min-[1025px]:flex-row min-[1025px]:gap-[2.2vw] min-[1025px]:px-[4.5vw] min-[1025px]:will-change-transform"
          >
            {works.map((work, index) => (
              <Link
                key={work.title}
                to={`/works/${slugify(work.title)}`}
                draggable={false}
                className="works-card group block w-full shrink-0 min-[1025px]:w-[20.3vw] min-[1025px]:min-w-[170px] min-[1025px]:max-w-[380px]"
              >
                <div
                  className={`overflow-hidden ${
                    index % 2 === 0 ? "aspect-[278/220]" : "aspect-[278/320]"
                  }`}
                >
                  <img
                    src={work.previewImage}
                    alt={work.title}
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                  />
                </div>

                <div className="mt-[1.2vh] flex items-start gap-3">
                  <span className="font-editorial text-[clamp(1.8rem,3.4vw,3.4rem)] leading-none">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <div className="pt-[0.35em]">
                    <div className="text-[0.68rem] uppercase tracking-[0.04em] opacity-70">
                      {work.category} — {work.year}
                    </div>
                    <div className="mt-1 text-[0.95rem] font-medium">
                      {work.title}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Works;
