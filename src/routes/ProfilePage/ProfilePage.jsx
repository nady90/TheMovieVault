import React, { useContext } from "react";
import "./ProfilePage.styles.scss";
import Header from "../../components/header/Header";

import { UserContext } from "../../contexts/user.context";
import Footer from "../../components/footer/Footer";

const ProfilePage = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="profile-page">
      <Header type={"fixed"} />
      {!currentUser ? (
        <h1 className="login-text">Please Login</h1>
      ) : (
        <div className="user-content-container">
          <h1>Your Profile:</h1>
          <div className="img-container">
            <img src={currentUser.photoURL} alt="" />
          </div>

          <div className="name-container">
            <span className="display-name-text">Display Name: </span>
            <span className="display-name-value">
              {currentUser.displayName}
            </span>
          </div>

          <div className="email-container">
            <span className="email-text">Email: </span>
            <span className="email-value">{currentUser.email}</span>
          </div>

          <div className="date-container">
            <span className="date-text">Date Joined: </span>
            <span className="date-value">
              {currentUser.metadata.creationTime}
            </span>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProfilePage;
