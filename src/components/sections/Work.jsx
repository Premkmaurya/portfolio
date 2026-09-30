import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const Work = () => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()

    media.add(
      {
        isMobile: '(max-width: 767px)',
        isDesktop: '(min-width: 768px)',
      },
      ({ conditions }) => {
        const { isMobile } = conditions

        gsap.set(imageRef.current, { width: 0, height: 0, autoAlpha: 0 })
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=120%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            markers:true
          },
        }).to(imageRef.current, {
          width: isMobile ? '55vw' : '42vw',
          height: isMobile ? '45vh' : '58vh',
          autoAlpha: 1,
          ease: 'none',
        })
      }
    )

    return () => media.revert()
  }, [])

  return (
  <div ref={sectionRef} className='relative w-screen h-screen bg-[#faf9f6] text-[#141518]'>
        <div className='flex w-full h-full items-center justify-center overflow-hidden gap-6'>
            <div className='text-[7vw] font-bold [word-spacing:4px]'>THE</div>
      <div ref={imageRef} className='w-0 h-0 shrink-0 overflow-hidden'>
        <img src="/mine.png" className='w-full h-full object-cover' alt="" />
      </div>
            <div className='text-[7vw] font-bold [word-spacing:4px]'>WORK</div>
        </div>
        <div></div>
    </div>
  )
}

export default Work