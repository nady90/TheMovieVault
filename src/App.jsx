import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import MovieCard from "./components/movie-card/Movie-card";
import CardSkeleton from "./components/movie-card-skeleton/Movie-card-skeleton";

import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
