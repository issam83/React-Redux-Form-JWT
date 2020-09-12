import React, { useState } from "react";
import Directory from "../components/home-component/directory";
import CarouselDirectory from "../components/home-component/carousel";
import "./home.scss";

const Home = () => (
  <div className="homepage">
    <h1>Shoes Your Clothes</h1>
    <CarouselDirectory />
    <Directory />
  </div>
);

export default Home;
