import "./index.css";
import { Helmet } from "react-helmet-async";
import HeroSection from "./sections/HeroSection";
import MarqueeSection from "./sections/MarqueeSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";

import Lenis from "lenis";
import "lenis/dist/lenis.css";

function App() {
  new Lenis({
    autoRaf: true,
    allowNestedScroll: true,
    autoToggle: true,
    lerp: 0.04,
  });
  return (
    <div
      className="min-h-screen"
      style={{
        background: "#0C0C0C",
        fontFamily: "'Kanit', sans-serif",
        overflowX: "clip",
      }}
    >
      <Helmet>
        <title>Prem Maurya | Full Stack Developer</title>
        <meta
          name="description"
          content="Full Stack Developer specializing in React, Node.js, JavaScript, and modern web applications."
        />
        <meta property="og:title" content="Prem Maurya | Full Stack Developer" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://portfolio-lovat-eight-72.vercel.app"
        />
        <meta
          property="og:description"
          content="Portfolio of a Full Stack Developer."
        />
      </Helmet>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}

export default App;
