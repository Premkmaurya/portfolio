import "./rightsection.scss";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useRef } from "react";

const RightSection = () => {
  const socialRef = useRef();
  return (
    <div className="main">
      <div className="social" ref={socialRef}>
        <div className="box">
          <motion.span
            drag
            dragElastic={0.5}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10, // lower damping = more bounce
            }}
            dragConstraints={socialRef}
          >
            <div className="link-preview">
              <img src="/img/eagle.jpg" alt="" />
            </div>
            <FaInstagram size={29} />
          </motion.span>
          <motion.span
            drag
            dragElastic={0.5}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10, // lower damping = more bounce
            }}
            dragConstraints={socialRef}
          >
            <div className="link-preview">
              <img src="/img/x.png" alt="" />
            </div>
            <FaXTwitter size={29} />
          </motion.span>
          <motion.span
            drag
            dragElastic={0.5}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10, // lower damping = more bounce
            }}
            dragConstraints={socialRef}
          >
            <div className="link-preview">
              <img src="/img/github.png" alt="" />
            </div>
            <FaGithub size={29} />
          </motion.span>
          <motion.span
            drag
            dragElastic={0.5}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10, // lower damping = more bounce
            }}
            dragConstraints={socialRef}
          >
            <div className="link-preview">
              <img src="/img/linkedin.png" alt="" />
            </div>
            <FaLinkedin size={29} />
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
