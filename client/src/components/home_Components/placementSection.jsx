import React, { useEffect, useRef, useState } from "react";
import { adminAPI } from "../../config/api";

const PlacementSection = () => {
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  // 🔥 NEW STATE
  const [placementData, setPlacementData] = useState([]);

  // 🔥 FETCH DATA
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await adminAPI.getCelebrates();

      console.log("Fetched Placement Data:", res.data); // Debug log

      const filtered = res.data.filter((s) => s.status === "active");
const formatted = filtered.map((s) => ({
  name: s.name,
  company: s.company,
  image: s.image,
  companyLogo: s.companyLogo,
  position: s.position,
  batch: s.batch,
  status: s.status,
}));

      setPlacementData(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 DUPLICATE (same logic)
  const loopData =
    placementData.length > 2
      ? [...placementData, ...placementData]
      : placementData;

  // 🔥 ANIMATION (UNCHANGED)
  useEffect(() => {
    if (placementData.length === 0) return;

    let frame;
    const speed = 0.6;

    const animate = () => {
      const top = topRef.current;
      const bottom = bottomRef.current;

      if (top) {
        top.scrollLeft += speed;
        if (top.scrollLeft >= top.scrollWidth / 2) {
          top.scrollLeft = 0;
        }
      }

      if (bottom) {
        bottom.scrollLeft += speed;
        if (bottom.scrollLeft >= bottom.scrollWidth / 2) {
          bottom.scrollLeft = 0;
        }
      }

      frame = requestAnimationFrame(animate);
    };

    if (bottomRef.current) {
      bottomRef.current.scrollLeft =
        bottomRef.current.scrollWidth / 2;
    }

    animate();

    return () => cancelAnimationFrame(frame);
  }, [placementData]);

  return (
    <section className="py-14 bg-[#f5f5f7] w-full mt-10">
      <div className="mx-auto px-4">

        <h2 className="text-3xl md:text-5xl font-semibold text-black mb-4 leading-tight text-center">
          People Built well enough to get hired.
        </h2>

        <p className="text-center mb-10 font-semibold">
          At RICR, placements aren’t about promises. <br />
          They’re the result of what you build, practice, and understand. <br />
          We focus on making you interview-ready, not just course-complete.
        </p>

        {/* 🔥 TOP ROW */}
        <div ref={topRef} className="overflow-hidden">
          <div className="flex gap-6 w-max">
            {loopData.map((item, index) => (
              <Card item={item} key={index} />
            ))}
          </div>
        </div>

        {/* 🔥 BOTTOM ROW */}
        <div ref={bottomRef} className="overflow-hidden mt-6">
          <div className="flex gap-6 w-max">
            {loopData.map((item, index) => (
              <Card item={item} key={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

// 🔥 CARD (UNCHANGED)
const Card = ({ item }) => {
  return (
    <div className="group relative min-w-[340px] bg-[#e9eeee] rounded-2xl transition-all duration-500 hover:shadow-xl overflow-hidden">
      
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0f766e] to-[#0d9488] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      
      <div className="p-5 flex items-start gap-4">
        
        {/* PROFILE SECTION */}
        <div className="relative">
          {/* Animated ring */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0f766e] to-[#0d9488] rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur"></div>
          
          <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          {/* Active dot */}
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#e9eeee]"></div>
        </div>

        {/* CONTENT SECTION */}
        <div className="flex-1">
          
          {/* Name with hover underline */}
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#0f766e] transition-colors duration-300 inline-block">
            {item.name}
          </h3>

          {/* Company info */}
          <div className="flex items-center gap-2 mt-2">
            {item.companyLogo && (
              <div className="flex-shrink-0">
                <img
                  src={item.companyLogo}
                  alt="logo"
                  className="w-5 h-5 rounded-full bg-white p-0.5 shadow-sm"
                />
              </div>
            )}
            <div className="flex items-center gap-1.5 flex-wrap text-sm">
              <span className="font-semibold text-gray-800">{item.company}</span>
              <span className="text-gray-400">—</span>
              <span className="text-gray-600">{item.position}</span>
            </div>
          </div>

          {/* Batch with improved styling */}
          <div className="mt-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200/50 group-hover:border-[#0f766e]/20 group-hover:bg-white/80 transition-all duration-300">
              <svg className="w-3 h-3 text-[#0f766e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-medium text-gray-700">Batch {item.batch}</span>
            </div>
          </div>
        </div>

        {/* Chevron on hover */}
        <div className="self-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <div className="w-7 h-7 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
            <svg className="w-4 h-4 text-[#0f766e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom gradient on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0f766e]/0 via-[#0f766e]/50 to-[#0f766e]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};
export default PlacementSection;