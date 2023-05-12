import React, { useContext } from "react";
import "./ActorsPage.styles.scss";

import { ActorsContext } from "../../contexts/actors.context";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const ActorsPage = () => {
  const { actors } = useContext(ActorsContext);

  const navigate = useNavigate();

  const imgPath = "https://image.tmdb.org/t/p/original";

  console.log(actors);

  const getActorGender = (gender) => {
    return gender === 2 ? "his" : "her";
  };

  const goToActorsPage = (id) => {
    navigate(`/actor/${id}`);
    // console.log(id);
    // console.log(actors);
    // console.log(actors[0].id);
    // console.log(actors[0].name);
    // console.log(actors[0].profile_path);
    // console.log(actors[0].gender);
    // console.log(actors[0].known_for_department);
    // console.log(actors[0].popularity);
    // console.log(actors[0].place_of_birth);
    // console.log(actors[0].biography);
    // console.log(actors[0].birthday);
    // console.log(actors[0].deathday);
    // console.log(actors[0].imdb_id);
    // console.log(actors[0].homepage);
    // console.log(actors[0].adult);
    // console.log(actors[0].vote_average);
    // console.log(actors[0].vote_count);
    // console.log(actors[0].updated_at);
    // console.log(actors[0].created_at);
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
