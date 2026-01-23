import React from "react";
import "./Skills.css";

const skills = [
  { name: "React", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "CSS/SCSS", level: 95 },
  { name: "JavaScript", level: 90 },
  { name: "HTML", level: 100 },
  { name: "Node.js", level: 75 },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2>My Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill">
              <div className="skill-name">{skill.name}</div>
              <div className="skill-bar">
                <div
                  className="skill-fill"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
