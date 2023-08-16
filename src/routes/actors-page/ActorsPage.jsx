import React, { useContext } from "react";
import "./ActorsPage.styles.scss";

import { ActorsContext } from "../../contexts/actors.context";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";

const ActorsPage = () => {
  const { actors } = useContext(ActorsContext);

  const navigate = useNavigate();

  const imgPath = "https://image.tmdb.org/t/p/original";

  const getActorGender = (gender) => {
    return gender === 2 ? "his" : "her";
  };

  const goToActorsPage = (id) => {
    navigate(`/actor/${id}`);
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
                <div className="actor-img-container">
                  <img
                    loading="lazy"
                    className="actor-img"
                    src={`${imgPath}${actor.profile_path}`}
                    alt={actor.name}
                  />
                </div>

                <p className="actor-name">{actor.name}</p>
                <button
                  onClick={() => {
                    goToActorsPage(actor.id);
                  }}
                  className={`actor-btn ${getActorGender(actor.gender)}`}
                >
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
