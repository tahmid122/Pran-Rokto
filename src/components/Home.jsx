import React from "react";
import SearchBanner from "./SearchBanner";
import RequestRegistration from "./RequestRegistration";
import OurOverview from "./OurOverview";
import Reviews from "./Reviews";

const Home = () => {
  return (
    <>
      <SearchBanner />
      <RequestRegistration />
      <Reviews />
      <OurOverview />
    </>
  );
};

export default Home;
