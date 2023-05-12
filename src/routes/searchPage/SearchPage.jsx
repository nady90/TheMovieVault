import React, { useContext } from "react";
import "./SearchPage.styles.scss";

import { MoviesContext } from "../../contexts/movies.context";
import Header from "../../components/header/Header";
import { NavLink, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const { search, setSearch } = useContext(MoviesContext);
  const imgPath = "https://image.tmdb.org/t/p/original";
  const apiKey = "e596aa0f4b9bb6cd5497d3c34451645f";

  const navigate = useNavigate();

  console.log("Inside of search page", search);

  return (
    <div className="search-page">
      <Header type={"fixed"} />
      <h1>Your Search Results</h1>
      <div className="search-movies-container">
        {search.map((movie, idx) => {
          if (idx >= 3) return;
          return (
            <div className="searched-movie">
              <NavLink to={`/movie/${movie.id}`}>
                <img
                  className="movie-img"
                  src={`${imgPath}${movie.poster_path}`}
                  alt=""
                />
              </NavLink>
              <div className="movie-metadata">
                <span className="movie-title">{movie.title}</span>
                <span className="movie-date">
                  {movie.release_date.slice(0, 4)}
                </span>
                <p className="overview">{movie.overview}</p>
                <button
                  onClick={() => {
                    navigate(`/movie/${movie.id}`);
                  }}
                  className="movie-btn"
                >
                  Visit Movie Page
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
