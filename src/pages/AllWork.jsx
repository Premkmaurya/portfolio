import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight, FiExternalLink, FiGithub } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { Nav } from "../components/common/Nav";
import { works } from "./work";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = "ease-[cubic-bezier(.22,1,.36,1)]";
const TITLE_CLASS =
    "font-editorial leading-[1.1] tracking-[-0.03em] text-[clamp(2.4rem,6vw,5rem)]";


// All projects shown on /works. Edit this file to add, remove or reorder work.
// Empty `live` / `github` / `summary` / `tags` are simply not rendered.

const Works = () => {
    const pageRef = useRef(null);

    useEffect(() => {
        document.title = "Works — Prem Maurya";
        window.scrollTo(0, 0);
        return () => {
            document.title = "portfolio";
        };
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const q = gsap.utils.selector(pageRef);

            // Same split as Loader.jsx: lines, each one masked so text rises out of a clip
            const splitOpts = { type: "words,lines", linesClass: "line", mask: "lines" };
            const splitHeading = new SplitText(q(".works-heading"), splitOpts);
            const splitTitles = new SplitText(q(".works-title-text"), splitOpts);

            // Page header
            gsap
                .timeline({ defaults: { ease: "power3.out" } })
                .from(splitHeading.lines, { yPercent: 100, opacity: 0, duration: 1.2, stagger: 0.08 })
                .from(q(".works-head-fade"), { y: 20, opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.8");

            // Each row reveals as it scrolls into view (window scrolls on this page)
            q(".works-row").forEach((row) => {
                gsap
                    .timeline({
                        defaults: { ease: "power3.out" },
                        scrollTrigger: { trigger: row, start: "top 88%", once: true },
                    })
                    .from(
                        row.querySelector(".works-rule"),
                        { scaleX: 0, duration: 1.1, ease: "power3.inOut" },
                        0
                    )
                    .from(row.querySelectorAll(".works-title-text .line"), {
                        yPercent: 100,
                        opacity: 0,
                        duration: 1.1,
                    }, 0.1)
                    .from(
                        row.querySelectorAll(".works-fade"),
                        { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 },
                        0.3
                    );
            });

            return () => {
                splitHeading.revert();
                splitTitles.revert();
            };
        }, pageRef);

        // Fonts load after first paint; re-measure trigger positions when they do
        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready.then(refresh);

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* light rail on this page */}
            <Nav reveal isLight progress={1} />

            <div ref={pageRef} className="min-h-screen bg-[#faf9f6] pl-16 text-[#111] sm:pl-18">
                <div className="mx-auto max-w-[1500px] px-6 pb-24 pt-8 sm:px-10 md:px-16">
                    {/* Top bar */}
                    <div className="works-head-fade flex items-center justify-between text-[0.8rem] uppercase tracking-[0.18em]">
                        <Link to="/" className="about-link items-center gap-2">
                            <FiArrowLeft className="h-4 w-4" />
                            Home
                        </Link>
                        <span className="opacity-60">
                            {String(works.length).padStart(2, "0")} projects
                        </span>
                    </div>

                    {/* Heading */}
                    <div className="mb-14 mt-12 flex items-start gap-4 md:mb-20 md:mt-16">
                        <h1 className="works-heading pb-2 font-editorial text-[clamp(4rem,13vw,14rem)] leading-none tracking-[-0.06em]">
                            ALL WORKS
                        </h1>
                        <span className="works-head-fade mt-3 text-sm tracking-widest opacity-60 md:mt-6">
                            ({String(works.length).padStart(2, "0")})
                        </span>
                    </div>

                    {/* List */}
                    <div>
                        {works.map((work, index) => {
                            const href = work.live || work.github;
                            const TitleWrap = href ? "a" : "div";
                            const wrapProps = href
                                ? { href, target: "_blank", rel: "noopener noreferrer" }
                                : {};

                            return (
                                <article
                                    key={work.id}
                                    className="works-row group relative grid grid-cols-1 gap-y-6 py-8 md:grid-cols-12 md:gap-x-8 md:py-10"
                                >
                                    {/* faint rule + dark rule that draws in on hover (same as the Work section) */}
                                    <span className="works-rule pointer-events-none absolute left-0 top-0 h-px w-full origin-left bg-[#1111114b]" />
                                    <span
                                        className={`pointer-events-none absolute left-0 top-0 z-10 h-px w-full origin-left scale-x-0 bg-[#111] transition-transform duration-500 ${EASE} group-hover:scale-x-100`}
                                    />

                                    {/* Index + year */}
                                    <div className="works-fade text-sm tracking-widest md:col-span-1 md:pt-5">
                                        <div>{String(index + 1).padStart(2, "0")}</div>
                                        {work.year && <div className="mt-1 opacity-50">{work.year}</div>}
                                    </div>

                                    {/* Title with the same text-swap hover as the Work section */}
                                    <div className="relative md:col-span-6">
                                        <TitleWrap {...wrapProps} className="relative block overflow-hidden">
                                            <h2
                                                className={`works-title-text relative z-0 block transition-transform duration-500 ${EASE} group-hover:-translate-y-full ${TITLE_CLASS}`}
                                            >
                                                {work.title}
                                            </h2>
                                            <span
                                                aria-hidden="true"
                                                className={`absolute left-0 top-full z-0 block w-full transition-transform duration-500 ${EASE} group-hover:-translate-y-full ${TITLE_CLASS}`}
                                            >
                                                {work.title}
                                            </span>
                                        </TitleWrap>

                                        {href && (
                                            <FiArrowUpRight
                                                className={`pointer-events-none absolute right-2 top-[30%] h-9 w-9 translate-x-1/2 opacity-0 transition-all duration-500 ${EASE} group-hover:translate-x-0 group-hover:opacity-100`}
                                            />
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="flex flex-col gap-5 md:col-span-5 md:pt-3">
                                        {work.summary && (
                                            <p className="works-fade max-w-[34rem] text-[0.95rem] leading-[1.55] opacity-75">
                                                {work.summary}
                                            </p>
                                        )}

                                        {work.tags.length > 0 && (
                                            <ul className="works-fade flex flex-wrap gap-2">
                                                {work.tags.map((tag) => (
                                                    <li
                                                        key={tag}
                                                        className="rounded-full border border-[#1111114b] px-3 py-1 text-[0.72rem] tracking-wide"
                                                    >
                                                        {tag}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {(work.live || work.github) && (
                                            <div className="works-fade flex items-center gap-6 text-[0.85rem]">
                                                {work.live && (
                                                    <a
                                                        href={work.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="about-link items-center gap-2"
                                                    >
                                                        <FiExternalLink className="h-4 w-4" />
                                                        Live
                                                    </a>
                                                )}
                                                {work.github && (
                                                    <a
                                                        href={work.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="about-link items-center gap-2"
                                                    >
                                                        <FiGithub className="h-4 w-4" />
                                                        Code
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                        <div className="h-px w-full bg-[#1111114b]" />
                    </div>

                    {/* Footer */}
                    <div className="mt-10 flex items-center justify-between text-[0.85rem]">
                        <Link to="/" className="about-link items-center gap-2">
                            <FiArrowLeft className="h-4 w-4" />
                            Back home
                        </Link>
                        <a
                            href="https://github.com/Premkmaurya"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="about-link items-center gap-2"
                        >
                            More on GitHub
                            <FiArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Works;