import React, { useEffect, useState } from "react";
import { adminAPI } from "../../config/api";

const ProgramsSection = () => {
  const [program, setProgram] = useState(null);

  //  FETCH ACTIVE PROGRAM
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
<section className="w-full mx-auto mt-16 space-y-12 overflow-hidden">
  {/* SECTION HEADER */}
<div>
  {/* DYNAMIC SUBTEXT */}
  <p className="text-3xl md:text-4xl text-[#125785] max-w-[90%] mx-auto mt-6 leading-relaxed font-semibold animate-fade-in font-sans tracking-wide">
    {program?.subtext || "Loading program content..."}
  </p>
</div>
  {/* VIDEO BANNER */}
  <div className="relative w-full max-w-[90%] mx-auto h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden md:rounded-2xl sm:rounded-2xl shadow-2xl mb-10 group">
    
    {/* DYNAMIC VIDEO */}
    {program?.video && (
      <>
        <video
          src={program.video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* MODERN GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </>
    )}

    {/* FALLBACK */}
    {!program?.video && (
      <div className="absolute inset-0 bg-gradient-to-br from-[#125785] to-[#0f766e] flex items-center justify-center">
        <div className="text-center text-white animate-pulse">
          <svg className="w-20 h-20 mx-auto mb-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-xl font-semibold">Program video coming soon</p>
          <p className="text-sm mt-2 opacity-80">Stay tuned for an exciting preview</p>
        </div>
      </div>
    )}

    {/* CONTENT OVERLAY - Enhanced Version */}
    <div className="relative z-10 h-full flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16">

      
      {program?.title && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 max-w-3xl leading-tight opacity-0 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          {program.title}
        </h2>
      )}
      
      {program?.description && (
        <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed opacity-0 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {program.description}
        </p>
      )}


    </div>


    {/* Scroll indicator */}
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden md:block animate-bounce">
      <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
        <div className="w-1.5 h-2.5 bg-white rounded-full mt-2 animate-scroll"></div>
      </div>
    </div>
  </div>

  {/* Animation Styles */}
  <style jsx>{`
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes scroll {
      0% {
        opacity: 1;
        transform: translateY(0);
      }
      100% {
        opacity: 0;
        transform: translateY(20px);
      }
    }
    
    @keyframes bounce {
      0%, 100% {
        transform: translateX(-50%) translateY(0);
      }
      50% {
        transform: translateX(-50%) translateY(-10px);
      }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
    
    .animate-slide-up {
      animation: slideUp 0.6s ease-out forwards;
    }
    
    .animate-bounce {
      animation: bounce 2s infinite;
    }
    
    .animate-scroll {
      animation: scroll 1.5s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
    
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `}</style>
</section>
  );
};

export default ProgramsSection;