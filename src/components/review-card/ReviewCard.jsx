import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./ReviewCard.styles.scss";
import { NavLink } from "react-router-dom";

const ReviewCard = ({ reviewObject, movie }) => {
  const [movieReviews, setMovieReviews] = useState([]);

  const apiKey = "e596aa0f4b9bb6cd5497d3c34451645f";
  const apiURL = "https://api.themoviedb.org/3/";
  const imgPath = "https://image.tmdb.org/t/p/original";

  const navigate = useNavigate();

  const getReviews = async (id) => {
    const res = await fetch(`${apiURL}movie/${id}/reviews?api_key=${apiKey}`);
    const data = await res.json();

    setMovieReviews(data.results);
  };

  useEffect(() => {
    getReviews(movie.id);
  }, []);

  return (
    <div className="review-card">
      <img
        onClick={() => {
          navigate(`/movie/${movie.id}`);
        }}
        className="movie-img"
        src={`${imgPath}${movie.backdrop_path}`}
        alt=""
      />

      <div className="review-content">
        <h3>Title: {movie.title}</h3>
        {movieReviews &&
          movieReviews.map((review, idx) => {
            if (idx >= 1) return;
            return (
              <>
                <h4>Author: {review.author}</h4>
                <p>{review.content}</p>
              </>
            );
          })}
        <button onClick={() => navigate(`/review/${movie.id}`)}>
          Get More Reviews
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
