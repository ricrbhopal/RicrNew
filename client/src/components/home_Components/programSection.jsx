import React, { useEffect, useState } from "react";
import { adminAPI } from "../../config/api";

const ProgramsSection = () => {
  const [program, setProgram] = useState(null);

  // 🔥 FETCH ACTIVE PROGRAM
  useEffect(() => {
    fetchProgram();
  }, []);

  const fetchProgram = async () => {
    try {
      const res = await adminAPI.getProgram();
      setProgram(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="w-[100%] mx-auto mt-16 space-y-12 overflow-hidden">

      {/* 🔥 VIDEO BANNER */}
      <div className="relative w-full h-[300px] sm:h-[350px] md:h-[500px] lg:h-[650px] overflow-hidden">

        {/* 🔥 DYNAMIC VIDEO */}
        {program?.video && (
          <video
            src={program.video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* CONTENT */}
        <div className="relative z-10 h-full flex flex-col justify-center px-5 sm:px-8 md:px-16 text-white max-w-3xl">





          {/*  DYNAMIC SUBTEXT */}
          <p className="text-xs sm:text-sm md:text-base text-gray-200">
            {program?.subtext || "Loading program content..."}
          </p>

        </div>
      </div>

    </section>
  );
};

export default ProgramsSection;