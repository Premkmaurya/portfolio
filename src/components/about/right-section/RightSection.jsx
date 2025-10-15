import "./rightsection.scss";



const languages = ["javascript","html5","css",]


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
                world. My ultimate goal? To build impactful digital solutions
                and grow into a developer who creates technology that inspires.
              </p>
            </div>
          </div>

          <div className="second-section">
                <h1>Skills</h1>
                <div className="lang">
                  <span><h2>Languages:-</h2>{languages.map(lang=>{
                    return (
                      <p>{lang},</p>
                    )
                  })}</span>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
