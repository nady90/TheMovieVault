import { createContext, useContext, useEffect, useState } from "react";

export const ActorsContext = createContext({
  actors: [],
});

export const ActorsProvider = ({ children }) => {
  const [actors, setActors] = useState([]);

  const imgPath = "https://image.tmdb.org/t/p/original";
  const apiKey = "e596aa0f4b9bb6cd5497d3c34451645f";
  const apiURL = "https://api.themoviedb.org/3/";

  const getPopularActors = async () => {
    const res = await fetch(
      `${apiURL}person/popular?api_key=${apiKey}&language=en-US&page=1`
    );
    const data = await res.json();
    setActors(data.results);
  };

  useEffect(() => {
    getPopularActors();
  }, []);

  const value = { actors };
  return (
    <ActorsContext.Provider value={value}>{children}</ActorsContext.Provider>
  );
};
