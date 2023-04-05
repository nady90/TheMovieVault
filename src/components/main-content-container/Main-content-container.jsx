import React from "react";
import "./Main-content-container.styles.scss";
import HeroSection from "../hero-section/Hero-section";
import MovieCenter from "../movie-center/Movie-center";

const MainContentContainer = () => {
  return (
    <div className="main-content">
      <HeroSection />
      <MovieCenter />
    </div>
  );
};

export default MainContentContainer;
