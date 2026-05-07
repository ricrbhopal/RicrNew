// import React, {
//   useEffect,
//   useState,
// } from "react";

// import { adminAPI }
// from "../../config/api";

// // 🔥 COMMON VIDEO SKELETON
// import ScrollVideoSkeleton
// from "../commonComponents/ScrollTrigger";

// const HowItWorks = () => {

//   const [steps, setSteps] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   // ================= FETCH =================
//   useEffect(() => {

//     const fetchSteps =
//       async () => {

//       try {

//         const res =
//           await adminAPI.getHowItWork();

//         const data =
//           Array.isArray(
//             res.data
//           )
//             ? res.data
//             : res.data
//             ? [res.data]
//             : [];

//         setSteps(data);

//       } catch (err) {

//         console.error(err);

//         setSteps([]);

//       } finally {

//         setLoading(false);
//       }
//     };

//     fetchSteps();

//   }, []);

//   // ================= LOADING =================
//   if (loading)
//     return (
//       <div
//         className="
//           text-center
//           py-10
//           text-lg
//           font-semibold
//         "
//       >
//         Loading...
//       </div>
//     );

//   // ================= EMPTY =================
//   if (!steps.length)
//     return (
//       <div
//         className="
//           text-center
//           py-10
//           text-lg
//           font-semibold
//         "
//       >
//         No Data
//       </div>
//     );

//   return (

//     <section
//       className="
//         w-full
   
    
//       "
//     >



//       {/* 🔥 SECTIONS */}
//       <div
//         className="
//           w-full
//           space-y-0
  
//         "
//       >

//         {steps.map(
//           (step, idx) =>

//             // ================= VIDEO =================
//             step.mediaType ===
//               "video" &&
//             step.mediaUrl ? (

//               <div
//                 key={
//                   step._id || idx
//                 }
//                 className="
//                   relative
//                   bg-black
//                 "
//               >

//                 <ScrollVideoSkeleton

//                   videoSrc={
//                     step.mediaUrl
//                   }

//                   end={4000}

//             className="md:object-cover sm:object-contain "

//                   overlay={true}

                
//                 >

//                   {/* 🔥 TOP RIGHT TITLE */}
//                   <div
//                     className="
//                       absolute

//                       top-4
//                       right-4

//                       sm:top-6
//                       sm:right-6

//                       md:top-10
//                       md:right-10

//                       z-50
//                     "
//                   >

//                     <div
//                       className="
//                         bg-black/30
//                         backdrop-blur-md

//                         px-4
//                         py-3

//                         sm:px-5
//                         sm:py-4

//                         md:px-8
//                         md:py-5

//                         rounded-2xl
//                         shadow-2xl
//                       "
//                     >

//                       <h1
//                         className="
//                           text-white

//                           text-lg
//                           sm:text-2xl
//                           md:text-4xl
//                           lg:text-5xl

//                           font-bold

//                           text-right

//                           leading-tight
//                         "
//                       >

//                         {step.title}

//                       </h1>

//                     </div>

//                   </div>

//                 </ScrollVideoSkeleton>

//               </div>

//             ) :

//             // ================= IMAGE =================
//             step.mediaType ===
//               "image" &&
//             step.mediaUrl ? (

//               <section
//                 key={
//                   step._id || idx
//                 }
//                 className="
//                   relative
//                   w-full

//                   h-[70vh]
//                   sm:h-[80vh]
//                   md:h-screen

//                   overflow-hidden
//                   bg-black
//                 "
//               >

//                 {/* 🔥 IMAGE */}
//                 <img
//                   src={
//                     step.mediaUrl
//                   }
//                   alt={
//                     step.title ||
//                     "Banner"
//                   }
//                   className="
//                     absolute
//                     inset-0

//                     w-full
//                     h-full

//                     object-cover
//                   "
//                 />

//                 {/* 🔥 OVERLAY */}
//                 <div
//                   className="
//                     absolute
//                     inset-0

//                     bg-black/30
//                   "
//                 />

//                 {/* 🔥 CONTENT */}
//                 <div
//                   className="
//                     relative
//                     z-20

//                     h-full

//                     flex
//                     items-center
//                     justify-center

//                     text-center

//                     px-4
//                     sm:px-6
//                     md:px-10
//                   "
//                 >

//                   <div
//                     className="
//                       max-w-5xl
//                     "
//                   >

//                     <h1
//                       className="
//                         text-white

//                         text-3xl
//                         sm:text-5xl
//                         md:text-6xl
//                         lg:text-7xl

//                         font-bold

//                         leading-tight
//                       "
//                     >

//                       {step.title}

//                     </h1>

//                     {step.description && (

//                       <p
//                         className="
//                           text-white/90

//                           text-base
//                           sm:text-lg
//                           md:text-2xl

//                           mt-5
//                           md:mt-8

//                           leading-relaxed
//                         "
//                       >

//                         {
//                           step.description
//                         }

//                       </p>

//                     )}

//                   </div>

//                 </div>

//               </section>

//             ) : null
//         )}

//       </div>

//     </section>
//   );
// };

// export default HowItWorks;

import React, { useEffect, useState } from "react";
import { adminAPI } from "../../config/api";
import ScrollVideoSkeleton from "../commonComponents/ScrollTrigger";

const HowItWorks = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await adminAPI.getHowItWork();
        const data = Array.isArray(res.data) 
          ? res.data 
          : res.data 
            ? [res.data] 
            : [];
        setSteps(data);
      } catch (err) {
        console.error("Error fetching steps:", err);
        setSteps([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, []);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ================= EMPTY =================
  if (!steps.length) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">No content available</p>
      </div>
    );
  }

  return (
    <section className="w-full mt-25">
      <div className="w-full space-y-0">
        {steps.map((step, idx) => {
          // ================= VIDEO SECTION =================
          if (step.mediaType === "video" && step.mediaUrl) {
            return (
              <div key={step._id || idx} className="relative bg-black w-full">
                <ScrollVideoSkeleton
                  videoSrc={step.mediaUrl}
                  end={4000}
                  overlay={true}
                  navbarClass=".main-navbar"
                  height="100vh"
                  object="cover"
                >
                  {/* 🔥 TOP RIGHT TITLE */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-10 md:right-10 z-50">
                    <div className="bg-black/30 backdrop-blur-md px-4 py-3 sm:px-5 sm:py-4 md:px-8 md:py-5 rounded-2xl shadow-2xl">
                      <h1 className="text-white text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-right leading-tight">
                        {step.title}
                      </h1>
                      {step.description && (
                        <p className="text-white/80 text-sm sm:text-base md:text-lg mt-2 text-right">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollVideoSkeleton>
              </div>
            );
          }

          // ================= IMAGE SECTION =================
          if (step.mediaType === "image" && step.mediaUrl) {
            return (
              <section
                key={step._id || idx}
                className="relative w-full h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden bg-black"
              >
                <img
                  src={step.mediaUrl}
                  alt={step.title || "Banner"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-20 h-full flex items-center justify-center text-center px-4 sm:px-6 md:px-10">
                  <div className="max-w-5xl">
                    <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                      {step.title}
                    </h1>
                    {step.description && (
                      <p className="text-white/90 text-base sm:text-lg md:text-2xl mt-5 md:mt-8 leading-relaxed">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
};

export default HowItWorks;