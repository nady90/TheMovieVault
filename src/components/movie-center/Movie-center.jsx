import React, { useState, useEffect } from "react";
import "./Movie-center.styles.scss";
import axios from "axios";

import MoviesCarousel from "../moviesCarousel/MoviesCarousel";

const MovieCenter = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [playTrailer, setPlayTrailer] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

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
    console.log(results);
    setRecommendedMovies(results);
  };

  useEffect(() => {
    fetchMovies();
    fetchRecommendedMovies();
  }, []);

  return (
    <div className="movie-center">
      <MoviesCarousel movies={recommendedMovies} type="recommended" />
      <MoviesCarousel movies={movies} type="recommended" />
      <button>Show More</button>
    </div>
  );
};

export default MovieCenter;
