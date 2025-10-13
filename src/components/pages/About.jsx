import React from "react";
import LeftSection from "../about/left-section/LeftSection";
import RightSection from "../about/right-section/RightSection";
import LogoLoop from "../about/logo-loop/LogoLoop";
import { FaReact } from "react-icons/fa6";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa6";
import { FaNodeJs } from "react-icons/fa";
import { IoLogoDocker } from "react-icons/io5";



const techLogos = [
  
  { node: <FaHtml5 color="#e34e24" />, title: "html", href: "https://react.dev" },
  { node: <FaReact color="#50cde9ff" />, title: "React", href: "https://react.dev" },
  { node: <FaCss3Alt color="#244ee3" />, title: "html", href: "https://react.dev" },
  { node: <FaNodeJs color="#3e8a3f" />, title: "html", href: "https://react.dev" },
  { node: <IoLogoDocker color="#00153d" />, title: "html", href: "https://react.dev" },
  {
    node: <RiTailwindCssFill color="#00bbff" />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];

const About = () => {
  return (
    <div>
      <span>
        {" "}
        <LeftSection />
        <RightSection />
      </span>
      <div
        style={{
          height: "100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <LogoLoop
          logos={techLogos}
          speed={80}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Technology partners"
        />
      </div>
    </div>
  );
};

export default About;
