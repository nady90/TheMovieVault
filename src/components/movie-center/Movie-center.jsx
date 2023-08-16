import React, { useState, useEffect, useContext } from "react";
import "./Movie-center.styles.scss";
import axios from "axios";

import MoviesCarousel from "../moviesCarousel/MoviesCarousel";
import { MoviesContext } from "../../contexts/movies.context";

const MovieCenter = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [visible, setVisible] = useState(true);
  const [mainPageNo, setMainPageNo] = useState(0);

  const {
    musicalMovies,
    horrorMovies,
    documentaryMovies,
    favouriteMovies,
    seenMovies,
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

  const handleShowMore = () => {
    setVisible((prev) => !prev);
    if (mainPageNo == 0) {
      setMainPageNo(1);
    }
  };

  const handleShowLess = () => {
    setVisible((prev) => !prev);
    if (mainPageNo == 1) {
      setMainPageNo(0);
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 100);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchRecommendedMovies();
    fetchComedyMovies();
  }, []);

  return (
    <div className="movie-center">
      <MoviesCarousel
        movies={recommendedMovies}
        type="animated"
        favouriteMovies={favouriteMovies}
        seenMovies={seenMovies}
      />
      <MoviesCarousel
        movies={documentaryMovies}
        type="documentary"
        favouriteMovies={favouriteMovies}
        seenMovies={seenMovies}
      />
      {visible && (
        <a className="show-more-button" onClick={handleShowMore}>
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
      )}
      {mainPageNo == 0 ? null : (
        <div className="more-content-container">
          <MoviesCarousel
            movies={musicalMovies}
            type="musical"
            favouriteMovies={favouriteMovies}
          />
          <MoviesCarousel
            movies={horrorMovies}
            type="horror"
            favouriteMovies={favouriteMovies}
          />
          {!visible && (
            <a className="show-less-button" onClick={handleShowLess}>
              <span>Show Less</span>
              <svg viewBox="0 0 384 512">
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieCenter;
