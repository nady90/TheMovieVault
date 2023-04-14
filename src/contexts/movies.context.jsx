import React, { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import axios from "axios";

import {
  getFavoritesIds,
  getSeenMoviesIds,
} from "../utils/firebase/firebase.utils";
import { UserContext } from "./user.context";

export const MoviesContext = createContext({
  favouriteMovies: [],
  seenMovies: [],
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
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [seenMovies, setSeenMovies] = useState([]);

  const { currentUser } = useContext(UserContext);

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
        append_to_response: "videos",
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

  const fetchFavoriteIds = async (user) => {
    const favouriteMoviesIds = await getFavoritesIds(user);
    // console.log("This is in the movies context", favouriteMoviesIds);
    fetchFavoriteMovies(favouriteMoviesIds);

    return favouriteMoviesIds;
  };

  const fetchFavoriteMovies = async (favouriteMoviesIds) => {
    const apiKey = "e596aa0f4b9bb6cd5497d3c34451645f";
    const apiURL = "https://api.themoviedb.org/3/movie";

    if (!favouriteMoviesIds) return;

    favouriteMoviesIds.forEach(async (movieId) => {
      const { data } = await axios.get(`${apiURL}/${movieId}`, {
        params: {
          api_key: apiKey,
        },
      });
      setFavouriteMovies((favouriteMovies) => [...favouriteMovies, data]);
    });
  };

  const fetchSeenMoviesIds = async (user) => {
    const seenMoviesIds = await getSeenMoviesIds(user);
    fetchSeenMovies(seenMoviesIds);

    return seenMoviesIds;
  };

  const fetchSeenMovies = async (seenMoviesIds) => {
    const apiKey = "e596aa0f4b9bb6cd5497d3c34451645f";
    const apiURL = "https://api.themoviedb.org/3/movie";

    if (!seenMoviesIds) return;

    seenMoviesIds.forEach(async (movieId) => {
      const { data } = await axios.get(`${apiURL}/${movieId}`, {
        params: {
          api_key: apiKey,
        },
      });
      setSeenMovies((seenMovies) => [...seenMovies, data]);
    });
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
    favouriteMovies,
    seenMovies,
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

  useEffect(() => {
    fetchFavoriteIds(currentUser);
    fetchSeenMoviesIds(currentUser);
  }, [currentUser]);

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};
