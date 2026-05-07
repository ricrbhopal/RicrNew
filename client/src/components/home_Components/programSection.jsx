

// import React, { useEffect, useState } from "react";

// import { adminAPI } from "../../config/api";

// import ScrollVideoSkeleton from "../commonComponents/ScrollTrigger";

// const ProgramsSection = () => {
//   const [program, setProgram] = useState(null);

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

//   return (
//     <section className="w-full mt-16 bg-white">
//       {/* HEADER */}
//       <div>
//         <p className="text-3xl md:text-4xl text-[#125785] max-w-[90%] mx-auto mt-6 leading-relaxed font-semibold tracking-wide">
//           {program?.subtext || "Loading..."}
//         </p>
//       </div>

//       {/* REUSABLE VIDEO */}
//       {program?.video && (
//         <ScrollVideoSkeleton
//           videoSrc={program.video}
//           title={program.title}
//           description={program.description}
//           end={4000}
//           object="contain"
//           overlay={false}
//           className=""
//         />
//       )}
//     </section>
//   );
// };

// export default ProgramsSection;
import React, {
  useEffect,
  useState,
} from "react";

import { adminAPI } from "../../config/api";

import ScrollVideoSkeleton from "../commonComponents/ScrollTrigger";

const ProgramsSection = () => {
  const [program, setProgram] =
    useState(null);

  useEffect(() => {
    fetchProgram();
  }, []);

  const fetchProgram = async () => {
    try {
      const res =
        await adminAPI.getProgram();

      setProgram(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section
      className="
        relative
        w-full
        mt-16
        bg-white
        overflow-visible
      "
    >
      {/* HEADER */}
      <div className="pb-10">
        <p
          className="
            text-3xl
            md:text-4xl
            text-[#125785]
            max-w-[90%]
            mx-auto
            mt-6
            leading-relaxed
            font-semibold
            tracking-wide
          "
        >
          {program?.subtext ||
            "Loading..."}
        </p>
      </div>

      {/* VIDEO */}
      {program?.video && (
        <ScrollVideoSkeleton
          videoSrc={program.video}
          title={program.title}
          description={
            program.description
          }
          end={1800}
          object="contain"
          overlay={false}
        />
      )}
    </section>
  );
};

export default ProgramsSection;