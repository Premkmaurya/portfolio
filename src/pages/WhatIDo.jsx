import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const services = [
    {
        number: "01",
        title: "WEB DEVELOPMENT",
        description:
            "Fast, responsive websites and web applications built with clean code, strong UX, and modern technologies.",
        image: "/images/what-i-do/web-development.jpg",
    },
    {
        number: "02",
        title: "UI/UX DESIGN",
        description:
            "Interfaces designed around clarity, usability, visual hierarchy, and a smooth interaction experience.",
        image: "/images/what-i-do/ui-ux.jpg",
    },
    {
        number: "03",
        title: "CREATIVE DEVELOPMENT",
        description:
            "Interactive digital experiences combining animation, motion, WebGL, and thoughtful frontend engineering.",
        image: "/images/what-i-do/creative-development.jpg",
    },
    {
        number: "04",
        title: "FULL-STACK DEVELOPMENT",
        description:
            "Complete products built from frontend to backend, APIs, databases, authentication, and deployment.",
        image: "/images/what-i-do/full-stack.jpg",
    },
];

const WhatIDo = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const cardsRef = useRef([]);

    const [active, setActive] = useState(0);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".what-intro", {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });

            gsap.from(cardsRef.current, {
                y: 80,
                opacity: 0,
                stagger: 0.08,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useLayoutEffect(() => {
        if (!trackRef.current) return;

        const card = cardsRef.current[active];

        if (!card) return;

        const sectionWidth = sectionRef.current.offsetWidth;
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;

        const targetX =
            -(cardLeft - sectionWidth * 0.34 + cardWidth * 0.5);

        gsap.to(trackRef.current, {
            x: Math.min(0, targetX),
            duration: 1.1,
            ease: "power4.out",
            overwrite: true,
        });

        cardsRef.current.forEach((item, index) => {
            if (!item) return;

            const isActive = index === active;

            gsap.to(item, {
                opacity: isActive ? 1 : 0.72,
                duration: 0.7,
                ease: "power2.out",
            });

            gsap.to(item.querySelector(".service-image"), {
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.08,
                duration: 0.9,
                ease: "power3.out",
            });

            gsap.to(item.querySelector(".service-overlay"), {
                opacity: isActive ? 0.18 : 0,
                duration: 0.7,
            });

            gsap.to(item.querySelector(".service-title"), {
                y: isActive ? 0 : 4,
                duration: 0.7,
                ease: "power3.out",
            });
        });
    }, [active]);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen overflow-hidden bg-[#292723] "
        >
            {/* Intro */}
            <div className="what-intro absolute left-[90px] h-[90%] flex flex-col justify-between top-[8vh] z-20 max-w-[360px] text-[#f4f0e8] py-8">
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
            
        </section>
    );
};

export default WhatIDo;