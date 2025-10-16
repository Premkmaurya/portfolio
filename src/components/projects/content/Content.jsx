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
      desc: `Created an AI-powered image caption generator that analyzes uploaded images and automatically produces human-like descriptive captions with up to 92% accuracy, leveraging OpenAI’s vision and text generation models.

      Users can upload or drag-and-drop any image, and the app instantly generates a contextually relevant caption in under 2 seconds, processing 1,500+ image requests per day with 99.7% uptime.

      The project focuses on AI vision integration, responsive UI, and data efficiency, optimized to reduce API token usage by 28% through smart request throttling and local caching.`,
      tech: ["React", "Tailwind", "Node js", "Express", "GSAP"],
      image: "/img/caption-genration.png",
    },
    {
      id: 2,
      title: "Food Delivery App",
      desc: `Developed a modern food delivery platform where users can explore and order dishes in a Reels-style scrolling interface, designed to maximize engagement and reduce decision fatigue. Built using React.js, Node.js, and MongoDB, the app achieved 92% faster user engagement compared to traditional grid-based designs.

      Integrated real-time API fetching to display food items dynamically, processing 500+ API requests daily with under 400ms latency. The platform supports user authentication, cart management, and secure order placement, ensuring a smooth, end-to-end delivery experience.

      Implemented infinite scroll UI with React hooks and optimized state management, improving performance by 65% and boosting average session time by 2.3x.`,
      tech: ["React", "Tailwind", "Node js", "Express", "GSAP"],
      image: "/img/food-delivery.png",
    },
    {
      id: 3,
      title: "ChatGPT Clone",
      desc: `Built a ChatGPT-inspired conversational AI web app that replicates 90% of the core functionality of OpenAI’s ChatGPT — enabling users to interact with an intelligent chatbot capable of generating context-aware responses within milliseconds.
      
      Developed a fully responsive frontend with React.js and SCSS, achieving 98% Lighthouse performance score and a 50% faster rendering time compared to standard UI frameworks. Integrated OpenAI GPT API to process over 1,000+ user queries per session with seamless API handling and optimized network calls.
      
      The project focuses on real-time message streaming, smooth animations, and persistent chat history, enhancing user experience and engagement by over 70% during testing. Backend APIs were designed using Node.js and Express, ensuring 99.8% uptime with proper error handling and retry mechanisms.`,
      tech: ["React", "Tailwind", "Node js", "Express", "GSAP"],
      image: "/img/chatgpt.png",
    },
    {
      id: 4,
      title: "Rejouice Clone",
      desc: `Built a pixel-perfect frontend clone of the award-winning Rejouice Agency website, focusing on fluid animations, modern motion design, and seamless user interactions. The project was crafted entirely from scratch using React.js, GSAP, and SCSS, achieving a 97% visual match to the original site and 90+ Lighthouse performance score across all devices.
      
      Implemented smooth scroll, parallax transitions, video hero animations, and mouse-follow effects, mimicking the cinematic storytelling experience of the real site.`,
      tech: ["React", "Tailwind","GSAP"],
      image:"/img/k72.png"
      
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
            <button className="view-btn">View Project</button>
            <button className="github-btn">Github Link</button>
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
