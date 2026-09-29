import React from 'react'
import ScrollVelocity from "../common/ScrollVelocity"

const About = () => {
  return (
    <section className="relative h-screen w-screen overflow-hidden flex items-center">
      <div className="relative z-10 w-full">
        <ScrollVelocity
          texts={['PREM MAURYA', 'DESIGN & CODE', 'CREATIVE']}
          velocity={36}
          numCopies={10}
          className="scroll-velocity-text font-[--pp-editorial-old-ultrabold] "
          parallaxClassName="scroll-velocity-parallax"
          scrollerClassName="scroll-velocity-scroller"
          velocityMapping={{ input: [0, 1200], output: [0, 3] }}
        />
      </div>
    </section>
  )
}

export default About