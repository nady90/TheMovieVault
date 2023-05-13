import React, { useContext } from "react";
import "./UserList.styles.scss";

import { MoviesContext } from "../../contexts/movies.context";
import MovieCard from "../../components/movie-card/Movie-card";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const { favouriteMovies, seenMovies } = useContext(MoviesContext);

  const navigate = useNavigate();

  const imgPath = "https://image.tmdb.org/t/p/original";

  return (
    <div className="user-list-page">
      <Header type={"fixed"} />
      <div className="favorite-container">
        <h2 className="favorite-heading">Your Favorite Movies</h2>
        <div className="favorite-movies-inner-container">
          {!favouriteMovies ? (
            ""
          ) : (
            <>
              {favouriteMovies.map((movie) => {
                return (
                  <div className="movie-card-container">
                    <div className="img-container">
                      <img src={`${imgPath}${movie.poster_path}`} alt="" />
                    </div>
                    <div className="title">{movie.title}</div>
                    <button
                      onClick={() => {
                        navigate(`/movie/${movie.id}`);
                      }}
                      className="movie-btn"
                    >
                      Visit Movie Page
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <div className="seen-container">
        <h2 className="seen-heading">Movies You've Seen</h2>
        <div className="seen-movies-inner-container">
          {!seenMovies ? (
            ""
          ) : (
            <>
              {seenMovies.map((movie) => {
                return (
                  <div className="movie-card-container" key={movie.id}>
                    <div className="img-container">
                      <img src={`${imgPath}${movie.poster_path}`} alt="" />
                    </div>
                    <div className="title">{movie.title}</div>
                    <button
                      onClick={() => {
                        navigate(`/movie/${movie.id}`);
                      }}
                      className="movie-btn"
                    >
                      Visit Movie Page
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserList;
