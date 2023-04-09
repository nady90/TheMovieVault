import React, { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const MoviesContext = createContext({
  mustWatchMovies: [],
  animatedMovies: [],
  comediesMovies: [],
  dramadMovies: [],
  crimeMovies: [],
  musicalMovies: [],
  horrorMovies: [],
  documentaryMovies: [],
});

export const MoviesProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [mustWatchMovies, setMustWatchMovies] = useState([]);
  const [animatedMovies, setAnimatedMovies] = useState([]);
  const [comediesMovies, setComediesMovies] = useState([]);
  const [dramadMovies, setDramadMovies] = useState([]);
  const [crimeMovies, setCrimeMovies] = useState([]);
  const [musicalMovies, setMusicalMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [documentaryMovies, setDocumentaryMovies] = useState([]);

  const fetchMovies = async (category) => {
    const apiKey = "e596aa0f4b9bb6cd5497d3c34451645f";
    const apiURL = "https://api.themoviedb.org/3/";
    let genre;

    switch (category) {
      case "mustWatchMovies":
        genre = "";
        break;
      case "animated":
        genre = 16;
        break;
      case "comedies":
        genre = 35;
        break;
      case "drama":
        genre = 18;
        break;
      case "crime":
        genre = 80;
        break;
      case "musical":
        genre = 10402;
        break;
      case "horror":
        genre = 27;
        break;
      case "documentary":
        genre = 99;
        break;
      default:
        genre = "";
        break;
    }

    const {
      data: { results },
    } = await axios.get(`${apiURL}discover/movie`, {
      params: {
        api_key: apiKey,
        with_genres: genre,
      },
    });

    switch (category) {
      case "mustWatchMovies":
        setMustWatchMovies(results);
        break;
      case "animated":
        setAnimatedMovies(results);
        break;
      case "comedies":
        setComediesMovies(results);
        break;
      case "drama":
        setDramadMovies(results);
        break;
      case "crime":
        setCrimeMovies(results);
        break;
      case "musical":
        setMusicalMovies(results);
        break;
      case "horror":
        setHorrorMovies(results);
        break;
      case "documentary":
        setDocumentaryMovies(results);
        break;
      default:
        setMustWatchMovies(results);
        break;
    }
  };

  const value = {
    selectedMovie,
    mustWatchMovies,
    animatedMovies,
    comediesMovies,
    dramadMovies,
    crimeMovies,
    musicalMovies,
    horrorMovies,
    documentaryMovies,
  };

  useEffect(() => {
    fetchMovies();
    fetchMovies("animated");
    fetchMovies("comedies");
    fetchMovies("drama");
    fetchMovies("crime");
    fetchMovies("musical");
    fetchMovies("horror");
    fetchMovies("documentary");
  }, []);

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};
