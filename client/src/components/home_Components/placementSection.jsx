import React, { useEffect, useState, useRef } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { adminAPI } from "../../config/api";
import ScrollVideoSkeleton from "../commonComponents/ScrollTrigger";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ✅ LOCAL VIDEO
import backgroundVideoFile from "../../assets/Home/placement.mp4";

// ✅ WORKING ONLINE FALLBACK VIDEO
const FALLBACK_BACKGROUND = "https://www.w3schools.com/howto/rain.mp4";

// ✅ WORKING LEFT VIDEO
const LeftVideo = "https://www.w3schools.com/html/mov_bbb.mp4";

const PlacementSection = () => {
  const [placementData, setPlacementData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showNextSection, setShowNextSection] = useState(false);

  const sectionWrapperRef = useRef(null);
  const leftVideoRef = useRef(null);
  const leftVideoContainerRef = useRef(null);

  // 🔥 FETCH DATA
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await adminAPI.getCelebrates();
      const filtered = res.data.filter((s) => s.status === "active");
      const formatted = filtered.map((s) => ({
        name: s.name,
        company: s.company,
        image: s.image,
        companyLogo: s.companyLogo,
        position: s.position,
        batch: s.batch,
      }));
      setPlacementData(formatted);
    } catch (err) {
      console.error("Error fetching placement data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 MONITOR SCROLL PROGRESS FOR FULLSCREEN TRANSITION
  useEffect(() => {
    if (!sectionWrapperRef.current) return;

    let st = ScrollTrigger.create({
      trigger: sectionWrapperRef.current,
      start: "top top",
      end: "+=4000",
      scrub: 1,
      onUpdate: (self) => {
        // When background video reaches ~95%, start expanding left video to full screen
        if (self.progress >= 0.95 && !isFullScreen) {
          setIsFullScreen(true);
          
          // Optional: Add GSAP animation for smoother transition
          gsap.fromTo(leftVideoContainerRef.current,
            { scale: 1, opacity: 1 },
            { scale: 1.05, opacity: 1, duration: 0.5, ease: "power2.out" }
          );
        }
        // When completely finished, prepare for next section
        if (self.progress >= 0.99 && !showNextSection) {
          setShowNextSection(true);
        }
      },
    });

    return () => {
      if (st) st.kill();
    };
  }, [isFullScreen, showNextSection]);

  // ✅ LOCAL VIDEO FIRST
  const backgroundSrc = backgroundVideoFile || FALLBACK_BACKGROUND;

  // 🔥 LOADER
  if (isLoading || placementData.length === 0) {
    return (
      <section className="w-full h-screen bg-black flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <div ref={sectionWrapperRef} className="relative">
      <ScrollVideoSkeleton
        videoSrc={backgroundSrc}
        end={4000}
        overlay={true}
        navbarClass=".main-navbar"
        height="100vh"
        object="cover"
      >
        {/* 🔥 MAIN CONTENT */}
        <div
          className={`
            h-full w-full flex flex-col lg:flex-row items-center justify-between gap-10 px-5 md:px-16 py-20
            transition-all duration-1000 ease-in-out
            ${isFullScreen ? "!p-0" : ""}
          `}
        >
          {/* 🔥 LEFT VIDEO - EXPANDS TO FULL SCREEN AT FRONT */}
          <div
            ref={leftVideoContainerRef}
            className={`
              relative overflow-hidden rounded-3xl group shadow-2xl
              transition-all duration-1000 ease-in-out
              ${isFullScreen
                ? "fixed inset-0 z-[9999] rounded-none h-screen w-screen bg-black"
                : "w-full lg:w-1/2 h-[320px] sm:h-[420px] md:h-[600px] z-10"
              }
            `}
          >
            <video
              ref={leftVideoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            >
              <source src={LeftVideo} type="video/mp4" />
            </video>

            {/* 🔥 TEXT OVERLAY - Visible in both normal and fullscreen mode */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h1 className={`
                text-white font-bold tracking-[10px] transition-all duration-700 text-center
                ${isFullScreen 
                  ? "text-6xl md:text-8xl lg:text-9xl" 
                  : "text-4xl md:text-7xl"
                }
              `}>
                PLAY REEL
              </h1>
            </div>

            {/* 🔥 BADGE - Bottom left badge */}
            <div className={`
              absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg transition-all duration-700
              ${isFullScreen ? "scale-110" : "scale-100"}
            `}>
              <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <FaGraduationCap className="text-[#125785]" />
                Real Students • Real Placements
              </p>
            </div>

            {/* 🔥 CLOSE BUTTON - Only appears in fullscreen mode */}
            {isFullScreen && (
              <button
                onClick={() => {
                  setIsFullScreen(false);
                  setShowNextSection(false);
                  // Scroll back to top of section
                  window.scrollTo({ top: sectionWrapperRef.current.offsetTop, behavior: "smooth" });
                }}
                className="absolute top-6 right-6 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 z-[10000] backdrop-blur-md"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* 🔥 RIGHT CONTENT - FADES OUT when video expands */}
          <div
            className={`
              w-full lg:w-1/2 transition-all duration-700
              ${isFullScreen ? "opacity-0 invisible" : "opacity-100 visible"}
            `}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">Our Top Placements</h2>
              <ul className="space-y-2">
                {placementData.slice(0, 5).map((p, idx) => (
                  <li key={idx} className="border-b border-white/20 pb-2">
                    <span className="font-semibold">{p.name}</span> – {p.company} ({p.position})
                  </li>
                ))}
              </ul>
              
              {/* Show more button */}
              <button className="mt-4 text-sm text-white/80 hover:text-white transition-colors">
                View All Placements →
              </button>
            </div>
          </div>
        </div>
      </ScrollVideoSkeleton>

      {/* 🔥 NEXT SECTION INDICATOR - Shows when video is in fullscreen */}
      {isFullScreen && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[10000] animate-bounce">
          <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3 text-white text-sm font-semibold">
            Scroll Down for Next Section ↓
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementSection;