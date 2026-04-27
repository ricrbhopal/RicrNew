import React, { useEffect, useRef } from "react";

const placementData = [
  {
    name: "Rahul Sharma",
    role: "Visionary Women",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    role: "Visionary Women",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Aman Gupta",
    role: "Visionary Women",
    company: "Apple Music Presents",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Patil",
    role: "Visionary Women",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rohit Singh",
    role: "Visionary Women",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },

    {
    name: "Sneha Patil",
    role: "Visionary Women",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rohit Singh",
    role: "Visionary Women",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

const PlacementSection = () => {
  const scrollRef = useRef(null);

  // 🔥 AUTO SLIDE (smooth Apple style)
  useEffect(() => {
    const container = scrollRef.current;
    let scroll = 0;

    const interval = setInterval(() => {
      if (!container) return;

      scroll += 260;

      if (scroll >= container.scrollWidth - container.clientWidth) {
        scroll = 0;
      }

      container.scrollTo({
        left: scroll,
        behavior: "smooth",
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-[#f5f5f7] w-[90%]  rounded-2xl  ml-30   mt-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold text-black mb-4">
            People Built well enough to get hired.
          </h2>

          <p className="text-gray-600 max-w-xl text-sm md:text-base">
            At RICR, placements aren’t about promises. They’re the result of what you build, practice, and understand. 
            We focus on making you interview-ready, not just course-complete.
          </p>
        </div>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide"
        >
          {placementData.map((item, index) => (
            <div
              key={index}
              className="min-w-[220px] bg-[#f2f2f2] rounded-xl p-3 flex-shrink-0"
            >
              {/* Image */}
              <div className="w-full h-[220px] rounded-lg overflow-hidden bg-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale"
                />
              </div>

              {/* Text */}
              <div className="mt-3">
                <h3 className="text-sm font-semibold text-black">
                  {item.name}: {item.role}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {item.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementSection;