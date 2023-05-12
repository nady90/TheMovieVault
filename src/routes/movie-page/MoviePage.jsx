import React, { useEffect, useRef, useState, useContext } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import Aside from "../../components/aside/Aside";
import "./MoviePage.style.scss";
import imdbicon from "../../assets/imdbicon.png";
import YouTube from "react-youtube";
import CastCard from "../../components/cast-card/CastCard";
import Header from "../../components/header/Header";
import { addMoviesToUserDocument } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";

/**
 * 1. Get the movie object associated with the id → /movie/{movie_id} .... append_to_response=videos
 * 2. Set the layout with the header,footer + aside and the main content container
 * 3. Set the modified selected movie container: What extra info can we show?
 * 4. Set the movie details container → /movie/{movie_id}/credits + trailer from selected-movie-container
 * 5. "More like this" div? /movie/{movie_id}/recommendations
 *
 */

const MoviePage = () => {
  const { movieId } = useParams();
  const [movieObject, setMovieObject] = useState({});
  const [cast, setCast] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [logoPath, setLogoPath] = useState("");
  const logoContainerRef = useRef(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const youtubeRef = useRef(null);
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const apiKey = "e596aa0f4b9bb6cd5497d3c34451645f";
  const apiURL = "https://api.themoviedb.org/3/";
  const imgPath = "https://image.tmdb.org/t/p/original";

  const getMovieDetails = async (movieId) => {
    const { data } = await axios.get(`${apiURL}movie/${movieId}`, {
      params: {
        api_key: apiKey,
        append_to_response: "videos",
      },
    });
    setMovieObject(data);
  };

  const getCast = async () => {
    if (movieObject == {}) return;
    if (movieObject.id == undefined) return;
    const {
      data: { cast },
    } = await axios.get(`${apiURL}movie/${movieObject.id}/credits`, {
      params: {
        api_key: apiKey,
      },
    });
    setCast(cast);
  };

  const getGenres = () => {
    if (
      !movieObject ||
      !movieObject.genres ||
      movieObject.genres.length === 0
    ) {
      return " ";
    } else {
      if (movieObject.genres.length > 1) {
        return `${movieObject.genres[0].name}, ${movieObject.genres[1].name}`;
      }
      return `${movieObject.genres[0].name}`;
    }
  };

  const getSimilarMovies = async () => {
    const {
      data: { results },
    } = await axios.get(`${apiURL}movie/${movieId}/recommendations`, {
      params: {
        api_key: apiKey,
        append_to_response: "videos",
      },
    });
    setSimilarMovies(results);
  };

  const getVideoKey = async (id) => {
    const apiKey = "e596aa0f4b9bb6cd5497d3c34451645f";

    //https://api.themoviedb.org/3/movie/157336/videos?api_key={api_key}
    const { data: results } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
    );

    console.log(results.results[0].key);
    return results.results[0].key;
  };

  const handleShowTrailer = async () => {
    const key = await getVideoKey(movieId);
    setShowTrailer(true);
    setTrailerKey(key);
  };

  const handelAddMovie = async () => {
    console.log("My movie id is: ", movieId);
    const res = await addMoviesToUserDocument(currentUser, [{ id: movieId }]);
    console.log("My res is:", res);
  };

  const renderYouTube = () => {
    if (
      movieObject.videos !== undefined &&
      movieObject.videos.results.length > 0
    ) {
      return (
        <YouTube
          videoId={movieObject.videos.results[0].key}
          className="youtube-player"
          opts={{
            height: "100%",
            width: "100%",
          }}
        />
      );
    }
  };

  const goToSimilarMovie = (id) => {
    navigate(`/movie/${id}`);
    window.scrollTo(0, 0);
  };

  const getMovieLogo = async () => {
    // const logoURL = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}&language=en-US&include_image_language=null,en,fr,pt,de`;
    const logoURL = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`;

    const { data } = await axios.get(logoURL);

    const logos = data.logos;

    if (data.logos == undefined) return;

    let logoPath = logos[0].file_path;

    logoPath = `${imgPath}${logoPath}`;

    setLogoPath(logoPath);
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
    getMovieDetails(movieId);
    getSimilarMovies();
    getMovieLogo();
  }, [movieId]);

  useEffect(() => {
    getCast();
    getSimilarMovies();
    getMovieLogo();
  }, [movieObject]);

  useEffect(() => {
    getMovieLogo();
  });

  return (
    <div className="movie-page-layout">
      <Header />
      <div
        className="movie-details"
        style={{
          backgroundImage: `url(${imgPath}${movieObject.backdrop_path})`,
        }}
      >
        <div className="movie-content-outer-container">
          <div className="movie-content">
            <h1>{movieObject.title}</h1>
            <p>{movieObject.overview}</p>

            <div className="genre-container">
              <h3>GENRES</h3>
              <span>{getGenres()}</span>
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
              <a
                className="logo-button"
                onClick={() => {
                  logoContainerRef.current.classList.toggle("visible");
                }}
              >
                <span>MOVIE LOGO</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6536 9.49103V15.3187H1.99835V3.66341H6.17758C6.21921 3.07232 6.36074 2.51454 6.57719 1.99838H1.99835C1.08258 1.99838 0.333313 2.74764 0.333313 3.66341V15.3187C0.333313 16.2344 1.08258 16.9837 1.99835 16.9837H13.6536C14.5694 16.9837 15.3186 16.2344 15.3186 15.3187V11.1561L13.6536 9.49103ZM12.4048 13.6536H3.24712L5.53655 10.7148L7.16828 12.6796L9.4577 9.73246L12.4048 13.6536ZM14.7359 6.06939C15.1022 5.48662 15.3186 4.81229 15.3186 4.07967C15.3186 2.0067 13.6453 0.333344 11.5723 0.333344C9.49933 0.333344 7.82597 2.0067 7.82597 4.07967C7.82597 6.15264 9.49933 7.826 11.564 7.826C12.2966 7.826 12.9792 7.60954 13.5537 7.24324L16.1511 9.84069L17.3333 8.65851L14.7359 6.06939ZM11.5723 6.16096C11.0203 6.16096 10.4909 5.94169 10.1006 5.55137C9.71028 5.16105 9.491 4.63166 9.491 4.07967C9.491 3.52768 9.71028 2.99829 10.1006 2.60797C10.4909 2.21766 11.0203 1.99838 11.5723 1.99838C12.1243 1.99838 12.6537 2.21766 13.044 2.60797C13.4343 2.99829 13.6536 3.52768 13.6536 4.07967C13.6536 4.63166 13.4343 5.16105 13.044 5.55137C12.6537 5.94169 12.1243 6.16096 11.5723 6.16096Z"
                    fill="white"
                  />
                </svg>

                <div
                  ref={logoContainerRef}
                  className="movie-logo-container invisible"
                >
                  {logoPath !== "" ? (
                    <img src={logoPath} alt={"Movie logo"} />
                  ) : (
                    <span
                      style={{
                        textAlign: "center",
                      }}
                    >
                      Logo doesn't exist <br /> :(
                    </span>
                  )}

                  <svg
                    className="close"
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </a>
            </div>

            <div className="meta-data-container">
              <img src={imdbicon} alt="" />
              <span className="rating">
                {movieObject.vote_average
                  ? movieObject.vote_average.toFixed(1)
                  : ""}
              </span>
              <span className="date">
                {movieObject.release_date
                  ? movieObject.release_date.split("-")[0]
                  : ""}
              </span>
            </div>

            <div className="extra-info">
              <h3>AUDIO</h3>
              <p className="lang-container">
                {movieObject.spoken_languages == undefined
                  ? ""
                  : movieObject.spoken_languages.map((obj, index, list) => {
                      return (
                        <span className="lang" key={index}>
                          {index == list.length - 1
                            ? `${obj.name}`
                            : `${obj.name},`}
                        </span>
                      );
                    })}
              </p>
              <h3>PRODUCTION</h3>
              <p>
                {movieObject.production_companies == undefined
                  ? ""
                  : movieObject.production_companies[0].name}
              </p>
            </div>
          </div>
        </div>

        <div className="movie-cast-and-trailer">
          <div className="trailer-container">
            <h2>TRAILER</h2>
            <div className="trailer-inner-container">
              {movieObject == {} ||
              movieObject.videos == undefined ||
              movieObject.videos == undefined
                ? ""
                : renderYouTube()}
            </div>
          </div>
          <div className="cast-container">
            <h2>CAST AND CREW INFO</h2>
            <div className="cast-inner-container">
              {cast.map((actor, index) => {
                if (index > 5) return;
                return <CastCard actor={actor} />;
              })}
            </div>
            {!showMore ? (
              <a>
                <span>SHOW MORE</span>
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="downArrowIcon"
                    d="M15 1.99999L8.5 7.78367L2 2.00001"
                    stroke="#E7E7E7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ) : (
              <a>
                <span>SHOW LESS</span>
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="downArrowIcon"
                    d="M15 1.99999L8.5 7.78367L2 2.00001"
                    stroke="#E7E7E7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className="similar-movies-container">
          <h3>MORE LIKE THIS</h3>
          <div className="similar-movies-inner-container">
            {similarMovies.map((movie, idx) => {
              if (idx > 4) return;
              return (
                <img
                  key={idx}
                  className="similar-movie"
                  src={`${imgPath}/${movie.poster_path}`}
                  onClick={() => {
                    goToSimilarMovie(movie.id);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

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

      <Footer />
    </div>
  );
};

export default MoviePage;
