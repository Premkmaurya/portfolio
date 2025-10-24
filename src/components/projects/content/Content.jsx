import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "./content.scss";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function Content() {
  const descRef = useRef()
  useEffect(() => {
    if (!descRef.current) return;

    const lenis = new Lenis({
      wrapper: descRef.current,
      smoothWheel: true,
      lerp: 0.8,
      duration: 1.3,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
  const projects = [
    {
      id: 1,
      title: "AI Image Caption Genreator",
      desc: `Created an AI-powered image caption generator that analyzes uploaded images and automatically produces human-like descriptive captions with up to 92% accuracy, leveraging Gemini's vision and text generation models.`,
      tech: ["React", "Tailwind", "Node js", "Express", "GSAP"],
      image: "/img/caption-genration.png",
      live_link:"https://backend-9yno.onrender.com/",
      github_link:"https://github.com/Premkmaurya/AI-project/tree/main/caption-generator"
    },
    {
      id: 2,
      title: "Food Delivery App",
      desc: `Developed a modern food delivery platform where users can explore and order dishes in a Reels-style scrolling interface, designed to maximize engagement and reduce decision fatigue. Built using React.js, Node.js, and MongoDB.`,
      tech: ["React", "Tailwind", "Node js", "Express", "GSAP"],
      image: "/img/food-delivery.png",
      live_link:"https://backend-9yno.onrender.com/",
      github_link:"https://github.com/Premkmaurya/foodista"
    },
    {
      id: 4,
      title: "Rejouice Clone",
      desc: `Built a pixel-perfect frontend clone of the K72 website, focusing on fluid animations, modern motion design, and seamless user interactions. The project was crafted entirely from scratch using React.js, GSAP, and Tailwind CSS.`,
      tech: ["React", "Tailwind","GSAP"],
      image:"/img/k72.png",
      live_link:"https://backend-9yno.onrender.com/",
      github_link:"https://github.com/Premkmaurya/landing-page/tree/main/k72"
      
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % projects.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <section className="project-section">
      <h2 className="section-title">projects</h2>

      <div className="projects-container">
        <div className="project-display">
          <motion.img
            key={projects[current].id}
            src={projects[current].image}
            alt={projects[current].title}
            className="project-image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            key={projects[current].title}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="project-info"
          >
            <h3 className="project-title">{projects[current].title}</h3>
            <p ref={descRef} className="project-desc">{projects[current].desc}</p>
            <div className="tech-container">
              {projects[current].tech.map((e) => {
                return (
                  <>
                    <div className="tech-stack">
                      <p>{e}</p>
                    </div>
                  </>
                );
              })}
            </div>
            <button onClick={()=>{
              window.open(`${projects[current].live_link}`,"_blank")
            }} className="view-btn">View Project</button>
            <button onClick={()=>{
              window.open(`${projects[current].github_link}`,"_blank")
            }} className="github-btn">Github Link</button>
          </motion.div>
        </div>

        <div className="carousel-wrapper">
          <button onClick={prevSlide} className="nav-btn">
            <ArrowLeft size={20} />
          </button>

          <div className="carousel">
            <motion.div
              className="carousel-track"
              animate={{ x: `-${current * 50}px` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {projects.map((proj, index) => (
                <img
                  key={`${proj.id}-${index}`}
                  src={proj.image}
                  alt={proj.title}
                  onClick={() => setCurrent(index % projects.length)}
                  className={`carousel-item ${
                    index % projects.length === current ? "active" : ""
                  }`}
                />
              ))}
            </motion.div>
          </div>

          <button onClick={nextSlide} className="nav-btn">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
