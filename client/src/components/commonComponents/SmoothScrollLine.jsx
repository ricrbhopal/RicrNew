// import React, { useEffect, useState, useRef } from "react";

// const SmoothScrollLine = () => {
//   const [progress, setProgress] = useState(0);
//   const targetProgress = useRef(0);

//   // ========================================
//   // SMOOTH SCROLL TRACKING
//   // ========================================
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const docHeight =
//         document.documentElement.scrollHeight - window.innerHeight;

//       targetProgress.current = scrollTop / docHeight;
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // ========================================
//   // ANIMATION LOOP (SMOOTH INTERPOLATION)
//   // ========================================
//   useEffect(() => {
//     let animationFrame;

//     const animate = () => {
//       setProgress((prev) => {
//         const diff = targetProgress.current - prev;
//         return prev + diff * 0.02; // 🔥 smoothing factor
//       });

//       animationFrame = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => cancelAnimationFrame(animationFrame);
//   }, []);

//   return (
//     <div className="scroll-line-wrapper">

//       <div
//         className="scroll-line"
//         style={{
//           transform: `scaleX(${progress})`,
//         }}
//       />

//     </div>
//   );
// };

// export default SmoothScrollLine;