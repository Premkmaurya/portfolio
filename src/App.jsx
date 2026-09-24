import { useEffect, useRef, useState } from 'react'
import { Loader } from './components/common/Loader'
import { Nav } from './components/common/Nav'
import About from './components/sections/About'

import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(SplitText)
gsap.registerPlugin(ScrollTrigger)

function App() {
  const [loading, setLoading] = useState(true)
  const [reveal, setReveal] = useState(false)
  const [progress, setProgress] = useState(0)

  const revealRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (loading) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      tl.to(
        revealRef.current,
        {
          y: '0',
          duration: 1.1,
          ease: 'power3.inOut',
        }
      )
        .from(
          '.reveal-title',
          {
            y: '100%',
            opacity: 0,
            duration: 1.1,
            ease: 'power3.inOut',
            stagger: 0.08,
          },
          "-=0.8"
        )
        .from(
          '.reveal-copy',
          {
            y: '100%',
            opacity: 0,
            duration: 1.1,
            ease: 'power3.inOut',
            stagger: 0.08,
          },
          "<"
        )
        .from(
          '.reveal-meta',
          {
            y: '100%',
            opacity: 0,
            duration: 1.1,
            ease: 'power3.inOut',
            stagger: 0.08,
          },
          "<"
        )

      tl.call(() => setReveal(true))

      tl.add(() => {
        gsap.to(containerRef.current, {
          x: "-100%",
          ease: 'none',
          scrollTrigger: {
            trigger: revealRef.current,
            start: 'top top',
            end: () => `+=${containerRef.current.scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            markers: false,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setProgress(self.progress)
            }
          },
        })
      })
    }, revealRef)

    return () => ctx.revert()
  }, [loading])

  return (
    <>
      <Nav reveal={reveal} progress={progress} />
      <div className="h-screen bg-[#262220]">
        <Loader loading={loading} setLoading={setLoading} />
        {!loading && (
          <div
            ref={revealRef}
            className="absolute inset-0 z-30 min-h-screen min-w-screen translate-y-full"
          >
            <div
              ref={containerRef}
              className="flex h-full min-h-screen"
              style={{ width: 'fit-content' }}
            >
              {/* Hero Section */}
              <div className="hero-section bg-[#3A3632] text-[#F3EEE8] w-screen flex-shrink-0 min-h-screen h-full flex flex-col justify-between">
                <div className="mx-auto flex h-full max-w-[1700px] flex-col pl-20 sm:pl-24 md:pl-28 pr-6 sm:pr-10 md:pr-16 pb-5 pt-8">
                  <div className="flex flex-1 items-start justify-between gap-8 pt-2 md:pt-4">
                    <div className="flex-1">
                      <h1 className="font-[--pp-editorial-old-ultrabold] leading-[0.72] tracking-[-0.08em] text-[clamp(6rem,13vw,20rem)]">
                        <div className="overflow-hidden">
                          <span className="reveal-title block">
                            PREM
                          </span>
                        </div>
                        <div className="overflow-hidden">
                          <span className="reveal-title block">
                            MAURYA
                          </span>
                        </div>
                      </h1>
                    </div>

                    <div className="mt-6 flex max-w-[32rem] items-start justify-end pt-2 md:mt-8 lg:mt-10">
                      <div className="text-[clamp(1.4rem,1.85vw,2.8rem)] leading-[1.1] tracking-[-0.04em] text-[#F3EEE8]">
                        <div className="overflow-hidden">
                          <span className="reveal-copy block">Independent designer based in India —</span>
                        </div>
                        <div className="overflow-hidden">
                          <span className="reveal-copy block">focused on thoughtful, considered</span>
                        </div>
                        <div className="overflow-hidden">
                          <span className="reveal-copy block">digital work.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-4 pb-3 pt-5 text-[#F3EEE8]">
                    <div className="text-[1.05rem] leading-tight tracking-[-0.03em] text-[#F3EEE8]/90">
                      <div className="mb-1 overflow-hidden">
                        <span className='reveal-meta block'>HCMC, Vietnam</span>
                      </div>
                      <div className="mb-1 overflow-hidden">
                        <span className='reveal-meta block'>(GMT+7) 02:13</span>
                      </div>
                    </div>

                    <div className="text-center text-[1.2rem] block leading-tight tracking-[-0.04em] text-[#F3EEE8]/90">
                      <div className="mb-1 overflow-hidden">
                        <span className='reveal-meta block'>Open for</span>
                      </div>
                      <div className="mb-1 overflow-hidden">
                        <span className='reveal-meta block'>collaborations</span>
                      </div>
                    </div>

                    <div className="reveal-meta font-[--pp-editorial-old-ultrabold] text-[2rem] tracking-[0.12em] text-[#F3EEE8]">
                      SCROLL
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="about-section w-screen flex-shrink-0 min-h-screen h-full">
                <About progress={progress} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App