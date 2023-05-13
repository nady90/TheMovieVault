import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import MovieCard from "./components/movie-card/Movie-card";
import CardSkeleton from "./components/movie-card-skeleton/Movie-card-skeleton";

import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/Home";
import Authentication from "./routes/authentication/Authentication";
import MoviePage from "./routes/movie-page/MoviePage";
import ActorsPage from "./routes/actors-page/ActorsPage";
import ActorsDetailsPage from "./routes/actor-details-page/ActorsDetailsPage";
import SearchPage from "./routes/searchPage/SearchPage";
import ReviewsPage from "./routes/reviews/ReviewsPage";
import MovieReview from "./routes/movieReview/MovieReview";
import ProfilePage from "./routes/ProfilePage/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/auth" element={<Authentication />}></Route>
      <Route path="/movie/:movieId" element={<MoviePage />}></Route>
      <Route path="/actors" element={<ActorsPage />}></Route>
      <Route path="/actor/:id" element={<ActorsDetailsPage />}></Route>
      <Route path="/search" element={<SearchPage />}></Route>
      <Route path="/reviews" element={<ReviewsPage />}></Route>
      <Route path="/review/:id" element={<MovieReview />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
    </Routes>
  );
}

export default App;
