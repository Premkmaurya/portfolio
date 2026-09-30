import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import SplitText from "gsap/SplitText"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import ScrollVelocity from "../common/ScrollVelocity"
import TechText from "../common/TechText"
import WarpText from "../common/WarpText"

gsap.registerPlugin(SplitText, ScrollTrigger)

const About = () => {
  const aboutIntroRef = useRef(null)

  // useLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     const split = new SplitText(
  //       [".about-intro-title", ".about-intro-copy p"],
  //       {
  //         type: "lines",
  //         linesClass: "about-reveal-line",
  //         autoSplit: true,
  //         mask: "lines",
  //       }
  //     )

  //     gsap.from(split.lines, {
  //       yPercent: 100,
  //       opacity: 0,
  //       duration: 1.1,
  //       ease: "power3.out",
  //       stagger: 0.08,
  //       scrollTrigger: {
  //         trigger: aboutIntroRef.current,
  //         start: "top 75%",
  //         once: true,
  //         markers:true
  //       },
  //     })

  //     return () => split.revert()
  //   }, aboutIntroRef)

  //   return () => ctx.revert()
  // }, [])

  return (
    <>
      <section className="about-marquee relative h-screen w-screen mt-10 overflow-hidden">
        <ScrollVelocity
          texts={['FULL STACK DEVELOPER', 'UI/UX DEVELOPER', 'MERN STACK DEVELOPER']}
          velocity={136}
          numCopies={10}
          className="scroll-velocity-text font-[--pp-editorial-old-ultrabold]"
          parallaxClassName="scroll-velocity-parallax"
          scrollerClassName="scroll-velocity-scroller"
          velocityMapping={{ input: [0, 1200], output: [0, 3] }}
          overlayRows={[0, 2]}
        />
        <div>
          <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
            <img
              src="/mine.png"
              alt=""
              className="h-full w-full object-cover"
              style={{ filter: 'grayscale(100%)' }}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      <section ref={aboutIntroRef} className="about-intro-section ml-6">
        <TechText
          text="ABOUT"
          fontWeight={800}
          fontSize={150}
          reveal="letter"
          dashLength={4}
          dashGap={2}
          specks={0}
          color="#141518"
          accentColor="#141518"
          letterSpacing={-0.05}
          reach={60}
          softness={0.7}
          strokeWidth={1.5}
          speed={1}
          lineStyle="dashed"
          selection
          labels
          draggable
          sweep
        />

        <div className="about-intro-copy">
          <p>
            I design and build modern digital experiences where clean interfaces, thoughtful interactions, and solid engineering come together.
          </p>
          <p>
            With React, Next.js, TypeScript, GSAP, and Node.js, I turn ideas into interactive interfaces, full-stack applications, and AI-powered products. I care about the details — from smooth motion and responsive UI to clean, maintainable code.
          </p>
        </div>
      </section>
    </>
  )
}

export default About