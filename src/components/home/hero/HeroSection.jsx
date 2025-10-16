import "./hero.scss";
import CircularText from "./circular text/CircularText";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import {useGSAP} from '@gsap/react';

const HeroSection = () => {
  useGSAP(() => {
    gsap.registerPlugin(SplitText);
    let split = SplitText.create(".heading", { type: "chars" });

    // now animate the characters in a staggered fashion
    gsap.from(split.chars, {
      duration: 1,
      y: 100, // animate from 100px below
      autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      stagger: 0.05, // 0.05 seconds between each
    });
  });

  return (
    <>
      <div className="container">
        <h1 className="heading">Portfolio</h1>
        <div className="skillsDiv">
          <div className="skills">
            <div>
              <h2>UI/UX designer</h2>
            </div>
            <div>
              <h2>Full Stack Developer</h2>
            </div>
            <div>
              <h2>MERN Stack Developer</h2>
            </div>
            <div>
              <h2>Frontend Developer</h2>
            </div>
          </div>
        </div>
        <div className="imgBox">
          <img className="image" src="/img/my.png" alt="Prem Maurya" />
        </div>
        <div className="paraDiv">
          <p className="para">
            Hey, I’m Prem Maurya — a web magician who blends design and code to
            create digital experiences that people actually enjoy using. From
            sketching UI ideas to writing clean backend logic, I love every step
            that brings a website to life. Whether it’s designing interfaces or
            developing full-stack apps.
          </p>
          <button className="connect-btn">Let's connect!</button>
        </div>
        <div className="resume-link-div">
          <div className="link-div">
            <div
              className="link"
              onClick={() => {
                window.open("https://www.google.com", "_blank");
              }}
            >
              Resume
            </div>
          </div>
          <div className="arrow-gif">
            <img className="arrow" src="/img/i2.gif" alt="" />
          </div>
        </div>
        <CircularText
          text="PREM*MAURYA*"
          onHover="speedUp"
          spinDuration={20}
          className="circular-text"
        />
      </div>
    </>
  );
};

export default HeroSection;
