import React from "react";
import "./Projects.css";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce site built with React and Node.js.",
    image: "/project1.jpg",
    link: "#",
  },
  {
    title: "Weather App",
    description: "Real-time weather app using APIs and modern UI design.",
    image: "/project2.jpg",
    link: "#",
  },
  {
    title: "Portfolio Website",
    description: "This very portfolio, showcasing my skills and projects.",
    image: "/project3.jpg",
    link: "#",
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>My Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <img src={project.image} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.link} className="project-link">
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
