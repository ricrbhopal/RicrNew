import React from "react";
import { MdOutlineArrowForward } from "react-icons/md";

// 🔥 VIDEO IMPORT (tum apna video yaha replace kar dena)
import programVideo from "../../assets/DataType.mp4";

const programs = [
  {
    title: "Full Stack Development",
    desc: "Build scalable web apps using MERN stack and modern tools.",
  },
  {
    title: "Data Science",
    desc: "Work with AI, ML models, and real-world datasets.",
  },
  {
    title: "Data Analytics",
    desc: "Analyze data, create dashboards, and drive insights.",
  },
];

const ProgramsSection = () => {
  return (
    <section className="w-[95%] md:w-[90%] mx-auto mt-16 space-y-12">

      {/* 🔥 VIDEO BANNER */}
      <div className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[520px] rounded-2xl overflow-hidden">

        <video
          src={programVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* CONTENT */}
        <div className="relative z-10 h-full flex flex-col justify-center px-5 sm:px-8 md:px-16 text-white max-w-3xl">

          <p className="text-xs sm:text-sm uppercase tracking-wide text-gray-300 mb-2">
            PROGRAMS
          </p>

          <h2 className="text-xl sm:text-3xl md:text-5xl font-semibold leading-tight mb-4">
            Choose your path into tech
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-gray-200">
            Whether you're starting from scratch or upskilling, we have a structured path for you.
          </p>
        </div>
      </div>


    </section>
  );
};

export default ProgramsSection;