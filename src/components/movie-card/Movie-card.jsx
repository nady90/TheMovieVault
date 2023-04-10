import React, { useState, useContext, useEffect } from "react";
import { useRef } from "react";
import "./Movie-card.styles.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import imdbicon from "../../assets/imdbicon.png";
import whiteheartimg from "../../assets/whiteheartimg.png";
import redheartimg from "../../assets/redheatimg.png";
import { MoviesContext } from "../../contexts/movies.context";
import CardSkeleton from "../movie-card-skeleton/Movie-card-skeleton";
import alertSound from "../../assets/sounds/double-beep-alert.wav";

import {
  addMoviesToUserDocument,
  removeMoviesFromUserDocument,
} from "../../utils/firebase/firebase.utils.js";
import { UserContext } from "../../contexts/user.context";

const MovieCard = ({ movie, type, selectMovie, isLoaded, favouriteMovies }) => {
  const { selectedMovie, mustWatchMovies, animatedMovies } =
    useContext(MoviesContext);
  const { currentUser } = useContext(UserContext);
  const [favouriteMovie, setFavoriteMovie] = useState(false);
  const alertRef = useRef(null);

  useEffect(() => {
    setFavoriteMovie(false);
    favouriteMovies.map((databaseMovie) => {
      if (databaseMovie.id == movie.id) {
        return setFavoriteMovie(true);
      }
    });
  }, [favouriteMovies]);

  const imgPath = "https://image.tmdb.org/t/p/w500/";
  const formatedReleaseDate = () => {
    if (movie.release_date) {
      return movie.release_date.split("-")[0];
    }
  };

  const handleClick = (movie) => {
    if (selectMovie) selectMovie(movie);
  };

  const playSound = (sound) => {
    new Audio(sound).play();
  };

  const handleAddMovie = () => {
    if (!currentUser) {
      playSound(alertSound);
      alertRef.current.style.display = "block";
      setTimeout(() => {
        alertRef.current.style.display = "none";
      }, 2000);
      return;
    }

    console.log(movie);
    if (favouriteMovie) {
      removeMoviesFromUserDocument(currentUser, [movie]);
      console.log("We are removing this");
      setFavoriteMovie(false);
    } else {
      console.log("We are adding this");
      addMoviesToUserDocument(currentUser, [movie]);
      setFavoriteMovie(true);
    }
  };

  return (
    <>
      {isLoaded === false ? (
        <CardSkeleton />
      ) : (
        <div
          key={movie.id}
          className="card-container"
          onClick={() => {
            handleClick(movie);
          }}
        >
          <div className="thumbnail-container">
            <img className="thumbnail" src={`${imgPath}${movie.poster_path}`} />
          </div>

          <div className="title-container">
            <span>{movie.title}</span>
          </div>
          <div className="date-contaier"> {formatedReleaseDate()} </div>
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
              {favouriteMovie ? (
                <>
                  <img src={redheartimg} alt="" onClick={handleAddMovie} />
                </>
              ) : (
                <div className="heart-container">
                  <div ref={alertRef} className="sign-in-alert">
                    Sign In First!
                  </div>
                  <img src={whiteheartimg} alt="" onClick={handleAddMovie} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
