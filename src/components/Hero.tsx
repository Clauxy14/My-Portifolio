import React from "react";
import "./Hero.css";

const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Hi, I'm Your Name</h1>
        <p className="hero-subtitle">
          Front-End Developer passionate about creating beautiful, interactive
          web experiences.
        </p>
        <a href="#projects" className="cta-button">
          View My Work
        </a>
      </div>
      <div className="hero-image">
        <img src="/placeholder-avatar.jpg" alt="Your Avatar" />
      </div>
    </section>
  );
};

export default Hero;
