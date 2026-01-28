import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Newsletter from "../components/Newsletter";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

interface HomeProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ darkMode, setDarkMode }) => {
  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Newsletter />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
