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
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".work-container",
                    start: "25% 20%",
                    pin: true,
                    markers: true,
                    scrub: 0.5,
                }
            })
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

                    {/* Heading */}
                    <div className="flex items-start gap-4">
                        <h1 className="works-heading pb-2 font-editorial text-[clamp(4rem,13vw,14rem)] leading-none tracking-[-0.06em]">
                            ALL WORKS
                        </h1>
                        <span className="works-head-fade mt-3 text-sm tracking-widest opacity-60 md:mt-6">
                            ({String(works.length).padStart(2, "0")})
                        </span>
                    </div>

                    {/* List */}
                    <div className="work-container min-w-screen w-screen flex flex-row gap-16">
                        {works.map((work, index) => {
                            const href = work.live || work.github;
                            const TitleWrap = href ? "a" : "div";
                            const wrapProps = href
                                ? { href, target: "_blank", rel: "noopener noreferrer" }
                                : {};

                            return (
                                <article 
                                    key={work.id}
                                    className="works-row group w-[60vw] relative flex flex-col gap-8 py-4 md:py-8"
                                >
                                    {/* Index + year */}
                                    <div className="works-fade text-sm tracking-widest md:col-span-1 md:pt-5">
                                        <div>{String(index + 1).padStart(2, "0")}</div>
                                        {work.year && <div className="mt-1 opacity-50">{work.year}</div>}
                                    </div>
                                    <div className="relative w-full h-[30vh] overflow-hidden rounded-[0.4rem] md:col-span-5 md:h-[40vh]">
                                        <img className="w-full h-full object-cover" src={work.preview} alt={work.title} />
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default Works;