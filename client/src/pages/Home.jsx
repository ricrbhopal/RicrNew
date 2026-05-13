import React from "react";

import Hero from "../components/home_Components/Hero";
import PlacementSection from "../components/home_Components/placementSection";

// ✅ FIX NAME
import ProgramsSection from "../components/home_Components/programSection";

import MeetOurMaestros from "../components/home_Components/MeetOurMaestros";

import HowItWorks from "../components/home_Components/howItsWorks";

import AdverstandingSection from "../components/home_Components/adverstandingSection";

import Why from "../components/home_Components/Why";

const Home = () => {
  return (
    <main >
      

        <Hero />
      

           <PlacementSection />
           <ProgramsSection />
          <MeetOurMaestros />
          {/* <HowItWorks />  */}
       
            <Why />
    






    </main>
  );
};

export default Home;