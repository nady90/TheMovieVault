import React, { useState } from "react";
import "./ActorsDetailsPage.styles.scss";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const ActorsDetailsPage = () => {
  const { id } = useParams();
  const [actorDetails, setActorDetails] = useState({});
  const navigate = useNavigate();

  const apiKey = "e596aa0f4b9bb6cd5497d3c34451645f";
  const actorURL = `https://api.themoviedb.org/3/person`;
  const imgPath = "https://image.tmdb.org/t/p/w500";

  const getActorDetails = async (id) => {
    console.log(`${actorURL}/${id}?api_key=${apiKey}`);
    const res = await fetch(
      `${actorURL}/${id}?api_key=${apiKey}&append_to_response=credits,images`
    );

    const data = await res.json();

    setActorDetails(data);
    console.log(actorDetails);
  };

  useEffect(() => {
    getActorDetails(id);
  }, [id]);

  return (
    <div className="actors-details-page">
      <NavLink to={"/"}>
        <div className="go-home-container">&larr; Back Home</div>
      </NavLink>

      <h1>{actorDetails.name}</h1>

      <div className="actor-images-container">
        {actorDetails.images &&
          actorDetails.images.profiles.map((imgObject, idx) => {
            if (idx >= 3) {
              return;
            }
            return (
              <div className="actor-img-container">
                <img
                  className={`actor-img ${
                    idx === 0 || idx === 2 ? "small" : "big"
                  }`}
                  src={`${imgPath}${imgObject.file_path}`}
                  alt="actor image"
                />
              </div>
            );
          })}
      </div>

      <div className="actor-details-container">
        <p className="dob">Date of Birth: {actorDetails.birthday}</p>
        <p className="country">Place of Birth: {actorDetails.place_of_birth}</p>
        <p className="bio">Biography: {actorDetails.biography}</p>
      </div>
    </div>
  );
};

export default ActorsDetailsPage;
