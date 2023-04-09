import React from "react";
import { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import axios from "axios";
import "./Home.styles.scss";
import MainContentContainer from "../../components/main-content-container/Main-content-container";
import AsideContainer from "../../components/aside/Aside";

const Home = () => {
  return (
    <div className="home">
      <Header />

      <div className="home-content-container">
        <AsideContainer />
        <MainContentContainer />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
