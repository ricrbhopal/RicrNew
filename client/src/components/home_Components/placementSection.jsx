import React, { useEffect, useRef, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { adminAPI } from "../../config/api";
import BackgroundVideo from "../../assets/Home/placement.mp4";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PlacementSection = () => {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const [placementData, setPlacementData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH DATA
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

  // 🔥 SCROLL VIDEO — FIXED (3 key fixes)
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let st;

    const setupScrollTrigger = (duration) => {
      // ✅ FIX 1: gsap.context() ke BAHAR ScrollTrigger.create() — reliable trigger
      st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        // ✅ FIX 2: duration * 300 — video length ke hisaab se scroll distance
        end: () => `+=${duration * 300}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // ✅ FIX 3: Direct currentTime set — no GSAP tween lag
          const newTime = self.progress * duration;
          if (Math.abs(video.currentTime - newTime) > 0.01) {
            video.currentTime = newTime;
          }
        },
      });
    };

    const onMetadata = () => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;
      video.pause();
      video.currentTime = 0;
      setupScrollTrigger(duration);
    };

    // ✅ readyState 1 = HAVE_METADATA (duration available)
    if (video.readyState >= 1 && !isNaN(video.duration)) {
      onMetadata();
    } else {
      video.addEventListener("loadedmetadata", onMetadata);
      video.load();
    }

    return () => {
      video.removeEventListener("loadedmetadata", onMetadata);
      if (st) st.kill();
    };
  }, []);

  if (isLoading || placementData.length === 0) {
    return (
      <section className="w-full h-screen bg-black flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
  const half = Math.ceil(placementData.length / 2);
  const topBase = shuffle(placementData.slice(0, half));
  const bottomBase = shuffle(placementData.slice(half));
  const minCards = 8;
  const repeatCountTop = Math.ceil(minCards / (topBase.length || 1));
  const repeatCountBottom = Math.ceil(minCards / (bottomBase.length || 1));
  const topData = Array(repeatCountTop).fill(topBase).flat();
  const bottomData = Array(repeatCountBottom).fill(bottomBase).flat();

  return (
    // ✅ FIX 4: overflow-hidden HATA DIYA — ScrollTrigger pin ke saath conflict karta tha
    <section
      ref={sectionRef}
      className="section dark-section relative w-full h-screen bg-black"
    >
      {/* BACKGROUND VIDEO */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        webkit-playsinline="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={BackgroundVideo} type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/45 z-10"></div>

      {/* CONTENT */}
      <div className="relative z-20 h-full flex flex-col lg:flex-row items-center justify-between gap-10 px-5 md:px-16 py-20">

        {/* LEFT IMAGE */}
        <div className="w-full lg:w-1/2">
          <div className="relative overflow-hidden rounded-3xl h-[320px] sm:h-[420px] md:h-[600px] group">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="placement"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white text-4xl md:text-7xl font-bold tracking-[10px]">
                PLAY REEL
              </h1>
            </div>
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg">
              <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <FaGraduationCap className="text-[#125785]" />
                Real Students • Real Placements
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-1/2">
          <span className="text-sm font-bold text-cyan-300 uppercase tracking-wide">
            Placements
          </span>
          <h2 className="text-2xl md:text-5xl font-bold mt-4 text-white leading-tight">
            At RICR, placements aren't about promises —
            they're the result of what you build and practice.
          </h2>
          <p className="text-gray-200 mt-5 text-lg leading-relaxed">
            We focus on making you interview-ready with
            real projects, mentorship, and industry-level training.
          </p>

          {/* TOP ROW */}
          <div className="mt-10 overflow-hidden">
            <MarqueeRow ref={topRef} data={topData} direction="right" speed={0.6} />
          </div>

          {/* BOTTOM ROW */}
          <div className="mt-5 overflow-hidden">
            <MarqueeRow ref={bottomRef} data={bottomData} direction="left" speed={0.6} />
          </div>
        </div>
      </div>
    </section>
  );
};

// MARQUEE
const MarqueeRow = React.forwardRef(({ data, direction = "left", speed = 0.6 }, ref) => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element || !data.length) return;

    let lastTimestamp = 0;

    const animate = (timestamp) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      const delta = Math.min(32, timestamp - lastTimestamp);
      const moveDistance = speed * (delta / 16);
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

    if (direction === "right") {
      element.scrollLeft = element.scrollWidth - element.clientWidth;
    }
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [data, direction, speed]);

  const setRefs = (el) => {
    scrollRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };

  return (
    <div className="overflow-hidden">
      <div
        ref={setRefs}
        className="overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", overflowX: "auto" }}
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

// CARD
const Card = ({ item }) => {
  return (
    <div className="min-w-[320px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 flex items-center gap-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <h3 className="text-white font-bold text-lg">{item.name}</h3>
        <p className="text-gray-200 text-sm">{item.company}</p>
        <span className="text-xs text-gray-300">{item.position}</span>
      </div>
    </div>
  );
};

export default PlacementSection;