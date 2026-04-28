import React from "react";

const ThisNotJustCourse = () => {
  return (
    <section
      className="
      relative w-[100%] mx-auto 
      mt-10 sm:mt-12 md:mt-16
      h-[420px] sm:h-[520px] md:h-[75vh] lg:h-[85vh]
      rounded-1xl overflow-hidden
      "
    >
      {/*  BACKGROUND IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Learning Shift"
      />

      {/*  DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/*  CONTENT */}
      <div className="relative z-10 h-full flex items-center px-5 sm:px-8 md:px-16 text-white">
        
        <div className="max-w-2xl">
          
          {/*  HEADING */}
          <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            This is not just a course.
            <br /> It’s a shift in how you learn.
          </h1>

          {/*  TRANSFORMATION POINTS */}
          <div className="mt-6 space-y-2 text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed">
            <p> watching → building</p>
            <p> memorising → understanding</p>
            <p> completing → creating</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ThisNotJustCourse;