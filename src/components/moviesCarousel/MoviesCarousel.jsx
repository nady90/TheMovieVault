import React, { useState, useEffect } from "react";
import "./MoviesCarousel.styles.scss";

import MovieCard from "../movie-card/Movie-card";

const typesObject = {
  mustWatch: "movies-carousel",
  animated: "movies-carousel animated-carousel",
  comedy: "movies-carousel animated-carousel",
  crime: "movies-carousel animated-carousel",
  drama: "movies-carousel animated-carousel",
  musical: "movies-carousel animated-carousel",
};

const MoviesCarousel = ({ movies, selectMovie, type, setMovie }) => {
  const categoryTitle = () => {
    if (type === "animated") {
      return <h3>BEST ANIMATED MOVIES</h3>;
    } else if (type === "comedy") {
      return <h3>BEST COMEDIES</h3>;
    } else if (type === "crime") {
      return <h3>BEST CRIMES</h3>;
    } else if (type === "drama") {
      return <h3>BEST COMEDIES</h3>;
    } else if (type === "musical") {
      return <h3>BEST MUSICALS</h3>;
    } else {
      return <h3>MOVIES YOU MUST WATCH</h3>;
    }
  };

  return (
    <div className={typesObject[type]}>
      {categoryTitle()}
      <div className="scroller-container">
        <div className="must-watch-container">
          {movies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                setMovie={setMovie}
                movie={movie}
                type="mustWatch"
                selectMovie={selectMovie}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoviesCarousel;
