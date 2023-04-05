import React from "react";
import "./Header.styles.scss";
import { NavLink } from "react-router-dom";

import profileIcon from "../../assets/profile-pic.png";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-box">TheMovieVault</div>
      <div className="links-container">
        <NavLink to="" style={{ color: "#fff" }}>
          HOME
        </NavLink>
        <NavLink to="">MOVIES</NavLink>
        <NavLink to="">TV SHOWS</NavLink>
        <NavLink to="">ACTORS</NavLink>
      </div>
      <div className="search-container">
        <input
          className="search"
          type="search"
          name="search"
          id="search"
          placeholder="SEARCH"
        />
      </div>
      <div className="profile-container">
        <svg
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
        </svg>
        <svg
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
        <div className="profile-pic-container">
          <img className="profile-pic" src={profileIcon} alt="" />
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
      </div>
    </div>
  );
};

export default Header;
