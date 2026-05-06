// import React, { useEffect, useRef } from "react";

// const ScrollVideoSkeleton = ({
//   videoSrc,
//   height = "100vh",
//   className = "",
// }) => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const video = videoRef.current;

//     if (!video) return;

//     // VIDEO AUTO PLAY OFF
//     video.pause();

//     const handleScroll = () => {
//       const scrollTop = window.scrollY;

//       // 🔥 SCROLL = VIDEO TIME
//       // VALUE CHANGE FOR SPEED
//       const scrollFactor = 500;

//       // VIDEO CURRENT TIME
//       video.currentTime = scrollTop / scrollFactor;

//       // OPTIONAL SMOOTH SCALE EFFECT
//       video.style.transform = `
//         scale(${1 + scrollTop * 0.0001})
//       `;
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <section
//       className={`relative w-full overflow-hidden bg-black ${className}`}
//       style={{ height }}
//     >
//       <video
//         ref={videoRef}
//         muted
//         playsInline
//         preload="auto"
//         className="
//           absolute 
//           inset-0 
//           w-full 
//           h-full 
//           object-cover
//           transition-transform
//           duration-200
//         "
//       >
//         <source src={videoSrc} type="video/mp4" />
//       </video>
//     </section>
//   );
// };

// export default ScrollVideoSkeleton;