import { useEffect, useState } from "react";
import React, { useContext } from "react";
import "./ReviewsPage.styles.scss";

import { MoviesContext } from "../../contexts/movies.context";
import ReviewCard from "../../components/review-card/ReviewCard";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const ReviewsPage = () => {
  const { mustWatchMovies } = useContext(MoviesContext);

  return (
    <div className="reviews-page">
      <Header type="fixed" />
      <h1>User Reviews</h1>
      <div className="reviews-container">
        {mustWatchMovies.map((movie, idx) => {
          if (idx > 10) return;
          return <ReviewCard key={movie.id} movie={movie} />;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default ReviewsPage;
