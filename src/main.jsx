import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { BrowserRouter } from "react-router-dom";
import { MoviesProvider } from "./contexts/movies.context";
import { UserProvider } from "./contexts/user.context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SkeletonTheme baseColor="#313131" highlightColor="#525252">
          <MoviesProvider>
            <App />
          </MoviesProvider>
        </SkeletonTheme>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
