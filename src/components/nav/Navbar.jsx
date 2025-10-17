import "./navbar.css";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
  useGSAP(()=>{
    const tl = gsap.timeline()
    tl.from(".my-name", {
      opacity:0,
      y:-20,
      duration:0.6,
      ease:"power2.in"
    })
    .from(".link",{
      y:-30,
      opacity:0,
      stagger:{
        amount:0.2
      },
      duration:1,
      ease:"power2.out"
    })
  })
  return (
    <div className="nav">
      <div className="container">
        <h1 className="my-name">Prem maurya</h1>
        <div className="links">
          <a className="link" href="#home">Home</a>
          <a className="link" href="#about">About</a>
          <a className="link" href="#projects">Projects</a>
          <a className="link" href="#connect">Connect</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
