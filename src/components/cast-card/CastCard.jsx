import React from "react";
import "./CastCard.style.scss";
import { useNavigate } from "react-router-dom";

const castCard = ({ actor }) => {
  const { name, character, gender, known_for_department, profile_path, id } =
    actor;
  const navigate = useNavigate();

  const imgPath = "https://image.tmdb.org/t/p/original";

  return (
    <div className="cast-card" onClick={() => navigate(`/actor/${id}`)}>
      {profile_path && <img src={`${imgPath}${profile_path}`} />}
      {name && <span className="actor-name">{name}</span>}
      {character && <span className="character">{character}</span>}
    </div>
  );
};

export default castCard;
