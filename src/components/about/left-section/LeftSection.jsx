import "./leftsection.scss";
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

const LeftSection = () => {
  return (
    <div className="left-section">
      <div className="image-section">
        <div className="img-div">
          <img className="image" src="/img/my-3.png" alt="" />
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
  );
};

export default LeftSection;
