import React, { useState, useEffect, useRef } from "react";
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

  const carousel = useRef(null);
  const leftBtn = useRef(null);
  const rightBtn = useRef(null);

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

  const handleScroll = (e) => {
    const maxScrollLeft =
      carousel.current.scrollWidth - carousel.current.offsetWidth;

    const safetyMargin = 40;

    if (carousel.current.scrollLeft + safetyMargin >= maxScrollLeft) {
      rightBtn.current.style.display = "none";
    } else {
      rightBtn.current.style.display = "block";
    }

    if (carousel.current.scrollLeft <= safetyMargin) {
      leftBtn.current.style.display = "none";
    } else {
      leftBtn.current.style.display = "block";
    }
  };

  const handleLeftBtnScroll = () => {
    const distance = 160;
    const step = 20;
    const speed = 55;
    let scrollAmount = 0;

    const sliderTimer = setInterval(() => {
      carousel.current.scrollLeft = carousel.current.scrollLeft - step;
      scrollAmount = scrollAmount + step;
      if (scrollAmount >= distance) {
        clearInterval(sliderTimer);
      }
    }, speed);
  };

  const handleRightBtnScroll = () => {
    const distance = 160;
    const step = 20;
    const speed = 55;
    let scrollAmount = 0;

    const sliderTimer = setInterval(() => {
      carousel.current.scrollLeft = carousel.current.scrollLeft + step;
      scrollAmount = scrollAmount + step;
      if (scrollAmount >= distance) {
        clearInterval(sliderTimer);
      }
    }, speed);
  };

  useEffect(() => {
    carousel.current.addEventListener("scroll", handleScroll);
    leftBtn.current.addEventListener("click", handleLeftBtnScroll);
    rightBtn.current.addEventListener("click", handleRightBtnScroll);
  }, []);

  useEffect(() => {
    carousel.current.addEventListener("mouseover", () => {
      const maxScrollLeft =
        carousel.current.scrollWidth - carousel.current.offsetWidth;

      const safetyMargin = 40;

      if (carousel.current.scrollLeft + safetyMargin >= maxScrollLeft) {
        // console.log("right");
        rightBtn.current.style.display = "none";
      } else {
        rightBtn.current.style.display = "block";
        rightBtn.current.classList.add("popup-btn");
      }

      if (carousel.current.scrollLeft <= safetyMargin) {
        leftBtn.current.style.display = "none";
      } else {
        leftBtn.current.style.display = "block";
      }
    });
  }, []);

  return (
    <div className={typesObject[type]}>
      {categoryTitle()}
      <button ref={leftBtn} className="scroll-left-btn">
        <svg
          width="25"
          height="43"
          viewBox="0 0 25 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.2314 42.4628L0 21.2314L21.2314 0L25 3.76858L7.53716 21.2314L25 38.6943L21.2314 42.4628Z"
            fill="black"
          />
        </svg>
      </button>

      <button ref={rightBtn} className="scroll-right-btn popup-btn">
        <svg
          width="25"
          height="43"
          viewBox="0 0 25 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.76858 42.4628L25 21.2314L3.76858 0L9.05282e-07 3.76858L17.4628 21.2314L9.05282e-07 38.6943L3.76858 42.4628Z"
            fill="black"
          />
        </svg>
      </button>

      <div ref={carousel} className="scroller-container">
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
