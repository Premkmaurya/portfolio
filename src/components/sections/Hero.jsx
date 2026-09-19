import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

const Hero = ({ loading }) => {
    const revealRef = useRef(null)

    useEffect(() => {
        if (loading) return

        const ctx = gsap.context(() => {
            const revealTitle = new SplitText('.reveal-title', {
                type: 'lines',
                linesClass: 'line',
                mask: 'lines',
                autoSplit: true,
            })

            const revealCopy = new SplitText('.reveal-copy', {
                type: 'lines',
                linesClass: 'line',
                mask: 'lines',
                autoSplit: true,
            })

            const revealMeta = new SplitText('.reveal-meta', {
                type: 'lines',
                linesClass: 'line',
                mask: 'lines',
                autoSplit: true,
            })

            // Hide everything BEFORE browser can visibly paint it
            gsap.set(
                [
                    revealTitle.lines,
                    revealCopy.lines,
                    revealMeta.lines,
                ],
                {
                    yPercent: 100,
                    opacity: 0,
                }
            )

            const tl = gsap.timeline({
                defaults: {
                    ease: 'power3.out',
                },
            })

            tl.fromTo(
                revealRef.current,
                {
                    yPercent: 100,
                },
                {
                    yPercent: 0,
                    duration: 1.1,
                    ease: 'power3.inOut',
                }
            )
                .to(
                    revealTitle.lines,
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.12,
                    },
                    '-=0.3'
                )
                .to(
                    revealCopy.lines,
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.9,
                        stagger: 0.1,
                    },
                    '<'
                )
                .to(
                    revealMeta.lines,
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.08,
                    },
                    '<'
                )

            return () => {
                revealTitle.revert()
                revealCopy.revert()
                revealMeta.revert()
            }
        }, revealRef)

        return () => ctx.revert()
    }, [loading])
    return (
        <div
            ref={revealRef}
            className="pointer-events-none absolute inset-0 z-30 bg-[#3A3632] text-[#F3EEE8]"
        >
            <div className="mx-auto flex h-full max-w-[1700px] flex-col pl-20 sm:pl-24 md:pl-28 pr-6 sm:pr-10 md:pr-16 pb-5 pt-8">
                <div className="flex flex-1 items-start justify-between gap-8 pt-2 md:pt-4">
                    <div className="flex-1 overflow-hidden">
                        <h1 className="font-[--pp-editorial-old-ultrabold] leading-[0.72] tracking-[-0.08em] text-[clamp(6rem,13vw,20rem)]">
                            <span className="reveal-title block">PREM <br /> MAURYA </span>
                        </h1>
                    </div>

                    <div className="mt-6 flex max-w-[32rem] items-start justify-end pt-2 md:mt-8 lg:mt-10">
                        <p className="text-[clamp(1.4rem,1.85vw,2.8rem)] leading-[1.1] tracking-[-0.04em] text-[#F3EEE8]">
                            <span className="reveal-copy block">Independent designer based in India —</span>
                            <span className="reveal-copy block">focused on thoughtful, considered</span>
                            <span className="reveal-copy block">digital work.</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-end justify-between gap-4 pb-3 pt-5 text-[#F3EEE8]">
                    <div className="reveal-meta text-[1.05rem] leading-tight tracking-[-0.03em] text-[#F3EEE8]/90">
                        <div>HCMC, Vietnam</div>
                        <div>(GMT+7) 02:13</div>
                    </div>

                    <div className="reveal-meta text-center text-[1.2rem] leading-tight tracking-[-0.04em] text-[#F3EEE8]/90">
                        Open for
                        <br />
                        collaborations
                    </div>

                    <div className="reveal-meta font-[--pp-editorial-old-ultrabold] text-[2rem] tracking-[0.12em] text-[#F3EEE8]">
                        SCROLL
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero