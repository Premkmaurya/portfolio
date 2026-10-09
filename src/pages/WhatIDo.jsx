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
        image: "/images.jfif",
    },
    {
        number: "02",
        title: "UI/UX DESIGN",
        description:
            "Interfaces designed around clarity, usability, visual hierarchy, and a smooth interaction experience.",
        image: "/images.jfif",
    },
    {
        number: "03",
        title: "CREATIVE DEVELOPMENT",
        description:
            "Interactive digital experiences combining animation, motion, WebGL, and thoughtful frontend engineering.",
        image: "/images.jfif",
    },
    {
        number: "04",
        title: "FULL-STACK DEVELOPMENT",
        description:
            "Complete products built from frontend to backend, APIs, databases, authentication, and deployment.",
        image: "/images.jfif",
    },
];

const WhatIDo = () => {
    const wrapRef = useRef(null);
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    useLayoutEffect(() => {
        const scroller = getScrollParent(wrapRef.current);

        const ctx = gsap.context(() => {
            const track = trackRef.current;
            if (!track) return;

            const getScrollAmount = () => {
                const parentWidth = track.parentElement?.clientWidth || window.innerWidth;
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
        }, sectionRef);

        // Re-measure when layout above changes or fonts finish loading
        let raf;
        const refresh = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => ScrollTrigger.refresh());
        };
        const content = scroller === window ? document.body : scroller.firstElementChild;
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
        <div ref={wrapRef} className="relative w-screen" style={{ height: "300vh" }}>
            <section
                ref={sectionRef}
                className="sticky top-0 h-screen w-full flex bg-[#292723] text-[#f4f0e8] overflow-hidden"
            >
                {/* Intro */}
                <div className="what-intro h-[90%] ml-[10vw] flex flex-col justify-between w-[30vw] min-w-[260px] py-8 shrink-0 z-10">
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
                <div className="h-full flex-1 overflow-hidden">
                    <div
                        ref={trackRef}
                        className="flex h-full w-max will-change-transform items-center px-12 gap-6"
                    >
                        {services.map((service) => (
                            <article
                                key={service.number}
                                className="group service-card relative h-[85vh] w-[32vw] min-w-[330px] max-w-[460px] shrink-0 overflow-hidden border-r border-white/15"
                            >
                                <div className="absolute inset-0 z-0 h-full w-full bg-cover bg-center overflow-hidden">
                                    <img className="w-full h-full object-cover" src={service.image || "/mine.png"} alt={service.title} />
                                    <div className="absolute inset-0 bg-[#292723] transition-transform duration-500 ease-in-out group-hover:-translate-y-full" />
                                </div>
                                <div className="absolute inset-0 z-10 h-full w-full bg-cover flex flex-col justify-between bg-center bg-transparent py-8 px-6">
                                    {/* Number */}
                                    <div>
                                        <span className="font-editorial text-[clamp(3.5rem,6vw,6rem)] leading-none tracking-[-0.05em]">
                                            {service.number}
                                        </span>
                                    </div>

                                    {/* Main title & Description */}
                                    <div>
                                        <h3 className="service-title font-editorial text-[clamp(1.8rem,3vw,3.2rem)] uppercase leading-[0.9] tracking-[-0.045em]">
                                            {service.title}
                                        </h3>
                                        <p className="max-w-[340px] mt-2 text-[0.78rem] leading-[1.4] text-white/85">
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