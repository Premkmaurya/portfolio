import ScrollVelocity from "../common/ScrollVelocity"

const About = () => {
  return (
    <section
      className="about-marquee relative h-screen w-screen overflow-hidden"
    >
      <ScrollVelocity
        texts={['PREM MAURYA', 'DESIGN & CODE', 'CREATIVE']}
        velocity={36}
        numCopies={10}
        className="scroll-velocity-text font-[--pp-editorial-old-ultrabold]"
        parallaxClassName="scroll-velocity-parallax"
        scrollerClassName="scroll-velocity-scroller"
        velocityMapping={{ input: [0, 1200], output: [0, 3] }}
        overlayRows={[1]}
      />
      <img
        className="about-marquee-image absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[80vh] object-cover"
        src="/mine.png"
        alt=""
        style={{ filter: 'grayscale(100%)' }} 
        aria-hidden="true"
      />
    </section>
  )
}

export default About