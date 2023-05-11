import React from "react";

import "./Authentication.styles.scss";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Authentication = () => {
  return (
    <div className="authentication-page">
      <div className="authentication-container">
        <SignIn />
        <SignUp />
      </div>
      <Footer />
    </div>
  );
};
export default Authentication;
