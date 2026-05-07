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
    <main className="relative w-full overflow-x-hidden">
      
      {/* HERO */}
      <section className="relative z-10">
        <Hero />
      </section>

      {/* PLACEMENT */}
      <section className="relative z-10 bg-white">
        <PlacementSection />
      </section>

      {/* VIDEO SECTION */}
      <section className="relative z-20 bg-black">
        <ProgramsSection />
      </section>

      {/* NEXT SECTION */}
      <section className="relative z-30 bg-white">
        <MeetOurMaestros />
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10">
        <HowItWorks />
      </section>

      {/* ADV */}
      <section className="relative z-10 bg-white">
        <AdverstandingSection />
      </section>

      {/* WHY */}
      <section className="relative z-10 bg-white">
        <Why />
      </section>

    </main>
  );
};

export default Home;