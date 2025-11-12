import React from "react";
import Hero from "../components/Hero";
import OutstandingRoom from "../components/OutstandingRoom";
import FeatureList from "../components/FeatureList";
import GuestReview from "../components/GuestReview";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <OutstandingRoom />
      <FeatureList />
      <GuestReview />
      <Contact />
    </>
  );
};

export default Home;
