import React, { useContext } from "react";
import "./ActorsPage.styles.scss";

import { ActorsContext } from "../../contexts/actors.context";

const ActorsPage = () => {
  const { actors } = useContext(ActorsContext);

  console.log(actors);

  return <div>ActorsPage</div>;
};

export default ActorsPage;
