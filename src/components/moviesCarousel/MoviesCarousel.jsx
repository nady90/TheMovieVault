import React, { useState, useEffect } from "react";
import "./MoviesCarousel.styles.scss";

import MovieCard from "../movie-card/Movie-card";

import alertSound from "../../assets/sounds/dobule-beep-alarm.mp3";

import useSound from "use-sound";

const typesObject = {
  mustWatch: "movies-carousel",
  animated: "movies-carousel animated-carousel",
  comedy: "movies-carousel animated-carousel",
  crime: "movies-carousel animated-carousel",
  drama: "movies-carousel animated-carousel",
  musical: "movies-carousel animated-carousel",
  horror: "movies-carousel animated-carousel",
  documentary: "movies-carousel animated-carousel",
};

const MoviesCarousel = ({
  movies,
  selectMovie,
  type,
  setMovie,
  favouriteMovies,
  seenMovies,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const [playDoubleBeep] = useSound(alertSound, { volume: 0.25 });

  const categoryTitle = () => {
    if (type === "animated") {
      return <h3>BEST ANIMATED MOVIES</h3>;
    } else if (type === "comedy") {
      return <h3>BEST COMEDIES</h3>;
    } else if (type === "crime") {
      return <h3>BEST CRIME MOVIES</h3>;
    } else if (type === "drama") {
      return <h3>BEST COMEDIES</h3>;
    } else if (type === "musical") {
      return <h3>BEST MUSICALS</h3>;
    } else if (type === "horror") {
      return <h3>BEST HORROR</h3>;
    } else if (type === "documentary") {
      return <h3>BEST DOCUMENTARIES</h3>;
    } else {
      return <h3>MOVIES YOU MUST WATCH</h3>;
    }
  };

  useEffect(() => {
    if (movies.length > 1) {
      setIsLoaded(true);
    }
  }, [movies]);

  return (
    <div className={typesObject[type]}>
      {categoryTitle()}
      <div className="scroller-container">
        <div className="must-watch-container">
          {movies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                setMovie={setMovie}
                movie={movie}
                type="mustWatch"
                selectMovie={selectMovie}
                isLoaded={isLoaded}
                favouriteMovies={favouriteMovies}
                playDoubleBeep={playDoubleBeep}
                seenMovies={seenMovies}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoviesCarousel;
