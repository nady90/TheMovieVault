import React from "react";
import "./ActorsDetailsPage.styles.scss";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ActorsDetailsPage = () => {
  const { id } = useParams();

  const apiKey = "e596aa0f4b9bb6cd5497d3c34451645f";
  const actorURL = `https://api.themoviedb.org/3/person`;

  const getActorDetails = async (id) => {
    console.log(`${actorURL}/${id}?api_key=${apiKey}`);
    const res = await fetch(
      `${actorURL}/${id}?api_key=${apiKey}&append_to_response=credits,images`
    );

    const data = await res.json();

    console.log(data);
  };

  useEffect(() => {
    getActorDetails(id);
  }, [id]);

  console.log(id);
  return (
    <div className="actors-details-page">
      <p></p>

      {id}
    </div>
  );
};

export default ActorsDetailsPage;
