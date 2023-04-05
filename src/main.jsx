import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <App />
      </SkeletonTheme>
    </BrowserRouter>
  </React.StrictMode>
);
