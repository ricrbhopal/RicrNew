import React, { useEffect, useRef } from "react";

const Section2 = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;

      const scrollY = window.scrollY;

      //  speed control (adjust as needed)
      let speed = 1 + scrollY / 1000;

      //  limit speed
      if (speed > 3) speed = 3;

      videoRef.current.playbackRate = speed;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="
      relative w-[100%] mx-auto 
      mt-12 sm:mt-16 md:mt-20
      h-[350px] sm:h-[450px] md:h-[70vh] lg:h-[80vh]
      rounded-1xl overflow-hidden
      "
    >
      {/*  VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/*  CONTENT */}
      <div className="relative z-10 h-full flex items-center px-5 sm:px-8 md:px-16 text-white">
        
        <div className="max-w-2xl">

          <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            This isn’t a room full of lecturers.
          </h2>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed">
            RICR mentors operate within the larger ecosystem of Raj Digital,
            where practical application and real-world thinking are core to how things are built. <br /><br />

            This ensures that what you learn here is aligned with how actual tech teams work. <br /><br />

            Because the right mentors don’t just teach you what to do. <br />
            They show you how to think, build, and improve. <br /><br />

            That’s what makes the difference.
          </p>

        </div>
      </div>
    </section>
  );
};

export default Section2;