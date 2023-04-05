import React, { useState } from "react";
import "./Movie-card.styles.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieCard = ({ movie }) => {
  const { title, imgUrl, release_date, vote_average } = movie;
  const imgPath = "https://image.tmdb.org/t/p/w500/";
  const formatedReleaseDate = release_date.split("-")[0];

  return (
    <div className="movie-card-container">
      <div className="img-container">
        <img src={`${imgPath}${movie.poster_path}`} alt={title} />
      </div>
      <div className="content-container">
        <h4>{title}</h4>
        <span className="release-date">{formatedReleaseDate}</span>
        <div className="bottom-content-container">
          <div className="rating-container">
            <span className="vote-avg">{vote_average}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
