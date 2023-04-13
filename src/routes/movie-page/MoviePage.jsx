import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Aside from "../../components/aside/Aside";
import "./MoviePage.style.scss";
import imdbicon from "../../assets/imdbicon.png";
import YouTube from "react-youtube";
import CastCard from "../../components/cast-card/CastCard";

/**
 * 1. Get the movie object associated with the id → /movie/{movie_id} .... append_to_response=videos
 * 2. Set the layout with the header,footer + aside and the main content container
 * 3. Set the modified selected movie container: What extra info can we show?
 * 4. Set the movie details container → /movie/{movie_id}/credits + trailer from selected-movie-container
 * 5. "More like this" div? /movie/{movie_id}/recommendations
 *
 */

const MoviePage = () => {
  const { movieId } = useParams();
  const [movieObject, setMovieObject] = useState({});
  const [cast, setCast] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);

  const apiKey = "e596aa0f4b9bb6cd5497d3c34451645f";
  const apiURL = "https://api.themoviedb.org/3/";
  const imgPath = "https://image.tmdb.org/t/p/original";

  const getMovieDetails = async (movieId) => {
    const { data } = await axios.get(`${apiURL}movie/${movieId}`, {
      params: {
        api_key: apiKey,
        append_to_response: "videos",
      },
    });
    setMovieObject(data);
  };

  const getCast = async () => {
    if (movieObject == {}) return;
    if (movieObject.id == undefined) return;
    const {
      data: { cast },
    } = await axios.get(`${apiURL}movie/${movieObject.id}/credits`, {
      params: {
        api_key: apiKey,
      },
    });
    setCast(cast);
  };

  const getGenres = () => {
    if (
      !movieObject ||
      !movieObject.genres ||
      movieObject.genres.length === 0
    ) {
      return " ";
    } else {
      if (movieObject.genres.length > 1) {
        return `${movieObject.genres[0].name}, ${movieObject.genres[1].name}`;
      }
      return `${movieObject.genres[0].name}`;
    }
  };

  const getSimilarMovies = async () => {
    const {
      data: { results },
    } = await axios.get(`${apiURL}movie/${movieId}/recommendations`, {
      params: {
        api_key: apiKey,
        append_to_response: "videos",
      },
    });
    setSimilarMovies(results);
  };

  const handleShowTrailer = () => {};
  const handelAddMovie = () => {};

  const renderYouTube = () => {
    if (movieObject.videos !== undefined) {
      return (
        <YouTube
          videoId={movieObject.videos.results[0].key}
          className="youtube-player"
          opts={{
            height: "100%",
            width: "100%",
          }}
        />
      );
    }
  };

  console.log("Similar movies:", similarMovies);

  useEffect(() => {
    getMovieDetails(movieId);
    getSimilarMovies();
  }, []);

  useEffect(() => {
    getCast();
    getSimilarMovies();
  }, [movieObject]);

  return (
    <div className="movie-page-layout">
      <Header />
      <div
        className="movie-details"
        style={{
          backgroundImage: `url(${imgPath}${movieObject.backdrop_path})`,
        }}
      >
        <div className="movie-content-outer-container">
          <div className="movie-content">
            <h1>{movieObject.title}</h1>
            <p>{movieObject.overview}</p>

            <div className="genre-container">
              <h3>GENRES</h3>
              <span>{getGenres()}</span>
            </div>

            <div className="buttons-container">
              <a className="watch-button" onClick={handleShowTrailer}>
                <span>WATCH</span>
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="playicon"
                    d="M2 2L14 8.6394L2 15.2788V2Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a className="mylist-button" onClick={handelAddMovie}>
                <span>MY LIST</span>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="addicon"
                    d="M16.936 10.2H10.564V16.5H6.712V10.2H0.34V6.6H6.712V0.299998H10.564V6.6H16.936V10.2Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>

            <div className="meta-data-container">
              <img src={imdbicon} alt="" />
              <span className="rating">
                {movieObject.vote_average
                  ? movieObject.vote_average.toFixed(1)
                  : ""}
              </span>
              <span className="date">
                {movieObject.release_date
                  ? movieObject.release_date.split("-")[0]
                  : ""}
              </span>
            </div>

            <div className="extra-info">
              <h3>AUDIO</h3>
              <p className="lang-container">
                {movieObject.spoken_languages == undefined
                  ? ""
                  : movieObject.spoken_languages.map((obj, index, list) => {
                      return (
                        <span className="lang" key={index}>
                          {index == list.length - 1
                            ? `${obj.name}`
                            : `${obj.name},`}
                        </span>
                      );
                    })}
              </p>
              <h3>PRODUCTION</h3>
              <p>
                {movieObject.production_companies == undefined
                  ? ""
                  : movieObject.production_companies[0].name}
              </p>
            </div>
          </div>
        </div>

        <div className="movie-cast-and-trailer">
          <div className="trailer-container">
            <h2>TRAILER</h2>
            <div className="trailer-inner-container">
              {movieObject == {} ||
              movieObject.videos == undefined ||
              movieObject.videos == undefined
                ? ""
                : renderYouTube()}
            </div>
          </div>
          <div className="cast-container">
            <h2>CAST AND CREW INFO</h2>
            <div className="cast-inner-container">
              {cast.map((actor, index) => {
                if (index > 5) return;
                return <CastCard actor={actor} />;
              })}
            </div>
            {!showMore ? (
              <a>
                <span>SHOW MORE</span>
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="downArrowIcon"
                    d="M15 1.99999L8.5 7.78367L2 2.00001"
                    stroke="#E7E7E7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ) : (
              <a>
                <span>SHOW LESS</span>
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="downArrowIcon"
                    d="M15 1.99999L8.5 7.78367L2 2.00001"
                    stroke="#E7E7E7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className="similar-movies-container">
          <h3>MORE LIKE THIS</h3>
          <div className="similar-movies-inner-container">
            {similarMovies.map((movie, idx) => {
              if (idx > 4) return;
              return (
                <img
                  className="similar-movie"
                  src={`${imgPath}/${movie.poster_path}`}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MoviePage;
