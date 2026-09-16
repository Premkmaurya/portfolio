import React, { useEffect } from 'react'
import gsap from 'gsap'

const Hero = ({ loading }) => {
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from(".hero", {
            y: "100%",
            duration: 2.5,
        })
    }, [loading])
    return (
        <div className="hero h-screen w-screen overflow-hidden bg-[#3A3632] translate-y-full text-[#F3EEE8]">
            <div className="mx-auto flex h-full max-w-[1600px] flex-col px-8 pb-5 pt-8 md:px-10 xl:px-20">
                <div className="flex flex-1 items-start justify-between gap-8 pt-2 md:pt-4">
                    <div className="flex-1 overflow-hidden">
                        <h1 className="font-[--pp-editorial-old-ultrabold] leading-[0.72] tracking-[-0.08em] text-[clamp(6rem,13vw,20rem)]">
                            <span className="block">PREM</span>
                            <span className="block">MAURYA</span>
                        </h1>
                    </div>

                    <div className="mt-6 flex max-w-[32rem] items-start justify-end pt-2 md:mt-8 lg:mt-10">
                        <p className="text-[clamp(1.4rem,1.85vw,2.8rem)] leading-[1.1] tracking-[-0.04em] text-[#F3EEE8]">
                            Independent designer based in India —
                            <span className="block">focused on thoughtful, considered</span>
                            <span className="block">digital work.</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-end justify-between gap-4 pb-3 pt-5 text-[#F3EEE8]">
                    <div className="text-[1.05rem] leading-tight tracking-[-0.03em] text-[#F3EEE8]/90">
                        <div>HCMC, Vietnam</div>
                        <div>(GMT+7) 02:13</div>
                    </div>

                    <div className="text-center text-[1.2rem] leading-tight tracking-[-0.04em] text-[#F3EEE8]/90">
                        Open for
                        <br />
                        collaborations
                    </div>

                    <div className="font-[--pp-editorial-old-ultrabold] text-[2rem] tracking-[0.12em] text-[#F3EEE8]">
                        SCROLL
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero