import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import "./leftsection.scss";

const LeftSection = () => {
  return (
    <div className="text-container">
      <div className="text-header">
        <h1>
            Let's <span>work</span>
            <br />
            Together
          </h1>
          <div className="contacts">
            <p>
              <FaPhoneAlt size={15} /> <span>+918423845243</span>
            </p>
            <p>
              <IoIosMail size={22} /> <span>premmaurya537@gmail.com</span>
            </p>
          </div>
      </div>
    </div>
  );
};

export default LeftSection;
