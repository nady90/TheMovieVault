import React from "react";
import "./Selected-Movie-Container.styles.scss";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import YouTube from "react-youtube";

import movieWallpaper from "../../assets/MovieWallpaper.png";
import MoviesCarousel from "../moviesCarousel/MoviesCarousel";
import imdbicon from "../../assets/imdbicon.png";
import { MoviesContext } from "../../contexts/movies.context";
import SelectedMovieContainerSkeleton from "../../components/selected-movie-container-skeleton/Selected-movie-container-skeleton";

import { addMoviesToUserDocument } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";

const SelectedMovieContainer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const {
    animatedMovies,
    mustWatchMovies,
    crimeMovies,
    favouriteMovies,
    seenMovies,
  } = useContext(MoviesContext);
  const { currentUser } = useContext(UserContext);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  const youtubeRef = useRef(null);

  const imgPath = "https://image.tmdb.org/t/p/original";
  const apiKey = "e596aa0f4b9bb6cd5497d3c34451645f";
  const apiURL = "https://api.themoviedb.org/3/";

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search/movie" : "discover/movie";
    const {
      data: { results },
    } = await axios.get(`${apiURL}${type}`, {
      params: {
        api_key: apiKey,
        query: searchKey,
        append_to_response: "videos",
      },
    });
    selectMovie(results[0]);
    setMovies(results);
  };

  const fetchMovie = async (id) => {
    const data = await axios.get(`${apiURL}/movie/${id}`, {
      params: {
        api_key: apiKey,
        append_to_response: "videos",
      },
    });
    return data;
  };

  const selectMovie = async (movie) => {
    const { data } = await fetchMovie(movie.id);
    setSelectedMovie(data);
  };

  const handelAddMovie = async () => {
    if (selectedMovie == {}) return;
    console.log(selectedMovie);
    const res = await addMoviesToUserDocument(currentUser, [selectedMovie]);

    console.log(res);
  };

  const getVideoKey = async (id) => {
    if (selectedMovie == {} || selectedMovie.id == undefined) return;
    const apiKey = "e596aa0f4b9bb6cd5497d3c34451645f";

    //https://api.themoviedb.org/3/movie/157336/videos?api_key={api_key}
    const { data: results } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
    );

    console.log(results.results[0].key);
    return results.results[0].key;
  };

  const handleShowTrailer = async () => {
    const key = await getVideoKey(selectedMovie.id);
    setShowTrailer(true);
    setTrailerKey(key);
  };

  const closeTrailerWhenClickingOutside = (event) => {
    if (youtubeRef.current && !youtubeRef.current.contains(event.target)) {
      // alert("You clicked outside of me!");
      setShowTrailer(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeTrailerWhenClickingOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener(
        "mousedown",
        closeTrailerWhenClickingOutside
      );
    };
  }, [youtubeRef]);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, [selectedMovie]);

  // console.log(selectedMovie);

  const getGenres = () => {
    if (
      !selectedMovie ||
      !selectedMovie.genres ||
      selectedMovie.genres.length === 0
    ) {
      return " ";
    } else {
      if (selectedMovie.genres.length > 1) {
        return `${selectedMovie.genres[0].name}, ${selectedMovie.genres[1].name}`;
      }
      return `${selectedMovie.genres[0].name}`;
    }
  };

  return (
    <>
      <div
        className="selected-movie-container"
        style={{
          backgroundImage: `url(${imgPath}${selectedMovie.backdrop_path})`,
        }}
      >
        {!isLoaded ? (
          <SelectedMovieContainerSkeleton />
        ) : (
          <div className="selected-movie-content-container">
            <h2 className="selected-movie-title">{selectedMovie.title}</h2>
            <p className="selected-movie-overview">{selectedMovie.overview}</p>

            <div className="genre-container">
              <h3>GENRES</h3>
              <span> {getGenres()} </span>
            </div>
            <div className="buttons-container">
              <a className="watch-button" onClick={handleShowTrailer}>
                <span>WATCH</span>
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="playicon"
                    d="M2 2L14 8.6394L2 15.2788V2Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a className="mylist-button" onClick={handelAddMovie}>
                <span>MY LIST</span>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="addicon"
                    d="M16.936 10.2H10.564V16.5H6.712V10.2H0.34V6.6H6.712V0.299998H10.564V6.6H16.936V10.2Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
            <div className="meta-data-container">
              <img src={imdbicon} alt="" />
              <span className="rating">
                {selectedMovie.vote_average
                  ? selectedMovie.vote_average.toFixed(1)
                  : ""}
              </span>
              <span className="date">
                {selectedMovie.release_date
                  ? selectedMovie.release_date.split("-")[0]
                  : ""}
              </span>
            </div>
          </div>
        )}

        {showTrailer && (
          <div className="youtube-container" ref={youtubeRef}>
            <YouTube
              videoId={trailerKey}
              className="youtube-player"
              opts={{
                height: "100%",
                width: "100%",
              }}
            />
            <div
              className="close-yt"
              onClick={() => {
                setShowTrailer(false);
              }}
            >
              Close Trailer
            </div>
          </div>
        )}

        <MoviesCarousel
          movies={movies}
          selectMovie={selectMovie}
          type="mustWatch"
          favouriteMovies={favouriteMovies}
          seenMovies={seenMovies}
        />
      </div>
    </>
  );
};

export default SelectedMovieContainer;
