import React from "react";
import "./Main-content-container.styles.scss";
import MovieCenter from "../movie-center/Movie-center";
import SelectedMovieContainer from "../selected-movie-container/Selected-Movie-Container";

const MainContentContainer = () => {
  return (
    <div className="main-content">
      <SelectedMovieContainer />
      <MovieCenter />
    </div>
  );
};

export default MainContentContainer;
