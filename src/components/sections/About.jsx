import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import gsap from 'gsap'

const About = ({ progress }) => {
  const aboutRef = useRef(null)

  const portraitUrl =
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80'

  useEffect(() => {
    console.log(progress.toFixed(3))
    if (progress.toFixed(3) < 0.07) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
      })

      tl.from(
        '.about-reveal-title',
        {
          y: '100%',
          opacity: 0,
          duration: 1.1,
          stagger: 0.08,
        }
      )
        .from(
          '.about-reveal-copy',
          {
            y: '100%',
            opacity: 0,
            duration: 1.1,
            stagger: 0.08,
          },
          '<'
        )
        .from(
          '.about-reveal-meta',
          {
            y: '100%',
            opacity: 0,
            duration: 1.1,
            stagger: 0.08,
          },
          '<'
        )

    }, aboutRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={aboutRef} className="flex h-screen w-screen flex-shrink-0 bg-[#FAF9F6] px-6 py-6 text-[#2E2B28] sm:px-22">
      <div className='w-1/2 h-full'>
        <div className='w-full h-1/2'>
          <div className='overflow-hidden'>
            <span className='about-reveal-title block text-[2.3vw] font-[--pp-editorial-old-ultrabold] tracking-tighter'>CHAPTER 1</span>
          </div>
        </div>
        <div className='w-full h-1/2 flex items-end justify-start py-6'>
          <div className='overflow-hidden'>
            <span className='about-reveal-copy block text-[1.1vw] tracking-tight montserrat text-[#2E2B28]/90'>Beyond design: football, watches, <br /> aquariums and martial arts.</span>
          </div>
        </div>
      </div>
      <div className='w-1/2 h-full'>
        <div className='w-full h-1/2 bg-cover flex flex-col'>
          <div className='overflow-hidden'>
            <div className='about-reveal-meta text-[0.8vw] pb-8 inline-block montserrat tracking-tighter uppercase'>Quick Intro</div>
          </div>
          <div className='overflow-hidden'>
            <div className='about-reveal-copy text-[2vw] montserrat font-normal inline-block leading-tighter'>Hi, I’m Prem — a full-stack developer passionate about building modern web experiences, interactive interfaces, and AI-powered products that feel as good as they work.
            </div>
          </div>
        </div>
        <div className='w-full h-1/2 flex'>
          <div className='w-1/2 h-full py-8 flex items-end justify-start gap-4'>
            <div className='overflow-hidden'>
              <span className='about-reveal-meta about-link inline-flex items-center gap-2 text-[0.85vw] font-medium uppercase tracking-[0.15em]'>
                More About Me
                <FontAwesomeIcon icon={faArrowRight} className='text-[0.8vw]' />
              </span>
            </div>
          </div>
          <div className='w-1/2 h-full relative '>
            <img src={portraitUrl} alt="Portrait" className='w-full h-full object-cover' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About