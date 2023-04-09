import React from "react";
import "./Selected-Movie-Container.styles.scss";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import movieWallpaper from "../../assets/MovieWallpaper.png";
import MoviesCarousel from "../moviesCarousel/MoviesCarousel";
import imdbicon from "../../assets/imdbicon.png";
import { MoviesContext } from "../../contexts/movies.context";

const SelectedMovieContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [playTrailer, setPlayTrailer] = useState(false);
  const { animatedMovies, mustWatchMovies, crimeMovies } =
    useContext(MoviesContext);

  const imgPath = "https://image.tmdb.org/t/p/original";
  const apiKey = "e596aa0f4b9bb6cd5497d3c34451645f";
  const apiURL = "https://api.themoviedb.org/3/";

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search/movie" : "discover/movie";
    const {
      data: { results },
    } = await axios.get(`${apiURL}${type}`, {
      params: {
        api_key: apiKey,
        query: searchKey,
      },
    });
    selectMovie(results[0]);
    setMovies(results);
  };

  const fetchMovie = async (id) => {
    const data = await axios.get(`${apiURL}/movie/${id}`, {
      params: {
        api_key: apiKey,
        append_to_response: "videos",
      },
    });
    return data;
  };

  const selectMovie = async (movie) => {
    const { data } = await fetchMovie(movie.id);
    setSelectedMovie(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // console.log(selectedMovie);

  const getGenres = () => {
    if (
      !selectedMovie ||
      !selectedMovie.genres ||
      selectedMovie.genres.length === 0
    ) {
      return " ";
    } else {
      if (selectedMovie.genres.length > 1) {
        return `${selectedMovie.genres[0].name}, ${selectedMovie.genres[1].name}`;
      }
      return `${selectedMovie.genres[0].name}`;
    }
  };

  return (
    <div
      className="selected-movie-container"
      style={{
        backgroundImage: `url(${imgPath}${selectedMovie.backdrop_path})`,
      }}
    >
      <div className="selected-movie-content-container">
        <h2 className="selected-movie-title">{selectedMovie.title}</h2>
        <p className="selected-movie-overview">{selectedMovie.overview}</p>

        <div className="genre-container">
          <h3>GENRES</h3>
          <span> {getGenres()} </span>
        </div>
        <div className="buttons-container">
          <a className="watch-button">
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
          <a className="mylist-button">
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
            {selectedMovie.vote_average
              ? selectedMovie.vote_average.toFixed(1)
              : ""}
          </span>
          <span className="date">
            {selectedMovie.release_date
              ? selectedMovie.release_date.split("-")[0]
              : ""}
          </span>
        </div>
      </div>
      <MoviesCarousel
        movies={movies}
        selectMovie={selectMovie}
        type="mustWatch"
      />
    </div>
  );
};

export default SelectedMovieContainer;
