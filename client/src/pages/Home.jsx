import React from "react";
import Hero from "../components/home_Components/Hero";
import AdverstandingSection from "../components/home_Components/adverstandingSection";
import Why from "../components/home_Components/Why";
import Affiliation from "../components/home_Components/Affiliation&Accreditation";
import MeetOurMaestros from "../components/home_Components/MeetOurMaestros";
import ExpertsSection from "../components/home_Components/expert";
import Celebrate from "../components/home_Components/Celebrate";
import FeaturedQuestion from "../components/home_Components/FeaturedQuestion";
import Footer from "../components/Footer";
import FeaturedInMedia from "../components/home_Components/featuredInMediaSection";
import CodeCraft from "../components/home_Components/CodeCreaftSection";
import Stories from "../components/home_Components/Storie";
import PlacementSection from "../components/home_Components/placementSection";
import ProgramSection from "../components/home_Components/programSection";
import HowItWorks from "../components/home_Components/howItsWorks";
const Home = () => {
  return (
    <div className=""  >
      <Hero />
      <PlacementSection />
      <ProgramSection />
            <MeetOurMaestros />
      <HowItWorks />
      <AdverstandingSection />
      <Why />
      {/* <Affiliation />
      <CodeCraft />


      <ExpertsSection />
      <Celebrate />
      <FeaturedInMedia />
      <Stories />
      <FeaturedQuestion /> */}

      <Footer />

      {/* <div>
        <h1 className="z-50 fixed right-5 bottom-8 h-12 w-60 px-4 py-2 font-bold text-center text-[#125785] bg-white rounded-b-4xl rounded-tl-4xl shadow-[0_12px_30px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
          Request a callback
        </h1>
      </div> */}
    </div>
  );
};

export default Home;
