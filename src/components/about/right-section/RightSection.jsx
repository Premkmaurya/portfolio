import "./rightsection.scss";
import { LuExternalLink } from "react-icons/lu";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const certificate = [
  {
    url: "/img/certificate.png",
    title: "JOB READY COHORT",
    org: "Sheryians coding school",
  },
  {
    url: "https://ik.imagekit.io/sk6swwncb/Prem%20Kumar%20Maury.png?updatedAt=1758564039170",
    title: "JOB READY HACKATHON",
    org: "Sheryians coding school",
  },
];

const RightSection = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(SplitText);

    let split = SplitText.create(".para", { type: "lines" });
    const tl = gsap.timeline();
    // now animate the characters in a staggered fashion
    tl.from(split.lines, {
      duration: 1,
      y: 50, // animate from 100px below
      autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      stagger: 0.05, // 0.05 seconds between each
      scrollTrigger: {
        trigger: ".para",
        start: "bottom 80%",
        toggleActions: "play none none none",
      },
    }).from(".certificate div", {
      duration: 1,
      y: 50,
      autoAlpha: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".certificates",
        start: "top 80%",
        markers: true,
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div>
      <div className="right-section">
        <div className="main">
          <div className="first-section">
            <div className="paragraph">
              <p className="para">
                Hi, I’m Prem Maurya, a passionate Full-Stack Web Developer and
                UI/UX Designer who loves turning ideas into interactive,
                visually stunning web experiences. I work with technologies like{" "}
                <b>React</b>, <b>Node.js</b>, <b>Express</b>, <b>MongoDB</b>,
                and <b>Tailwind CSS</b>, focusing on clean code, modern design,
                and user-centric experiences. When I’m not coding, I’m usually
                exploring new design trends, improving user interfaces, or
                learning something new to stay ahead in this ever-evolving tech
                world.
              </p>
            </div>
          </div>
          <div className="second-section">
            <h1>Certificates</h1>
            <div className="certificates">
              <div className="certificate">
                {certificate.map((cer) => {
                  return (
                    <div
                      onClick={() => {
                        window.open(cer.url, "_blank");
                      }}
                    >
                      <img src={cer.url} />
                      <LuExternalLink className="external-link" />
                      <div className="info">
                        <h3>{cer.title}</h3>
                        <p>{cer.org}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
