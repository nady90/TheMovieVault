import React, { useState, useContext, useEffect } from "react";
import { useRef } from "react";
import "./Movie-card.styles.scss";

import "react-loading-skeleton/dist/skeleton.css";
import imdbicon from "../../assets/imdbicon.png";
import whiteheartimg from "../../assets/whiteheartimg.png";
import redheartimg from "../../assets/redheatimg.png";
import CardSkeleton from "../movie-card-skeleton/Movie-card-skeleton";

import { useNavigate } from "react-router-dom";

import {
  addMoviesToUserDocument,
  removeMoviesFromUserDocument,
  addSeenMoviesToUserDocument,
  removeSeenMoviesFromUserDocument,
} from "../../utils/firebase/firebase.utils.js";
import { UserContext } from "../../contexts/user.context";

const MovieCard = ({
  movie,
  selectMovie,
  isLoaded,
  favouriteMovies,
  playDoubleBeep,
  clickable = true,
  seenMovies,
}) => {
  const { currentUser } = useContext(UserContext);
  const [favouriteMovie, setFavoriteMovie] = useState(false);
  const [seenMovie, setSeenMovie] = useState(false);
  const alertRef = useRef(null);
  const eyeAlertRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setFavoriteMovie(false);
    favouriteMovies.map((databaseMovie) => {
      if (databaseMovie.id == movie.id) {
        return setFavoriteMovie(true);
      }
    });
  }, [favouriteMovies]);

  useEffect(() => {
    setSeenMovie(false);
    if (!seenMovies || seenMovies.length === 0) return;
    seenMovies.map((databaseMovie) => {
      if (databaseMovie.id == movie.id) {
        return setSeenMovie(true);
      }
    });
  }, [seenMovies]);

  const imgPath = "https://image.tmdb.org/t/p/w500/";
  const formatedReleaseDate = () => {
    if (movie.release_date) {
      return movie.release_date.split("-")[0];
    }
  };

  const handleClick = (movie) => {
    if (selectMovie) selectMovie(movie);
    if (!clickable) return;
    navigate(`movie/${movie.id}`);
  };

  const handleAddMovie = () => {
    if (!currentUser) {
      playDoubleBeep();

      alertRef.current.style.display = "block";

      setTimeout(() => {
        alertRef.current.style.display = "none";
      }, 1200);
      return;
    }

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

  const handleAddSeenMovie = async () => {
    if (!currentUser) {
      playDoubleBeep();

      eyeAlertRef.current.style.display = "block";
      setTimeout(() => {
        eyeAlertRef.current.style.display = "none";
      }, 1200);
      return;
    }

    if (seenMovie) {
      await removeSeenMoviesFromUserDocument(currentUser, [movie]);
      setSeenMovie(false);
    } else {
      await addSeenMoviesToUserDocument(currentUser, [movie]);
      setSeenMovie(true);
    }
  };

  return (
    <>
      {isLoaded === false ? (
        <CardSkeleton />
      ) : (
        <div key={movie.id} className="card-container">
          <div
            className="thumbnail-container"
            onClick={() => {
              handleClick(movie);
            }}
          >
            <img
              loading="lazy"
              className="thumbnail"
              src={`${imgPath}${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          <div className="title-container">
            <span>{movie.title}</span>
          </div>
          <div className="date-contaier"> {formatedReleaseDate()} </div>
          <div className="rating-container">
            <div className="imdb-rating">
              <img loading="lazy" src={imdbicon} alt="" />
              <span> {movie.vote_average} </span>
            </div>

            <div className="favourite-icons">
              {seenMovie ? (
                <svg
                  className="seen-icon"
                  onClick={handleAddSeenMovie}
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 50 50"
                  xmlSpace="preserve"
                >
                  <circle cx="25" cy="25" r="25" />
                  <polyline
                    points="
             38,15 22,33 12,25 "
                  />
                </svg>
              ) : (
                <div className="eye-container">
                  <svg
                    onClick={handleAddSeenMovie}
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
                  <div ref={eyeAlertRef} className="eye-sign-in-alert">
                    Sign In First!
                  </div>
                </div>
              )}

              {favouriteMovie ? (
                <>
                  <img
                    className="red-heart-img"
                    src={redheartimg}
                    alt={"Added to favorites"}
                    onClick={handleAddMovie}
                    loading="lazy"
                  />
                </>
              ) : (
                <div className="heart-container">
                  <div ref={alertRef} className="sign-in-alert">
                    Sign In First!
                  </div>
                  <img
                    loading="lazy"
                    src={whiteheartimg}
                    alt=""
                    onClick={handleAddMovie}
                  />
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
