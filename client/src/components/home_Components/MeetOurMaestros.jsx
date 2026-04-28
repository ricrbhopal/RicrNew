// import React, { useState, useEffect } from 'react';
// import { FaLinkedin } from 'react-icons/fa';
// import { adminAPI } from '../../config/api.js';

// const MaestrosSection = () => {
//   const [maestrosRemote, setMaestrosRemote] = useState([]);
//   const [loadingMaestros, setLoadingMaestros] = useState(false);

//   useEffect(() => {
//     const fetchMaestros = async () => {
//       setLoadingMaestros(true);
//       try {
//         const res = await adminAPI.getAllMaestros();
//         const all = res.data || [];
//         const active = all.filter(m => m.status === 'active');
//         setMaestrosRemote(active.map(m => ({ 
//           _id: m._id, 
//           name: m.name, 
//           img: m.img, 
//           role: m.role, 
//           linkedIn: m.linkedIn 
//         })));
//       } catch (e) {
//         console.warn('Failed to fetch maestros', e);
//         setMaestrosRemote([]);
//       } finally {
//         setLoadingMaestros(false);
//       }
//     };

//     fetchMaestros();
//   }, []);

//   return (
//     <div className='w-full mx-auto px-4 sm:px-6 md:px-16  text-white py-20 bg-[#125785]'>
//       <div className='max-w-6xl mx-auto flex flex-col justify-center items-center gap-6'>
//         <h1 className='text-5xl font-medium text-center'>Meet Our Coding Maestros</h1>
//         <h2 className='text-2xl text-medium text-center max-w-4xl'>
//           Learn from industry veterans and coding experts at RICR. Our mentors bring real-world insights to elevate your coding skills.
//         </h2>

//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-10'>
//           {loadingMaestros ? (
//             <div className='col-span-full text-center text-gray-500'>Loading maestros...</div>
//           ) : maestrosRemote.length > 0 ? (
//             maestrosRemote.map((maestro) => (
//               <div
//                 key={maestro._id}
//                 className='relative rounded-lg overflow-hidden group transition-all duration-500 w-[350px] hover:scale-105'
//                 style={{ height: '350px' }}
//               >
//                 <div className='h-full w-full overflow-hidden'>
//                   <img
//                     src={maestro.img}
//                     alt={maestro.name}
//                     className='h-full w-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110'
//                   />
//                 </div>

//                 <div className='absolute bottom-0 left-0 right-0 bg-black/90 transform transition-all duration-500 ease-in-out group-hover:translate-y-0 translate-y-full h-1/2'>
//                   <div className='flex flex-col items-center text-center text-white h-full justify-end pb-4'>
//                     <h3 className='text-xl font-bold mb-2'>{maestro.name}</h3>
//                     <p className='text-md mb-3 opacity-90 leading-relaxed'>{maestro.role}</p>
//                     <a
//                       href={maestro.linkedIn}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className='inline-flex items-center justify-center p-2 transition hover:scale-110 z-50'
//                     >
//                       <FaLinkedin className='text-white text-lg cursor-pointer' />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className='col-span-full text-center text-gray-600'>No active maestros available.</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MaestrosSection;
import React from "react";
import Image from "../../assets/Mentor/image.jpg";

const MentorsPage = () => {
  return (
    <section className="bg-[#f5f5f7] 
    w-[100%] sm:w-[100%] md:w-[100%] 
    mx-auto 
    mt-8 sm:mt-10 md:mt-12 
    py-10 sm:py-14 md:py-16 
    px-4 sm:px-6 md:px-10 
    rounded-xl sm:rounded-2xl">

      {/* 🔥 Heading */}
      <div className="max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-14">
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
        font-semibold text-black 
        mb-3 sm:mb-4 
        leading-tight sm:leading-snug">
          Learn from people who’ve worked in the industry
        </h2>

        <p className="text-gray-600 
        max-w-full sm:max-w-xl 
        text-xs sm:text-sm md:text-base 
        leading-relaxed">
          Our mentors bring real-world experience, not just textbook knowledge.
        </p>

      </div>

      {/* 🔥 BANNER IMAGE */}
      <div className="max-w-6xl mx-auto">
        
        <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden">

          {/* IMAGE */}
          <img
            src={Image}
            alt="Mentors"
            className="
            w-full 
            h-[220px] 
            sm:h-[300px] 
            md:h-[400px] 
            lg:h-[500px] 
            xl:h-[550px] 
            object-cover 
            rounded-xl sm:rounded-2xl
            transition-transform duration-500 ease-out
            hover:scale-[1.02]
            "
          />

          {/* 🔥 Premium Overlay */}
          <div className="absolute inset-0 
          bg-gradient-to-t 
          from-black/25 
          via-black/10 
          to-transparent 
          rounded-xl sm:rounded-2xl" />

        </div>

      </div>

    </section>
  );
};

export default MentorsPage;