import React from "react";
import Hero from "../components/home_Components/Hero";
import PlacementSection from "../components/home_Components/placementSection";
import ProgramSection from "../components/home_Components/programSection";
import MeetOurMaestros from "../components/home_Components/MeetOurMaestros";
import HowItWorks from "../components/home_Components/howItsWorks";
import AdverstandingSection from "../components/home_Components/adverstandingSection";
import Why from "../components/home_Components/Why";

const Home = () => {
  return (
    <div>

      {/* DARK SECTION */}
      <div className="section dark-section">
        <Hero />
      </div>

      {/* LIGHT SECTION */}
      <div className="section light-section">
        <PlacementSection />
      </div>

      {/* DARK SECTION */}
      <div className="section dark-section">
        <ProgramSection />
      </div>

      {/* LIGHT SECTION */}
      <div className="section light-section">
        <MeetOurMaestros />
      </div>

      {/* LIGHT SECTION */}
      <div className="section light-section">
        <HowItWorks />
      </div>

      {/* LIGHT SECTION */}
      <div className="section light-section">
        <AdverstandingSection />
      </div>

      {/* LIGHT SECTION */}
      <div className="section light-section">
        <Why />
      </div>

    </div>
  );
};

export default Home;