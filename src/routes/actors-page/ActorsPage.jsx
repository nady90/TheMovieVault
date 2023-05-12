import React, { useContext } from "react";
import "./ActorsPage.styles.scss";

import { ActorsContext } from "../../contexts/actors.context";
import Header from "../../components/Header/Header";

const ActorsPage = () => {
  const { actors } = useContext(ActorsContext);

  const imgPath = "https://image.tmdb.org/t/p/original";

  console.log(actors);

  const getActorGender = (gender) => {
    return gender === 2 ? "his" : "her";
  };

  return (
    <div className="actors-page">
      <Header type={"fixed"} />
      <div className="actors-container">
        <h1>Trending Actors:</h1>
        <div className="actors-list">
          {actors.map((actor) => {
            return (
              <div key={actor.id} className="actor-item">
                <img
                  className="actor-img"
                  src={`${imgPath}${actor.profile_path}`}
                  alt={actor.name}
                />
                <p className="actor-name">{actor.name}</p>
                <button className={`actor-btn ${getActorGender(actor.gender)}`}>
                  visit{" "}
                  <span
                    className={`actor-gender ${getActorGender(actor.gender)}`}
                  >
                    {getActorGender(actor.gender)}
                  </span>{" "}
                  page
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActorsPage;
