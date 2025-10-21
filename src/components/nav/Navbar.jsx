import "./navbar.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { useNavbar } from "../../context/NavContext";
import { useEffect } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

const Navbar = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useNavbar();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".my-name", {
      opacity: 0,
      y: -25,
      duration: 0.6,
      ease: "power2.in",
    }).from(".link", {
      y: -30,
      opacity: 0,
      stagger: {
        amount: 0.2,
      },
      duration: 1,
      ease: "power2.out",
    });
  });
  useGSAP(() => {
    if (isSidebarOpen) {
      gsap.to(".sidebar", {
        top: 0,
        display: "block",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(".sidebar", {
        top: "-100%",
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(".sidebar", { display: "none" });
        },
      });
    }
  }, [isSidebarOpen]);

  return (
    <div className="nav">
      <div className="container">
        <h1 className="my-name">Prem maurya</h1>
        <div className="ham-icons" onClick={toggleSidebar}>
          <div className="wrapper">
            <ImCross
              className={`hamburger-icon-1 ${isSidebarOpen ? "active" : ""}`}
            />
            <ImCross
              className={`hamburger-icon-2 ${isSidebarOpen ? "active" : ""}`}
            />
          </div>
        </div>
        <div className="links">
          <a onClick={()=>closeSidebar()} className="link" href="#home">
            Home
          </a>
          <a onClick={()=>closeSidebar()} className="link" href="#about">
            About
          </a>
          <a onClick={()=>closeSidebar()} className="link" href="#projects">
            Projects
          </a>
          <a onClick={()=>closeSidebar()} className="link" href="#connect">
            Connect
          </a>
        </div>
      </div>
      <div className="sidebar">
        <img src="/img/sidebar.png" alt="sidebar" />
        <div className="sidebar-navigate-links">
          <a className="sidebar-link" href="#home">
            Home
          </a>
          <a className="sidebar-link" href="#about">
            About
          </a>
          <a className="sidebar-link" href="#projects">
            Projects
          </a>
          <a className="sidebar-link" href="#connect">
            Connect
          </a>
        </div>
        <RxCross1 onClick={()=>closeSidebar()} size={27} className="close-icon" />
        <div className="social-links">
          <div className="box">
            <span
              onClick={() => {
                window.open(
                  "https://www.instagram.com/premmaurya222/",
                  "_blank"
                );
              }}
            >
              <div className="link-preview">
                <img src="/img/eagle.jpg" alt="" />
              </div>
              <FaInstagram size={29} />
            </span>
            <span
              onClick={() => {
                window.open("https://x.com/PremMaurya723", "_blank");
              }}
            >
              <div className="link-preview">
                <img src="/img/x.png" alt="" />
              </div>
              <FaXTwitter size={29} />
            </span>
            <span
              onClick={() => {
                window.open("https://github.com/Premkmaurya", "_blank");
              }}
            >
              <div className="link-preview">
                <img src="/img/github.png" alt="" />
              </div>
              <FaGithub size={29} />
            </span>
            <span
              onClick={() => {
                window.open(
                  "https://www.linkedin.com/in/prem-maurya-8640b5319/",
                  "_blank"
                )
              }}
            >
              <div className="link-preview">
                <img src="/img/linkedin.png" alt="" />
              </div>
              <FaLinkedin size={29} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
