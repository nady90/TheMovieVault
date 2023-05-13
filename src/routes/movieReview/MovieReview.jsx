import React, { useState, useEffect } from "react";
import "./MovieReview.styles.scss";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import axios from "axios";

const MovieReview = () => {
  const { id } = useParams();

  const [movieReviews, setMovieReviews] = useState([]);
  const [movieObject, setMovieObject] = useState({});

  const apiKey = "e596aa0f4b9bb6cd5497d3c34451645f";
  const apiURL = "https://api.themoviedb.org/3/";
  const imgPath = "https://image.tmdb.org/t/p/original";

  const getReviews = async (id) => {
    const res = await fetch(`${apiURL}movie/${id}/reviews?api_key=${apiKey}`);
    const data = await res.json();

    setMovieReviews(data.results);
  };

  const getMovieDetails = async (movieId) => {
    const { data } = await axios.get(`${apiURL}movie/${movieId}`, {
      params: {
        api_key: apiKey,
        append_to_response: "videos",
      },
    });
    setMovieObject(data);
  };

  useEffect(() => {
    getMovieDetails(id);
    getReviews(id);
  }, []);

  return (
    <div className="all-reviews-container">
      <Header />
      <div className="img-container">
        <img
          src={`${imgPath}${movieObject.backdrop_path}`}
          className={`movie-backdrop`}
          alt=""
        />
        <span className="movie-title">{movieObject.title}</span>
      </div>

      {movieReviews.map((review) => {
        return (
          <div className="review-container" key={review.id}>
            <h1>
              <span className="author-text">Author: </span>
              <span className="author-text-value">{review.author}</span>
            </h1>
            <p className="review-text">{review.content}</p>
            <a href={review.url} className="review-url" target="_blank">
              Read Full Review
            </a>
          </div>
        );
      })}
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="back-to-top"
      >
        <span className="back-to-top-text">Back to Top </span>
        <span className="arrow">&uarr;</span>
      </button>
    </div>
  );
};

export default MovieReview;
