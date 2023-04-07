import React, { useState, useEffect, useContext } from "react";
import "./Movie-center.styles.scss";
import axios from "axios";

import MoviesCarousel from "../moviesCarousel/MoviesCarousel";
import { MoviesContext } from "../../contexts/movies.contexts";

const MovieCenter = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [playTrailer, setPlayTrailer] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);

  const {
    mustWatchMovies,
    animatedMovies,
    comediesMovies,
    dramadMovies,
    crimeMovies,
    musicalMovies,
  } = useContext(MoviesContext);

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

  const fetchComedyMovies = async () => {
    const path = `discover/movie`;
    const {
      data: { results },
    } = await axios.get(`${apiURL}${path}`, {
      params: {
        api_key: apiKey,
        with_genres: 35,
        page: 3,
      },
    });

    // Results is an array of {id:--, name:--}
    setComedyMovies(results);
  };

  const fetchRecommendedMovies = async () => {
    const path = `discover/movie`;
    const {
      data: { results },
    } = await axios.get(`${apiURL}${path}`, {
      params: {
        api_key: apiKey,
        with_genres: 16,
      },
    });

    // Results is an array of {id:--, name:--}
    setRecommendedMovies(results);
  };

  useEffect(() => {
    fetchMovies();
    fetchRecommendedMovies();
    fetchComedyMovies();
  }, []);

  return (
    <div className="movie-center">
      <MoviesCarousel movies={recommendedMovies} type="animated" />
      <MoviesCarousel movies={crimeMovies} type="crime" />
      <a className="show-more-button">
        <span>Show More</span>
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
    </div>
  );
};

export default MovieCenter;
