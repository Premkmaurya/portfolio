import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

export const Loader = ({ loading, setLoading }) => {
  const loaderRef = useRef(null)
  const barRef = useRef(null)
  const revealRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText('.quote', {
        type: 'words,lines',
        linesClass: 'line',
        autoSplit: true,
        mask: 'lines',
      })

      const splitYear = new SplitText('.year', {
        type: 'words,lines',
        linesClass: 'line',
        autoSplit: true,
        mask: 'lines',
      })

      gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(revealRef.current, {
        yPercent: 100,
        transformOrigin: 'bottom bottom',
      })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      })

      tl.from(splitYear.lines, {
        duration: 1.2,
        yPercent: 100,
        opacity: 0,
        stagger: 0.08,
      })
        .from(
          split.lines,
          {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.08,
          },
          '-=0.6',
        )
        .to(
          barRef.current,
          {
            duration: 3,
            scaleX: 1,
            ease: 'power2.inOut',
            transformOrigin: 'left center',
          },
          '-=0.4',
        )
        .to(
          revealRef.current,
          {
            duration: 1.1,
            yPercent: 0,
            ease: 'power3.inOut',
            transformOrigin: 'bottom bottom',
          },
          '>=-0.2',
        )
      return () => {
        split.revert()
        splitYear.revert()
      }
    }, loaderRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={loaderRef} className="relative h-screen w-screen overflow-hidden bg-[#262220] text-[#F3EEE8] font-[--pp-editorial-old-ultrabold]">
      <div className="relative z-10 h-full w-full">
        <div className="relative h-1/2 w-full">
          <div className="flex h-full items-center justify-start px-20">
            <span className="year ml-18 text-[10rem] leading-none">2026</span>
          </div>
        </div>

        <div className="h-1/2 w-full px-2 py-10">
          <div className="flex h-full items-end justify-end">
            <span className="quote mr-18 whitespace-nowrap text-[1.4rem] font-normal capitalize tracking-tighter">
              A journey through years of design
            </span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <div className="relative h-2.5 w-full overflow-hidden rounded-full">
          <div
            ref={barRef}
            className="h-full w-full rounded-full bg-[#3A3632]"
          />
        </div>
      </div>

      <div
        ref={revealRef}
        className="pointer-events-none absolute inset-0 z-30 bg-[#3A3632] text-[#F3EEE8]"
      >
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
    </div>
  )
}
