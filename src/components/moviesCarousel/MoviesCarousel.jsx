import React, { useState, useEffect } from "react";
import "./MoviesCarousel.styles.scss";
import axios from "axios";

import imdbicon from "../../assets/imdbicon.png";
import whiteheartimg from "../../assets/whiteheartimg.png";

const typesObject = {
  mustWatch: "movies-carousel",
  animated: "movies-carousel animated-carousel",
};

const MoviesCarousel = ({ movies, selectMovie, type }) => {
  const imgPath = "https://image.tmdb.org/t/p/original";

  const handleClick = (movie) => {
    if (type === "mustWatch") {
      selectMovie(movie);
    }
  };

  return (
    <div className={typesObject[type]}>
      {type === "animated" ? (
        <h3>Best Animated Movies</h3>
      ) : (
        <h3>MOVIES YOU MUST WATCH</h3>
      )}
      <div className="scroller-container">
        <div className="must-watch-container">
          {movies.map((movie) => {
            return (
              <div
                key={movie.id}
                className="must-watch-movie"
                onClick={() => {
                  handleClick(movie);
                }}
              >
                <div className="thumbnail-container">
                  <img
                    className="thumbnail"
                    src={`${imgPath}${movie.poster_path}`}
                  />
                </div>

                <div className="title-container">
                  <span>{movie.title}</span>
                </div>
                <div className="date-contaier"> {movie.release_date} </div>
                <div className="rating-container">
                  <div className="imdb-rating">
                    <img src={imdbicon} alt="" />
                    <span> {movie.vote_average} </span>
                  </div>

                  <div className="favourite-icons">
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="eye-icon">
                        <path
                          id="Vector"
                          d="M0.708344 7.99999C0.708344 7.99999 3.54168 2.66666 8.50001 2.66666C13.4583 2.66666 16.2917 7.99999 16.2917 7.99999C16.2917 7.99999 13.4583 13.3333 8.50001 13.3333C3.54168 13.3333 0.708344 7.99999 0.708344 7.99999Z"
                          stroke="white"
                          strokeWidth="0.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M8.5 10C9.6736 10 10.625 9.10457 10.625 8C10.625 6.89543 9.6736 6 8.5 6C7.32639 6 6.375 6.89543 6.375 8C6.375 9.10457 7.32639 10 8.5 10Z"
                          stroke="white"
                          strokeWidth="0.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                    <img src={whiteheartimg} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoviesCarousel;
