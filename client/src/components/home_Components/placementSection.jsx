import React, { useEffect, useRef, useState } from "react";
import { adminAPI } from "../../config/api";

const PlacementSection = () => {
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const [placementData, setPlacementData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
            <span className="text-sm font-semibold text-[#0f766e] uppercase">Placements</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
              Built for real-world hiring,
              <span className="text-[#0f766e]"> not just certificates</span>
            </h2>
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#0f766e] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 🔀 SHUFFLE FUNCTION
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  // 🔥 SPLIT DATA (ALTERNATE)
  const half = Math.ceil(placementData.length / 2);

  const topBase = shuffle(placementData.slice(0, half));
  const bottomBase = shuffle(placementData.slice(half));

  // 🔥 DUPLICATE FOR LOOP (ensure enough items for smooth scroll)
  const minCards = 8; // Minimum cards to ensure smooth scroll
  const repeatCountTop = Math.ceil(minCards / (topBase.length || 1));
  const repeatCountBottom = Math.ceil(minCards / (bottomBase.length || 1));
  const topData = Array(repeatCountTop).fill(topBase).flat();
  const bottomData = Array(repeatCountBottom).fill(bottomBase).flat();

  return (
    <section className="bg-[#f5f7fb] w-full  mt-15">
      <div className="py-20 w-full flex flex-col lg:flex-row items-center justify-between">

        {/* LEFT */}
        <div className="w-full lg:w-1/2 px-8 lg:px-16">

          <span className="text-sm font-semibold text-[#0f766e] uppercase tracking-wide">
            Placements
          </span>

          <h2 className="text-2xl md:text-3xl font-bold mt-3 leading-tight">
At RICR, placements aren't about promises — they're the result of what you build and practice.            <span className="text-[#0f766e]"> We focus on making you interview-ready.</span>
          </h2>

          {/* <p className="mt-6 text-lg text-gray-600 max-w-[550px]">
            At RICR, placements aren't about promises — they're the result of what 
            you build and practice. We focus on making you 
            <span className="font-semibold text-gray-800"> interview-ready</span>.
          </p> */}

          {/* TOP ROW - moves Left to Right */}
          <div className="mt-10">
            <MarqueeRow 
              ref={topRef} 
              data={topData} 
              direction="right" 
              speed={0.6}
            />
          </div>

          {/* BOTTOM ROW - moves Right to Left */}
          <div className="mt-6">
            <MarqueeRow 
              ref={bottomRef} 
              data={bottomData} 
              direction="left" 
              speed={0.6}
            />
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full mr-10  h-[600px] relative mt-10 lg:mt-0 rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="placement"
            className="w-full h-full object-cover rounded-2xl "
          />

          <div className="absolute inset-0 bg-black/20 rounded-l-2xl"></div>

          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg">
            <p className="text-sm font-semibold text-gray-800">
              🎓 Real Students • Real Placements
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

// MARQUEE ROW COMPONENT with smooth animation
const MarqueeRow = React.forwardRef(({ data, direction = "left", speed = 0.6 }, ref) => {
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
    if (typeof ref === 'function') {
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
          overflowX: "auto"
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
});

// ENHANCED CARD COMPONENT
const Card = ({ item }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative min-w-[340px] bg-[#e9eeee] rounded-2xl transition-all duration-500 hover:shadow-xl overflow-hidden cursor-pointer">
      
      {/* Top gradient bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0f766e] to-[#0d9488] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      
      <div className="p-5 flex items-start gap-4">
        
        {/* Avatar with glow effect */}
        <div className="relative flex-shrink-0">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0f766e] to-[#0d9488] rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur"></div>
          
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
          
          {/* Online status indicator */}
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#e9eeee]"></div>
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
                className="w-5 h-5 rounded-full bg-white p-0.5 shadow-sm flex-shrink-0"
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
              <span className="inline-block text-xs font-medium text-gray-500 bg-white/50 px-2 py-0.5 rounded-full">
                Batch {item.batch}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
  `;
  if (!document.querySelector('style[data-scrollbar-hide]')) {
    style.setAttribute('data-scrollbar-hide', 'true');
    document.head.appendChild(style);
  }
}

export default PlacementSection;