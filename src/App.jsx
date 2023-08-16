import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/Home";
import Authentication from "./routes/authentication/Authentication";
import MoviePage from "./routes/movie-page/MoviePage";
import ActorsPage from "./routes/actors-page/ActorsPage";
import ActorsDetailsPage from "./routes/actor-details-page/ActorsDetailsPage";
import SearchPage from "./routes/searchPage/SearchPage";
import ReviewsPage from "./routes/reviews/ReviewsPage";
import MovieReview from "./routes/movieReview/MovieReview";
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import UserList from "./routes/UserList/UserList";
import Underconstruction from "./routes/Underconstruction/Underconstruction";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/auth" element={<Authentication />}></Route>
      <Route path="/movie/:movieId" element={<MoviePage />}></Route>
      <Route path="/actors" element={<ActorsPage />}></Route>
      <Route path="/actor/:id" element={<ActorsDetailsPage />}></Route>
      <Route path="/search" element={<SearchPage />}></Route>
      <Route path="/reviews" element={<ReviewsPage />}></Route>
      <Route path="/review/:id" element={<MovieReview />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/lists" element={<UserList />}></Route>
      <Route path="/underconstruction" element={<Underconstruction />}></Route>
      <Route path="*" element={<h1>404</h1>}></Route>
    </Routes>
  );
}

export default App;
