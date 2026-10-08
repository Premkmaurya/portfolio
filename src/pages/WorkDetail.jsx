import { useEffect, useLayoutEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { Nav } from "../components/common/Nav";
import { works } from "./work"; // same data file AllWork.jsx reads
import { slugify } from "../utils/slug";

gsap.registerPlugin(SplitText);

const HERO_FROM = "inset(39% 51% 61% 49%)"; // hero image starts as a smaller box, then fills the panel
const HERO_TO = "inset(0% 0% 0% 0%)";
const LABEL = "text-[0.7rem] uppercase tracking-[0.04em]";
const COLS = "grid grid-cols-[38%_1fr]";

const Detail = ({ work, next }) => {
    const pageRef = useRef(null);

    // Optional: add `images: [...]` to a project to fill the scrolling column.
    const images = work.images?.length ? work.images : [work.previewImage];
    const stack = (work.additionalInfo?.technologies || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    const link = work.additionalInfo?.link;

    const rows = [
        ["Category", work.category],
        ["Year", work.year],
        ["Duration", work.additionalInfo?.duration],
    ].filter(([, value]) => value);

    useEffect(() => {
        document.title = `${work.title} — Prem Maurya`;
        return () => {
            document.title = "portfolio";
        };
    }, [work.title]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const q = gsap.utils.selector(pageRef);

            // Same split as Loader.jsx: lines, each one masked so text rises out of a clip
            const splitOpts = { type: "words,lines", linesClass: "line", mask: "lines" };
            const splitTitle = new SplitText(q(".detail-title"), splitOpts);
            const splitOverview = new SplitText(q(".detail-overview"), splitOpts);

            gsap
                .timeline({ defaults: { ease: "power3.out" } })
                // right column: hero image opens from a smaller box to fill the panel
                .fromTo(q(".detail-hero"), { clipPath: HERO_FROM }, { clipPath: HERO_TO, duration: 1.5, ease: "power3.inOut" }, 0)
                .fromTo(q(".detail-hero img"), { scale: 1.25 }, { scale: 1, duration: 1.5, ease: "power3.inOut" }, 0)
                // left column, top to bottom
                .from(q(".detail-back"), { x: -14, opacity: 0, duration: 0.8 }, 0.15)
                .from(splitTitle.lines, { yPercent: 100, opacity: 0, duration: 1.2, stagger: 0.08 }, 0.1)
                .from(q(".detail-label"), { opacity: 0, duration: 0.8, stagger: 0.1 }, 0.4)
                .from(splitOverview.lines, { yPercent: 100, opacity: 0, duration: 1, stagger: 0.06 }, 0.5)
                .from(q(".detail-row"), { y: 20, opacity: 0, duration: 0.9, stagger: 0.07 }, 0.65)
                .from(q(".detail-next"), { y: 30, opacity: 0, duration: 1 }, 0.9);

            return () => {
                splitTitle.revert();
                splitOverview.revert();
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
                className="grid h-screen grid-cols-2 overflow-hidden bg-[#f9f8f4] pl-16 text-[#2a2622] sm:pl-18"
            >
                {/* LEFT: fixed information column */}
                <div className="flex min-h-0 flex-col overflow-y-auto px-[4.5vw] pb-[5vh] pt-[8vh]">
                    <Link to="/works" className="detail-back w-fit items-center gap-2 text-[0.95rem] inline-flex">
                        <FiArrowLeft className="h-4 w-4" />
                        Back
                    </Link>

                    <h1 className="detail-title mt-[1.5vh] font-editorial text-[clamp(2rem,5.6vw,6rem)] uppercase leading-[1.02] tracking-[-0.02em]">
                        {work.title}
                    </h1>

                    <div className={`mt-[7vh] ${COLS}`}>
                        <span className={`detail-label ${LABEL}`}>Overview</span>
                        <p className="detail-overview max-w-[26rem] text-[0.95rem] leading-[1.5]">
                            {work.description}
                        </p>
                    </div>

                    <div className={`mt-[4vh] ${COLS}`}>
                        <span className={`detail-label ${LABEL}`}>Details</span>
                        <ul>
                            {rows.map(([label, value]) => (
                                <li
                                    key={label}
                                    className="detail-row grid grid-cols-2 border-t border-[#2a2622]/40 py-3 text-[0.95rem]"
                                >
                                    <span>{label}</span>
                                    <span>{value}</span>
                                </li>
                            ))}
                            {link && (
                                <li className="detail-row grid grid-cols-2 border-t border-[#2a2622]/40 py-3 text-[0.95rem]">
                                    <span>Preview</span>
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex w-fit items-center gap-1.5"
                                    >
                                        See It Live
                                        <FiArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1" />
                                    </a>
                                </li>
                            )}
                            {stack.length > 0 && (
                                <li className="detail-row grid grid-cols-2 border-t border-[#2a2622]/40 py-3 text-[0.95rem]">
                                    <span>Stack</span>
                                    <span className="flex flex-col">
                                        {stack.map((tech) => (
                                            <span key={tech}>{tech}</span>
                                        ))}
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>

                    {next && (
                        <div className={`detail-next mt-auto pt-[5vh] ${COLS}`}>
                            <span className={`detail-label ${LABEL} pt-[1.1em]`}>Next Projects</span>
                            <Link
                                to={`/works/${slugify(next.title)}`}
                                className="group inline-flex w-fit items-center gap-3 text-[clamp(1.8rem,3.4vw,3.2rem)] font-light leading-none tracking-[-0.02em]"
                            >
                                {next.title}
                                <FiArrowRight className="h-[0.6em] w-[0.6em] -translate-x-2 opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0 group-hover:opacity-100" />
                            </Link>
                        </div>
                    )}
                </div>

                {/* RIGHT: images scroll on their own */}
                <div className="h-screen min-h-0 overflow-y-auto bg-[#ece8e1]">
                    {images.map((src, i) =>
                        i === 0 ? (
                            <div
                                key={src + i}
                                className="detail-hero h-screen w-full overflow-hidden"
                                style={{ clipPath: HERO_FROM }}
                            >
                                <img src={src} alt={work.title} draggable={false} className="h-full w-full object-cover" />
                            </div>
                        ) : (
                            <img key={src + i} src={src} alt={`${work.title} ${i + 1}`} draggable={false} className="block h-auto w-full" />
                        )
                    )}
                </div>
            </div>
        </>
    );
};

const WorkDetail = () => {
    const { slug } = useParams();
    const index = works.findIndex((w) => slugify(w.title) === slug);

    if (index === -1) {
        return (
            <>
                <Nav reveal isLight progress={1} />
                <div className="flex h-screen flex-col items-start justify-center gap-4 bg-[#f9f8f4] pl-24 text-[#2a2622]">
                    <p className="font-editorial text-5xl">Project not found</p>
                    <Link to="/works" className="inline-flex items-center gap-2 text-[0.95rem]">
                        <FiArrowLeft className="h-4 w-4" /> Back to all work
                    </Link>
                </div>
            </>
        );
    }

    const next = works.length > 1 ? works[(index + 1) % works.length] : null;
    // key = remount per project, so the animation and SplitText restart cleanly
    return <Detail key={slug} work={works[index]} next={next} />;
};

export default WorkDetail;