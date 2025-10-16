import "./rightsection.scss";
import { LuExternalLink } from "react-icons/lu";


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
  return (
    <div>
      <div className="right-seciton">
        <div className="main">
          <div className="first-section">
            <h1>About Me</h1>
            <div className="paragraph">
              <p>
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
