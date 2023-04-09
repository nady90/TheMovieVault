import React from "react";
import "./Movie-card-skeleton.styles.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <div className="movie-card-container-skeleton">
      <div className="img-container-skeleton">
        <Skeleton height={"100%"} duration={0.8} />
      </div>
      <div className="title-container-skeleton">
        <h3>
          <Skeleton />
        </h3>
      </div>
    </div>
  );
};

export default CardSkeleton;
