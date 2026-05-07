import "./index.css";
import HeroSection from "./sections/HeroSection";
import MarqueeSection from "./sections/MarqueeSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";

import Lenis from "lenis";
import "lenis/dist/lenis.css";

function App() {
  const lenis = new Lenis({
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
