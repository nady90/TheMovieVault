import React from "react";
import "./Main-content-container.styles.scss";
import HeroSection from "../hero-section/Hero-section";
import MoviesContainer from "../movies-container/Movies-container";

const MainContentContainer = () => {
  return (
    <div className="main-content">
      <HeroSection />
      <MoviesContainer />;
    </div>
  );
};

export default MainContentContainer;
