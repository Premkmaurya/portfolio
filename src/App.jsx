import Navbar from "./components/nav/Navbar";
import About from "./components/pages/About";
import Skills from "./components/pages/Skills";
import Home from "./components/pages/Home";
import Projects from "./components/pages/Projects";
import Connect from "./components/pages/Connect";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useRef,useEffect } from "react";
import { useNavbar } from "./context/NavContext";

const App = () => {
  const mainRef= useRef();

  const {isSidebarOpen} = useNavbar()
  const lenis = new Lenis({
    wrapper:window,
    smoothWheel:true,
    lerp:0.8,
    duration:1.3,
  });

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on("scroll", ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);

  useGSAP(() => {
    gsap.from(".app", {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  }, []);
  useEffect(()=>{
    if(isSidebarOpen){
      mainRef.current.classList.add("blur")
    }else{
      mainRef.current.classList.remove("blur")
    }
  },[isSidebarOpen])

  return (
      <div>
        <Navbar />
        <div ref={mainRef} className="app">
          <div id="home">
          <Home />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="connect">
          <Connect />
        </div>
        </div>
      </div>
  );
};

export default App;
