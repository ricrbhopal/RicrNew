import React, { useEffect, useRef, useState } from "react";
import { adminAPI } from "../../config/api";
import { MdOutlineArrowForward } from "react-icons/md";

const Hero = () => {
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const [mediaList, setMediaList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaError, setMediaError] = useState(false);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await adminAPI.getHero();
        const data = res.data;

        const list = [];

        if (Array.isArray(data.heroes)) {
          data.heroes.forEach((item) => {
            const url =
              item.backgroundVideo ||
              item.image ||
              item.secure_url ||
              item.url;

            if (!url) return;

            list.push({
              url,
              mediaType: item.mediaType || "image",
              thumbnail: item.thumbnail || "",

              // 🔥 DYNAMIC CONTENT
              headline: item.headline || "",
              subtext: item.subtext || "",
              cta1Text: item.cta1Text || "",
              cta1Link: item.cta1Link || "#",
              cta2Text: item.cta2Text || "",
              cta2Link: item.cta2Link || "#",
            });
          });
        }

        if (list.length > 0) {
          setMediaList(list);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchMedia();
  }, []);

  // AUTO SLIDER
  useEffect(() => {
    if (mediaList.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mediaList.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [mediaList]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const current = mediaList[activeIndex];

  return (
    <section className="relative h-[85vh] rounded-3xl w-[90%] ml-30 flex items-center overflow-hidden mt-23">

      {/* Background */}
      {current?.mediaType === "image" ? (
        <img
          src={mediaError ? "/fallback-hero.jpg" : current?.url}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setMediaError(true)}
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src={current?.url} />
        </video>
      )}

      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-6 md:ps-20 ps-10 w-full md:w-1/2 text-white mt-120">

        {/* CTA BUTTONS */}
        <div className="flex flex-wrap gap-4">
          <a
            href={current?.cta1Link}
            className="px-6 py-3 bg-[#125785] rounded-lg flex items-center gap-2"
          >
            {current?.cta1Text}
            <MdOutlineArrowForward />
          </a>

          <a
            href={current?.cta2Link}
            className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition"
          >
            {current?.cta2Text}
          </a>
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {mediaList.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-3 h-3 rounded-full ${
              activeIndex === i ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;