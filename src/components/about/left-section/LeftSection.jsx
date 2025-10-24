import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./leftsection.scss";




const LeftSection = () => {
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(imgRef.current, { opacity: 0, x: -90 });
    gsap.to(imgRef.current, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",                                         
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  }, []);

  return (
    <div className="left-section">
      <div className="image-section">
        <div className="img-div">
          <img
            ref={imgRef}
            className="image"
            src="/img/my-3.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
