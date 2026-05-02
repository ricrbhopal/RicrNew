import React, { useEffect, useRef, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { adminAPI } from "../../config/api";

const PlacementSection = () => {
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const [placementData, setPlacementData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //  FETCH DATA
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
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || placementData.length === 0) {
    return (
      <section className="bg-[#f5f7fb] w-full">
        <div className="py-20 w-full flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 px-8 lg:px-16">
            <span className="text-sm font-semibold text-[#125785] uppercase animate-pulse">
              Placements
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 leading-tight animate-fade-in-up">
              Built for real-world hiring,
              <span className="text-[#125785]"> not just certificates</span>
            </h2>
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#125785] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  //  SHUFFLE FUNCTION
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  //  SPLIT DATA (ALTERNATE)
  const half = Math.ceil(placementData.length / 2);

  const topBase = shuffle(placementData.slice(0, half));
  const bottomBase = shuffle(placementData.slice(half));

  //  DUPLICATE FOR LOOP (ensure enough items for smooth scroll)
  const minCards = 8; // Minimum cards to ensure smooth scroll
  const repeatCountTop = Math.ceil(minCards / (topBase.length || 1));
  const repeatCountBottom = Math.ceil(minCards / (bottomBase.length || 1));
  const topData = Array(repeatCountTop).fill(topBase).flat();
  const bottomData = Array(repeatCountBottom).fill(bottomBase).flat();

  return (
    <section className=" w-full mt-10 overflow-hidden">
      <div className="py-12 md:py-16 lg:py-20 w-full flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left IMAGE with enhanced animation */}
        <div 
          className="w-full lg:w-1/2 px-5 sm:px-8 lg:px-0 animate-fade-in-left"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative rounded-2xl overflow-hidden md:ml-2 sm:ml-0 group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="placement"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Animated Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-500"></div>

            {/* Animated Badge */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/90 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2 rounded-xl shadow-lg animate-slide-up opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              <p className="text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1">
                <FaGraduationCap className="text-[#125785] text-base sm:text-lg animate-bounce" />
                Real Students • Real Placements
              </p>
            </div>
          </div>
        </div>

        {/* Right Content with enhanced animations */}
        <div className="w-full lg:w-1/2 px-5 sm:px-8 lg:px-16 animate-fade-in-right">
          <span className="text-xs sm:text-sm font-bold text-[#125785] uppercase tracking-wide inline-block animate-slide-up">
            Placements
          </span>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-3 leading-snug md:leading-tight animate-fade-in-up">
            At RICR, placements aren't about promises — they're the result of
            what you build and practice.
            <span className="text-[#125785]">
              {" "}
              We focus on making you interview-ready.
            </span>
          </h2>

          {/* TOP ROW */}
          <div className="mt-8 md:mt-10 overflow-hidden animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <MarqueeRow
              ref={topRef}
              data={topData}
              direction="right"
              speed={0.6}
            />
          </div>

          {/* BOTTOM ROW */}
          <div className="mt-4 md:mt-6 overflow-hidden animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <MarqueeRow
              ref={bottomRef}
              data={bottomData}
              direction="left"
              speed={0.6}
            />
          </div>
        </div>
      </div>

      {/* Add global animation keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

// MARQUEE ROW COMPONENT with smooth animation
const MarqueeRow = React.forwardRef(
  ({ data, direction = "left", speed = 0.6 }, ref) => {
    const scrollRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
      const element = scrollRef.current;
      if (!element || !data.length) return;

      let lastTimestamp = 0;
      const actualSpeed = speed;

      const animate = (timestamp) => {
        if (!lastTimestamp) {
          lastTimestamp = timestamp;
          animationRef.current = requestAnimationFrame(animate);
          return;
        }

        const delta = Math.min(32, timestamp - lastTimestamp);
        const moveDistance = actualSpeed * (delta / 16);
        lastTimestamp = timestamp;

        if (direction === "left") {
          element.scrollLeft += moveDistance;
          if (element.scrollLeft >= element.scrollWidth - element.clientWidth) {
            element.scrollLeft = 0;
          }
        } else {
          element.scrollLeft -= moveDistance;
          if (element.scrollLeft <= 0) {
            element.scrollLeft = element.scrollWidth - element.clientWidth;
          }
        }

        animationRef.current = requestAnimationFrame(animate);
      };

      // Set initial position
      if (direction === "right") {
        element.scrollLeft = element.scrollWidth - element.clientWidth;
      } else {
        element.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [data, direction, speed]);

    // Combine refs
    const setRefs = (el) => {
      scrollRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    };

    return (
      <div className="overflow-hidden">
        <div
          ref={setRefs}
          className="overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overflowX: "auto",
          }}
        >
          <div className="flex gap-6 w-max">
            {data.map((item, index) => (
              <Card item={item} key={`${direction}-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
  },
);

// ENHANCED CARD COMPONENT with more animations
const Card = ({ item }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative min-w-[340px] bg-[#e9eeee] rounded-2xl transition-all duration-500 hover:shadow-xl overflow-hidden cursor-pointer animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${Math.random() * 0.3}s` }}
    >
      {/* Top gradient bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0f766e] to-[#0d9488] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      
      {/* Bottom gradient bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0f766e] to-[#0d9488] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right delay-75"></div>

      <div className="p-5 flex items-start gap-4">
        {/* Avatar with glow effect */}
        <div className="relative flex-shrink-0">
          <div className={`absolute -inset-0.5 bg-gradient-to-r from-[#0f766e] to-[#0d9488] rounded-full transition-all duration-500 ${isHovered ? 'opacity-30 blur-md scale-110' : 'opacity-0 blur'}`}></div>

          <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md bg-gray-200">
            {!imageError ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0f766e] to-[#0d9488] text-white text-xl font-bold">
                {item.name?.charAt(0) || "?"}
              </div>
            )}
          </div>

          {/* Online status indicator with pulse animation */}
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#e9eeee] animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#0f766e] transition-colors duration-300 truncate">
            {item.name}
          </h3>

          {/* Company and position */}
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {item.companyLogo && (
              <img
                src={item.companyLogo}
                alt="logo"
                className="w-5 h-5 rounded-full bg-white p-0.5 shadow-sm flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
            <div className="text-sm text-gray-700 truncate">
              <span className="font-semibold">{item.company}</span>
              {item.position && (
                <>
                  <span className="mx-1 text-gray-400">•</span>
                  <span className="text-gray-600">{item.position}</span>
                </>
              )}
            </div>
          </div>

          {/* Batch */}
          {item.batch && (
            <div className="mt-2">
              <span className="inline-block text-xs font-medium text-gray-500 bg-white/50 px-2 py-0.5 rounded-full transition-all duration-300 group-hover:bg-white/70 group-hover:shadow-sm">
                Batch {item.batch}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out forwards;
    }
    
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-3px);
      }
    }
    
    .animate-bounce {
      animation: bounce 2s infinite;
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
  `;
  if (!document.querySelector("style[data-scrollbar-hide]")) {
    style.setAttribute("data-scrollbar-hide", "true");
    document.head.appendChild(style);
  }
}

export default PlacementSection;