import React, { useContext } from "react";
import "./Selected-movie-container-skeleton.styles.scss";
import Skeleton from "react-loading-skeleton";

const SelectedMovieContainerSkeleton = () => {
  return (
    <div className="Selected-movie-contnet-container-skeleton">
      <h2>
        <Skeleton height={"100%"} />
      </h2>
      <p>
        <Skeleton height={"100%"} />
      </p>
      <div className="genre-container-skeleton"></div>
      <div className="buttons-container-skeleotn">
        <div className="button-left-skeleton">
          <Skeleton height={"100%"} />
        </div>
        <div className="button-right-skeleton">
          <Skeleton height={"100%"} />
        </div>
      </div>
      <Skeleton height={"100%"} duration={0.8} />
    </div>
  );
};

export default SelectedMovieContainerSkeleton;
