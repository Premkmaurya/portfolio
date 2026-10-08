import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { Nav } from "../components/common/Nav";
import { works } from "./work";
import { slugify } from "../utils/slug";

gsap.registerPlugin(SplitText);

// --- motion tuning -------------------------------------------------------
const SMOOTH = 0.085; // 0-1, lower = floatier gallery
const WHEEL = 1.2; // wheel / trackpad speed multiplier
const DRAG = 1.4; // drag speed multiplier
const MAX_TILT = 9; // deg of 3D tilt at full speed
const PERSPECTIVE = 900; // px, per-card perspective
const INTRO = 0.55; // gallery sweeps in from this fraction of the screen width

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
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const s = { target: 0, current: 0, max: 0, dragging: false, lastX: 0, moved: 0 };
    let lastTilt = 0;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(page);
      const cards = q(".works-card");

      // ---- intro: same masked-line reveal as the Loader, then the cards fade in ----
      const splitHeading = new SplitText(q(".works-heading"), {
        type: "words,lines",
        linesClass: "line",
        mask: "lines",
      });
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(splitHeading.lines, { yPercent: 100, opacity: 0, duration: 1.2, stagger: 0.08 })
        .from(q(".works-count"), { y: 30, opacity: 0, duration: 1 }, "-=0.9")
        .from(cards, { opacity: 0, duration: 1, stagger: 0.08 }, "-=1");

      // ---- gallery: wheel / drag drives `target`, the ticker eases `current` toward it ----
      gsap.set(cards, { transformPerspective: PERSPECTIVE });
      const setX = gsap.quickSetter(track, "x", "px");

      const measure = () => {
        s.max = Math.max(0, track.offsetWidth - viewport.clientWidth);
        s.target = clamp(0, s.max, s.target);
      };
      measure();

      // start pushed to the right so the cards sweep in (the tilt below comes for free)
      s.current = reduce ? 0 : -viewport.clientWidth * INTRO;
      setX(-s.current);

      const tick = () => {
        const diff = s.target - s.current;
        s.current += Math.abs(diff) < 0.05 ? diff : diff * SMOOTH;
        setX(-s.current);

        // lag behind the target = speed. Tilt the cards in the direction of travel.
        const tilt = reduce ? 0 : clamp(-MAX_TILT, MAX_TILT, diff * 0.03);
        if (tilt !== lastTilt) {
          gsap.set(cards, { rotateY: tilt, scale: 1 + Math.abs(tilt) / 180 });
          lastTilt = tilt;
        }
      };
      gsap.ticker.add(tick);

      const onWheel = (e) => {
        e.preventDefault();
        const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        s.target = clamp(0, s.max, s.target + d * (e.deltaMode === 1 ? 32 : 1) * WHEEL);
      };
      const onDown = (e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        s.dragging = true;
        s.lastX = e.clientX;
        s.moved = 0;
      };
      const onMove = (e) => {
        if (!s.dragging) return;
        const dx = e.clientX - s.lastX;
        s.lastX = e.clientX;
        s.moved += Math.abs(dx);
        s.target = clamp(0, s.max, s.target - dx * DRAG);
      };
      const onUp = () => {
        s.dragging = false;
      };
      // a drag must not count as a click on a card
      const onClickCapture = (e) => {
        if (s.moved > 6) {
          e.preventDefault();
          e.stopPropagation();
        }
        s.moved = 0;
      };
      const onKey = (e) => {
        if (e.key === "ArrowRight") s.target = clamp(0, s.max, s.target + viewport.clientWidth * 0.3);
        if (e.key === "ArrowLeft") s.target = clamp(0, s.max, s.target - viewport.clientWidth * 0.3);
      };

      page.addEventListener("wheel", onWheel, { passive: false });
      viewport.addEventListener("pointerdown", onDown);
      viewport.addEventListener("click", onClickCapture, true);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
      window.addEventListener("keydown", onKey);

      const ro = new ResizeObserver(measure);
      ro.observe(track);
      ro.observe(viewport);

      return () => {
        gsap.ticker.remove(tick);
        page.removeEventListener("wheel", onWheel);
        viewport.removeEventListener("pointerdown", onDown);
        viewport.removeEventListener("click", onClickCapture, true);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        window.removeEventListener("keydown", onKey);
        ro.disconnect();
        splitHeading.revert();
      };
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* light rail on this page */}
      <Nav reveal isLight progress={1} />

      <div
        ref={pageRef}
        className="flex h-screen select-none flex-col overflow-hidden bg-[#ece8e1] pl-16 text-[#2a2622] sm:pl-18"
      >
        {/* Heading + count */}
        <header className="flex items-start justify-between px-[4.5vw] pt-[3vh]">
          <h1 className="works-heading pb-2 font-editorial text-[clamp(3.5rem,9vw,9rem)] uppercase leading-none tracking-[-0.03em]">
            All Work
          </h1>
          <span className="works-count font-editorial text-[clamp(3.5rem,9vw,9rem)] leading-none tracking-[-0.03em]">
            ({works.length})
          </span>
        </header>

        {/* Gallery: moves with wheel / trackpad / drag / arrow keys */}
        <div
          ref={viewportRef}
          className="relative mt-[3vh] min-h-0 flex-1 cursor-grab touch-none overflow-hidden active:cursor-grabbing"
        >
          <div
            ref={trackRef}
            className="flex w-max items-start gap-[2.2vw] px-[4.5vw] will-change-transform"
          >
            {works.map((work, index) => (
              <Link
                key={work.title}
                to={`/works/${slugify(work.title)}`}
                draggable={false}
                className="works-card group block w-[20.3vw] min-w-[170px] max-w-[380px] shrink-0"
              >
                {/* alternating short / tall images, tops aligned like the reference */}
                <div
                  className={`overflow-hidden ${index % 2 === 0 ? "aspect-[278/220]" : "aspect-[278/320]"
                    }`}
                >
                  <img
                    src={work.previewImage}
                    alt={work.title}
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                  />
                </div>

                {/* caption: big numeral, small category — year, project name */}
                <div className="mt-[1.2vh] flex items-start gap-3">
                  <span className="font-editorial text-[clamp(1.8rem,3.4vw,3.4rem)] leading-none">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <div className="pt-[0.35em]">
                    <div className="text-[0.68rem] uppercase tracking-[0.04em] opacity-70">
                      {work.category} — {work.year}
                    </div>
                    <div className="mt-1 text-[0.95rem] font-medium">{work.title}</div>
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