import React, { useContext, useState } from "react";
import "./Header.styles.scss";
import { NavLink, useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { MoviesContext } from "../../contexts/movies.context";

const Header = ({ type }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const { search, setSearch } = useContext(MoviesContext);
  const [searchField, setSearchField] = useState("");

  const goToAuth = () => {
    navigate("/auth");
  };

  const goToHome = () => {
    navigate("/");
  };

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleSearchChange = (e) => {
    setSearchField(e.target.value);
  };

  const searchMovie = async (e) => {
    e.preventDefault();

    const apiKey = "e596aa0f4b9bb6cd5497d3c34451645f";
    const searchURL = "https://api.themoviedb.org/3/search/movie";

    const res = await fetch(
      `${searchURL}?api_key=${apiKey}&query=${searchField}`
    );
    const data = await res.json();

    setSearch(data.results);
    navigate("/search");
  };

  return (
    <div className={`header ${type}`}>
      <div className="logo-box" onClick={goToHome}>
        <svg
          width="80"
          height="75"
          viewBox="0 0 80 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.5"
            y="1.5"
            width="77"
            height="72"
            rx="21.5"
            stroke="#4949E7"
            strokeWidth="3"
          />
          <path
            d="M14.7124 40.6828C11.6604 36.8139 10.0003 32.0299 10 27.1021V15.0056C15.0862 12.3736 20.7295 11 26.4564 11C32.1833 11 37.8266 12.3736 42.9128 15.0056"
            stroke="#4949E7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M37.0501 59.013C35.7516 59.3065 34.402 59.288 33.112 58.9591C31.822 58.6301 30.6283 58.0001 29.6289 57.1206C26.1568 54.1274 23.5856 50.2274 22.203 45.8566C20.8203 41.4859 20.6806 36.8167 21.7996 32.3711L24.5083 21.5362C30.3914 20.0442 36.5528 20.0361 42.4398 21.5127C48.3268 22.9893 53.755 25.9044 58.2375 29.9963L55.5287 40.7941C54.4368 45.2437 52.1312 49.3029 48.8686 52.5196C45.6061 55.7363 41.5147 57.9842 37.0501 59.013Z"
            stroke="#4949E7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28.961 33.2988C29.4291 32.8089 30.0223 32.4566 30.6764 32.28C31.3305 32.1034 32.0205 32.1092 32.6715 32.2969C33.3088 32.4468 33.895 32.7626 34.3707 33.2123C34.8464 33.6619 35.1947 34.2294 35.3803 34.8572M43.6548 36.9722C44.108 36.4853 44.6836 36.1291 45.3216 35.941C45.9595 35.7528 46.6363 35.7396 47.2812 35.9027C47.926 36.0658 48.5151 36.3992 48.9869 36.8681C49.4587 37.3369 49.7957 37.924 49.9628 38.5678"
            stroke="#4949E7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M63 67C67.4183 67 71 63.4183 71 59C71 54.5817 67.4183 51 63 51C58.5817 51 55 54.5817 55 59C55 63.4183 58.5817 67 63 67Z"
            stroke="#4949E7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M61.1538 55.9231L66.0769 59L61.1538 62.0769V55.9231Z"
            fill="#4949E7"
            stroke="#4949E7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M58.7594 20.2619V22.7687C58.4838 22.6104 58.1437 22.5488 57.7831 22.6749C57.3902 22.8156 57.0882 23.1645 57.0178 23.575C56.9853 23.7597 56.9974 23.9495 57.0533 24.1285C57.1091 24.3075 57.207 24.4706 57.3387 24.6041C57.4705 24.7375 57.6323 24.8375 57.8106 24.8957C57.9888 24.9538 58.1785 24.9685 58.3636 24.9383C58.9382 24.8474 59.3458 24.3197 59.3458 23.7362V20.8483H59.9322C60.2547 20.8483 60.5186 20.5844 60.5186 20.2619C60.5186 19.9393 60.2547 19.6755 59.9322 19.6755H59.3458C59.0233 19.6755 58.7594 19.9393 58.7594 20.2619Z"
            fill="#4949E7"
          />
          <path
            d="M65.3561 10.228V11.2028C65.2413 11.1412 65.0996 11.1173 64.9493 11.1663C64.7856 11.221 64.6598 11.3567 64.6305 11.5163C64.6169 11.5881 64.622 11.6619 64.6453 11.7315C64.6685 11.8012 64.7093 11.8646 64.7642 11.9165C64.8191 11.9684 64.8865 12.0073 64.9608 12.0299C65.0351 12.0525 65.1141 12.0582 65.1912 12.0464C65.4306 12.0111 65.6004 11.8059 65.6004 11.579V10.456H65.8447C65.9791 10.456 66.0891 10.3534 66.0891 10.228C66.0891 10.1026 65.9791 10 65.8447 10H65.6004C65.4661 10 65.3561 10.1026 65.3561 10.228Z"
            fill="#4949E7"
          />
          <path
            d="M67.9949 12.2804V13.2551C67.88 13.1936 67.7383 13.1696 67.5881 13.2187C67.4244 13.2734 67.2986 13.4091 67.2693 13.5687C67.2557 13.6405 67.2608 13.7143 67.284 13.7839C67.3073 13.8535 67.3481 13.9169 67.403 13.9688C67.4579 14.0207 67.5253 14.0596 67.5995 14.0822C67.6738 14.1048 67.7528 14.1105 67.83 14.0988C68.0694 14.0635 68.2392 13.8582 68.2392 13.6314V12.5084H68.4835C68.6179 12.5084 68.7278 12.4058 68.7278 12.2804C68.7278 12.155 68.6179 12.0524 68.4835 12.0524H68.2392C68.1048 12.0524 67.9949 12.155 67.9949 12.2804Z"
            fill="#4949E7"
          />
          <path
            d="M62.5707 21.3369V22.1724C62.4789 22.1196 62.3655 22.0991 62.2453 22.1411C62.1144 22.188 62.0137 22.3043 61.9903 22.4411C61.9794 22.5027 61.9835 22.5659 62.0021 22.6256C62.0207 22.6853 62.0533 22.7396 62.0972 22.7841C62.1411 22.8286 62.1951 22.8619 62.2545 22.8813C62.3139 22.9007 62.3771 22.9056 62.4388 22.8955C62.6304 22.8652 62.7662 22.6893 62.7662 22.4949V21.5323H62.9616C63.0691 21.5323 63.1571 21.4444 63.1571 21.3369C63.1571 21.2294 63.0691 21.1414 62.9616 21.1414H62.7662C62.6587 21.1414 62.5707 21.2294 62.5707 21.3369Z"
            fill="#4949E7"
          />
          <path
            d="M64.3299 16.182V17.665C64.2181 17.6005 64.0882 17.5746 63.9602 17.5915C63.8322 17.6083 63.7133 17.6669 63.6221 17.7582C63.5308 17.8495 63.4722 17.9683 63.4553 18.0963C63.4385 18.2243 63.4643 18.3542 63.5289 18.466C63.5934 18.5778 63.6931 18.6652 63.8123 18.7146C63.9316 18.764 64.0638 18.7727 64.1885 18.7392C64.3132 18.7058 64.4234 18.6322 64.5019 18.5298C64.5805 18.4274 64.6231 18.3019 64.6231 18.1728V15.2192C64.6231 15.1815 64.6141 15.1444 64.5968 15.111C64.5795 15.0776 64.5544 15.0488 64.5237 15.0272C64.4929 15.0055 64.4574 14.9915 64.4201 14.9865C64.3828 14.9814 64.3448 14.9854 64.3094 14.9981L62.4329 15.6683C62.3874 15.6846 62.3481 15.7146 62.3203 15.7541C62.2925 15.7936 62.2775 15.8408 62.2775 15.8891V17.9579C62.1658 17.8934 62.0358 17.8675 61.9078 17.8844C61.7799 17.9012 61.661 17.9598 61.5697 18.051C61.4785 18.1423 61.4199 18.2611 61.403 18.3891C61.3861 18.5171 61.4119 18.647 61.4764 18.7588C61.541 18.8706 61.6405 18.958 61.7598 19.0074C61.879 19.0569 62.0112 19.0656 62.1359 19.0322C62.2606 18.9988 62.3708 18.9253 62.4494 18.8229C62.528 18.7205 62.5707 18.5951 62.5707 18.466V16.8103L64.3299 16.182Z"
            fill="#4949E7"
          />
        </svg>
      </div>
      <div className="links-container">
        <NavLink
          to="/"
          className={({ isActive, isPending }) => {
            return isActive ? "active-nav-link" : "";
          }}
        >
          HOME
        </NavLink>
        {/* <NavLink to="">TV SHOWS</NavLink> */}
        <NavLink
          to="/actors"
          className={({ isActive, isPending }) => {
            return isActive ? "active-nav-link" : "";
          }}
        >
          ACTORS
        </NavLink>
        <NavLink
          to="/reviews"
          className={({ isActive, isPending }) => {
            return isActive ? "active-nav-link" : "";
          }}
        >
          REVIEWES
        </NavLink>
      </div>
      <div className="search-container">
        <form onSubmit={searchMovie}>
          <input
            onChange={handleSearchChange}
            className="search"
            type="search"
            name="search"
            id="search"
            placeholder="SEARCH"
          />
        </form>
      </div>
      <div className="profile-container">
        {currentUser ? (
          <>
            {/* <svg
              className="gift-icon"
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="gift icon">
                <path
                  id="Vector"
                  d="M25.8333 15.5V28.4167H5.16666V15.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="Vector_2"
                  d="M28.4167 9.04166H2.58334V15.5H28.4167V9.04166Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="Vector_3"
                  d="M15.5 28.4167V9.04166"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="Vector_4"
                  d="M15.5 9.04168H9.68751C8.83108 9.04168 8.00973 8.70146 7.40414 8.09588C6.79856 7.49029 6.45834 6.66894 6.45834 5.81251C6.45834 4.95608 6.79856 4.13473 7.40414 3.52914C8.00973 2.92356 8.83108 2.58334 9.68751 2.58334C14.2083 2.58334 15.5 9.04168 15.5 9.04168Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="Vector_5"
                  d="M15.5 9.04168H21.3125C22.1689 9.04168 22.9903 8.70146 23.5959 8.09588C24.2015 7.49029 24.5417 6.66894 24.5417 5.81251C24.5417 4.95608 24.2015 4.13473 23.5959 3.52914C22.9903 2.92356 22.1689 2.58334 21.3125 2.58334C16.7917 2.58334 15.5 9.04168 15.5 9.04168Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg> */}
            <svg
              onClick={handleBellClick}
              className="bell-icon"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="bell icon">
                <path
                  id="Vector"
                  d="M22.5 10C22.5 8.01088 21.7098 6.10322 20.3033 4.6967C18.8968 3.29018 16.9891 2.5 15 2.5C13.0109 2.5 11.1032 3.29018 9.6967 4.6967C8.29018 6.10322 7.5 8.01088 7.5 10C7.5 18.75 3.75 21.25 3.75 21.25H26.25C26.25 21.25 22.5 18.75 22.5 10Z"
                  stroke="white"
                  strokeWidth="2.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="Vector_2"
                  d="M17.1625 26.25C16.9428 26.6288 16.6273 26.9433 16.2478 27.1619C15.8683 27.3805 15.438 27.4956 15 27.4956C14.562 27.4956 14.1318 27.3805 13.7522 27.1619C13.3727 26.9433 13.0573 26.6288 12.8375 26.25"
                  stroke="white"
                  strokeWidth="2.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <div
              className="profile-pic-container"
              onClick={() => {
                navigate("/profile");
              }}
            >
              {/* <img className="profile-pic" src={profileIcon} alt="" /> */}

              <svg
                className="profile-pic-svg"
                width="37"
                height="37"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 1C5.477 1 1 5.477 1 11C1 16.523 5.477 21 11 21C16.523 21 21 16.523 21 11C21 5.477 16.523 1 11 1Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.271 17.346C3.271 17.346 5.5 14.5 11 14.5C16.5 14.5 18.73 17.346 18.73 17.346M11 11C11.7956 11 12.5587 10.6839 13.1213 10.1213C13.6839 9.55871 14 8.79565 14 8C14 7.20435 13.6839 6.44129 13.1213 5.87868C12.5587 5.31607 11.7956 5 11 5C10.2043 5 9.44128 5.31607 8.87868 5.87868C8.31607 6.44129 8 7.20435 8 8C8 8.79565 8.31607 9.55871 8.87868 10.1213C9.44128 10.6839 10.2043 11 11 11Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <svg
                className="online-icon"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  id="online-icon"
                  cx="7"
                  cy="7"
                  r="6"
                  fill="#3BFF37"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="sign-out-button" onClick={signOutUser}>
              SIGN OUT
            </div>
          </>
        ) : (
          <>
            <div className="sign-in-button" onClick={goToAuth}>
              Sign In{" "}
            </div>
          </>
        )}
        {showNotifications && (
          <div className="notifications-container">
            <div className="notification-heading">
              {`Hi,`}
              <span className="notification-name">
                {" "}
                {currentUser ? currentUser.displayName : "Guest"}
              </span>
            </div>

            <div className="notifications-count">You have no notifications</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
