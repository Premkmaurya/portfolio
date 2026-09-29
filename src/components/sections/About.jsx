import ScrollVelocity from "../common/ScrollVelocity"


const About = () => {
  return (
    <section
      className="about-marquee relative h-screen w-screen overflow-hidden"
    >
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
      <div >
        <div className="absolute left-1/2 bottom-0 z-10 h-[85vh] w-[20vw] -translate-x-1/2 bg-[#8f908bbb] ">
          <img
            src="/mine.png"
            alt=""
            className="w-full h-full object-contains"
            style={{ filter: 'grayscale(100%)' }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}

export default About