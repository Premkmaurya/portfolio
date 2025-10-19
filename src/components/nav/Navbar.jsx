import "./navbar.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ImCross } from "react-icons/im";
import { useNavbar } from "../../context/NavContext";

const Navbar = () => {
  const { isSidebarOpen, toggleSidebar } = useNavbar();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".my-name", {
      opacity: 0,
      y: -20,
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
          <a className="link" href="#home">
            Home
          </a>
          <a className="link" href="#about">
            About
          </a>
          <a className="link" href="#projects">
            Projects
          </a>
          <a className="link" href="#connect">
            Connect
          </a>
        </div>
      </div>
      <div className="sidebar">
        
      </div>
    </div>
  );
};

export default Navbar;
