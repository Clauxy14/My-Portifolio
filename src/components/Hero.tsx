import React, { useState, useEffect } from "react";
import "./Hero.css";

const Hero: React.FC = () => {
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const fullTitle = "Hi, I'm Your Name";
  const fullSubtitle =
    "Front-End Developer passionate about creating beautiful, interactive web experiences.";

  useEffect(() => {
    let i = 0;
    const typeTitle = () => {
      if (i < fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, i + 1));
        i++;
        setTimeout(typeTitle, 100);
      } else {
        let j = 0;
        const typeSubtitle = () => {
          if (j < fullSubtitle.length) {
            setTypedSubtitle(fullSubtitle.slice(0, j + 1));
            j++;
            setTimeout(typeSubtitle, 50);
          }
        };
        typeSubtitle();
      }
    };
    typeTitle();
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="floating-shape shape1"></div>
        <div className="floating-shape shape2"></div>
        <div className="floating-shape shape3"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          {typedTitle}
          <span className="cursor">|</span>
        </h1>
        <p className="hero-subtitle">{typedSubtitle}</p>
        <a href="#projects" className="cta-button">
          View My Work
        </a>
      </div>
      <div className="hero-image">
        <div className="image-container">
          <img src="/placeholder-avatar.jpg" alt="Your Avatar" />
          <div className="image-glow"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
