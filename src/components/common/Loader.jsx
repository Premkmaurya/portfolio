import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

export const Loader = ({ loading, setLoading }) => {
  const loaderRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' })

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
            onComplete:()=>{
              setLoading(false)
            }
          },
          '-=0.4',
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

    </div>
  )
}
