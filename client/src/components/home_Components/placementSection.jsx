import React, { useEffect, useRef } from "react";

const placementData = [

  {
    name: "Rahul Sharma",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    company: "Spotify",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Aman Gupta",
    company: "Google",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Patil",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rohit Singh",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Neha Kapoor",
    company: "Adobe",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
   {
    name: "Rahul Sharma",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    company: "Spotify",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Aman Gupta",
    company: "Google",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Patil",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rohit Singh",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Neha Kapoor",
    company: "Adobe",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
   {
    name: "Rahul Sharma",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    company: "Spotify",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Aman Gupta",
    company: "Google",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Patil",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rohit Singh",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Neha Kapoor",
    company: "Adobe",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
   {
    name: "Rahul Sharma",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    company: "Spotify",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Aman Gupta",
    company: "Google",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Patil",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rohit Singh",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Neha Kapoor",
    company: "Adobe",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
   {
    name: "Rahul Sharma",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    company: "Spotify",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Aman Gupta",
    company: "Google",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Patil",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rohit Singh",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Neha Kapoor",
    company: "Adobe",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
   {
    name: "Rahul Sharma",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    company: "Spotify",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Aman Gupta",
    company: "Google",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Patil",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rohit Singh",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Neha Kapoor",
    company: "Adobe",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
   {
    name: "Rahul Sharma",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    company: "Spotify",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Aman Gupta",
    company: "Google",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Patil",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rohit Singh",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Neha Kapoor",
    company: "Adobe",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
   {
    name: "Rahul Sharma",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    company: "Spotify",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Aman Gupta",
    company: "Google",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Patil",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rohit Singh",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Neha Kapoor",
    company: "Adobe",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
   {
    name: "Rahul Sharma",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    company: "Spotify",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Aman Gupta",
    company: "Google",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Patil",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rohit Singh",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Neha Kapoor",
    company: "Adobe",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
   {
    name: "Rahul Sharma",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    company: "Spotify",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Aman Gupta",
    company: "Google",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Patil",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rohit Singh",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Neha Kapoor",
    company: "Adobe",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
   {
    name: "Rahul Sharma",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    company: "Spotify",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Aman Gupta",
    company: "Google",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Patil",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rohit Singh",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Neha Kapoor",
    company: "Adobe",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
   {
    name: "Rahul Sharma",
    company: "Apple Music",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    company: "Spotify",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Aman Gupta",
    company: "Google",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sneha Patil",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rohit Singh",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Neha Kapoor",
    company: "Adobe",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];


// 🔥 duplicate for smooth infinite loop
const loopData = [...placementData, ...placementData, ...placementData];

const PlacementSection = () => {
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
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

    // 🔥 IMPORTANT: initialize bottom position
    if (bottomRef.current) {
      bottomRef.current.scrollLeft = bottomRef.current.scrollWidth / 2;
    }

    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="py-14 bg-[#f5f5f7] w-full mt-10">
      <div className=" mx-auto px-4">
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

// 🔥 CARD
const Card = ({ item }) => {
  return (
    <div
      className="
      min-w-[240px]
      bg-[#e9eeee]
      rounded-xl
      p-6
      flex flex-col items-center
      group
      transition-all duration-300
      hover:bg-white hover:shadow-lg
      "
    >
      <img
        src={item.image}
        alt={item.name}
        className="
        w-14 h-14 rounded-full object-cover mb-3
        grayscale group-hover:grayscale-0
        transition duration-500
        "
      />

      <h3 className="text-sm font-semibold text-black">{item.name}</h3>
      <p className="text-xs text-gray-500">is in</p>

      <p className="text-lg font-semibold text-[#0f766e] mt-2">
        {item.company}
      </p>
    </div>
  );
};

export default PlacementSection;
