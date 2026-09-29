import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import SplitText from "gsap/SplitText"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import ScrollVelocity from "../common/ScrollVelocity"
import TechText from "../common/TechText"

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
          texts={['BUILDING THE WEB', 'IDEAS INTO PRODUCTS', 'PREM MAURYA']}
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
          specks={15}
          fontFamily=""
          color="#141518"
          accentColor="#141518"
          letterSpacing={-0.05}
          reach={200}
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
            I design and develop digital experiences with a focus on craft,
            motion, and interaction — creating interfaces where every detail is
            intentional.
          </p>
          <p>
            Based in Amsterdam, I work at the intersection of creativity and
            technology. From concept to code, I bring ideas to life with
            meticulous attention to detail.
          </p>
        </div>
      </section>
    </>
  )
}

export default About