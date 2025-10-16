import FallingText from "../skills/FallingText";

const Skills = () => {
  return (
    <div id="skills">
      <FallingText
        text={`React Node JavaScript HTML CSS Git GitHub REST APIs Redux Next.js Express MongoDB Mongoose Figma Tailwind CSS Framer Motion React Spring React Router GSAP Vite Prettier VSCode Postman Vercel Firebase AWS`}
        highlightWords={["React", "Node", "HTML", "CSS", "Git", "GitHub", "Redux", "Express", "MongoDB", "Tailwind", "CSS","GSAP", "Framer", "Motion", "React", "React", "Vite", "VSCode", "Vercel", "AWS"]}
        highlightClass="highlighted"
        trigger="hover"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.56}
        fontSize="2rem"
        mouseConstraintStiffness={0.9}
      />
    </div>
  );
};

export default Skills;
