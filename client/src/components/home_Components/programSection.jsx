// import React, { useEffect, useRef, useState } from "react";
// import { adminAPI } from "../../config/api";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const ProgramsSection = () => {
//   const [program, setProgram] = useState(null);

//   const sectionRef = useRef(null);
//   const videoRef = useRef(null);

//   // FETCH PROGRAM
//   useEffect(() => {
//     fetchProgram();
//   }, []);

//   const fetchProgram = async () => {
//     try {
//       const res = await adminAPI.getProgram();
//       setProgram(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🔥 VIDEO SCROLL CONTROL
//   useEffect(() => {
//     if (!program?.video) return;

//     const video = videoRef.current;
//     const section = sectionRef.current;

//     if (!video || !section) return;

//     video.pause();

//     const setupScroll = () => {
//       ScrollTrigger.create({
//         trigger: section,

//         // 🔥 SECTION STICK
//         pin: true,

//         start: "top top",

//         // 🔥 HOW LONG SECTION STAYS
//         end: "+=4000",

//         scrub: 1,

//         onUpdate: (self) => {
//           if (video.duration) {

//             // 🔥 VIDEO CONTROL
//             video.currentTime =
//               video.duration * self.progress;
//           }
//         },
//       });
//     };

//     // WAIT VIDEO LOAD
//     video.addEventListener(
//       "loadedmetadata",
//       setupScroll
//     );

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());

//       video.removeEventListener(
//         "loadedmetadata",
//         setupScroll
//       );
//     };
//   }, [program]);

//   return (
//     <section    className="w-full mt-16">

//       {/* HEADER */}
//       <div>
//         <p className="text-3xl md:text-4xl text-[#125785] max-w-[90%] mx-auto mt-6 leading-relaxed font-semibold tracking-wide">
//           {program?.subtext || "Loading..."}
//         </p>
//       </div>

//       {/* VIDEO SECTION */}
//       <div
//         ref={sectionRef}
//         className="
//           relative
//           w-full
//           h-screen
//           overflow-hidden
//           bg-black
//         "
//       >
//         {program?.video && (
//           <video
//             ref={videoRef}
//             muted
//             playsInline
//             preload="auto"
//             className="
//               absolute
//               inset-0
//               w-full
//               h-full
//               object-cover
//             "
//           >
//             <source
//               src={program.video}
//               type="video/mp4"
//             />
//           </video>
//         )}

//         {/* OVERLAY */}

//         {/* CONTENT */}
//         <div className="relative z-10 h-full flex items-center justify-center text-white">
//           <div className="text-center">

//             <h1 className="text-5xl md:text-7xl font-bold">
//               {program?.title}
//             </h1>

//             <p className="mt-6 text-xl max-w-2xl mx-auto">
//               {program?.description}
//             </p>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProgramsSection;

import React, { useEffect, useState } from "react";

import { adminAPI } from "../../config/api";

import ScrollVideoSkeleton from "../commonComponents/ScrollTrigger";

const ProgramsSection = () => {
  const [program, setProgram] = useState(null);

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
    <section className="w-full mt-16 bg-white">
      {/* HEADER */}
      <div>
        <p className="text-3xl md:text-4xl text-[#125785] max-w-[90%] mx-auto mt-6 leading-relaxed font-semibold tracking-wide">
          {program?.subtext || "Loading..."}
        </p>
      </div>

      {/* REUSABLE VIDEO */}
      {program?.video && (
        <ScrollVideoSkeleton
          videoSrc={program.video}
          title={program.title}
          description={program.description}
          end={4000}
          object="contain"
          overlay={false}
          className=""
        />
      )}
    </section>
  );
};

export default ProgramsSection;
