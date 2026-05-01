import React, { useEffect, useRef, useState } from "react";
import { adminAPI } from "../../config/api";
import { MdOutlineArrowForward } from "react-icons/md";

const Hero = () => {
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const [mediaList, setMediaList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaError, setMediaError] = useState(false);

useEffect(() => {
  const fetchMedia = async () => {
    try {
      const res = await adminAPI.getHero();
      const data = res.data;

     

      let list = [];

      // 🔥 HANDLE ARRAY (LOCAL + FUTURE)
      if (Array.isArray(data.heroes) && data.heroes.length > 0) {
        const activeHeroes = data.heroes.filter(
          (item) => item.status === "active"
        );

        list = activeHeroes.map((item) => ({
          url:
            item.backgroundVideo ||
            item.image ||
            item.secure_url ||
            item.url ||
            "",
          mediaType: item.mediaType || "image",
          headline: item.headline || "",
          subtext: item.subtext || "",
          cta1Text: item.cta1Text || "",
          cta1Link: item.cta1Link || "#",
          cta2Text: item.cta2Text || "",
          cta2Link: item.cta2Link || "#",
          order: item.order ?? 0,
        }));
      }

      // 🔥 HANDLE SINGLE (PRODUCTION)
      if (data.hero) {
        list.push({
          url:
            data.hero.backgroundVideo ||
            data.hero.image ||
            data.hero.secure_url ||
            data.hero.url ||
            "",
          mediaType: data.hero.mediaType || "image",
          headline: data.hero.headline || "",
          subtext: data.hero.subtext || "",
          cta1Text: data.hero.cta1Text || "",
          cta1Link: data.hero.cta1Link || "#",
          cta2Text: data.hero.cta2Text || "",
          cta2Link: data.hero.cta2Link || "#",
          order: data.hero.order ?? 0,
        });
      }

      // 🔥 VIDEOS
      if (Array.isArray(data.videos)) {
        const activeVideos = data.videos.filter(
          (item) => item.status === "active"
        );

        list = list.concat(
          activeVideos.map((item) => ({
            url:
              item.backgroundVideo ||
              item.image ||
              item.secure_url ||
              item.url ||
              "",
            mediaType: item.mediaType || "video",
            headline: item.headline || "",
            subtext: item.subtext || "",
            cta1Text: item.cta1Text || "",
            cta1Link: item.cta1Link || "#",
            cta2Text: item.cta2Text || "",
            cta2Link: item.cta2Link || "#",
            order: item.order ?? 0,
          }))
        );
      }

      // 🔥 REMOVE DUPLICATES (IMPORTANT)
      const uniqueList = Array.from(
        new Map(list.map((item) => [item.url, item])).values()
      );

      // 🔥 SORT
      uniqueList.sort((a, b) => a.order - b.order);


      setMediaList(uniqueList);
    } catch (err) {
      console.error("Hero fetch error:", err);
    }
  };

  fetchMedia();
}, []);

  //  AUTO SLIDER
  useEffect(() => {
    if (mediaList.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mediaList.length);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [mediaList]);

  //  IMPORTANT FIX (avoid crash)
  if (!mediaList.length) {
    return (
      <section className="w-[100%] mx-auto mt-[90px] h-[300px] bg-gray-200 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </section>
    );
  }

  const current = mediaList[activeIndex];

  return (
    <section
      className="relative w-[100%] md:w-[100%] mx-auto 
mt-[80px] sm:mt-[90px] md:mt-[110px]
h-[320px] sm:h-[420px] md:h-[70vh] lg:h-[80vh]
rounded-1xl md:rounded-1xl overflow-hidden"
    >
      {/*  BACKGROUND */}
      {current.mediaType === "video" ? (
        <video
          ref={videoRef}
          key={current.url} //  important for refresh
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={current.url} />
        </video>
      ) : (
        <img
          src={mediaError ? "/fallback-hero.jpg" : current.url}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setMediaError(true)}
        />
      )}

      {/*  OVERLAY */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/*  CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-center px-5 sm:px-8 md:px-16 text-white">
        <div className="mt-5  flex flex-wrap gap-3  sm:ml-0 md:ml-15 sm:mt-0 md:mt-120">
          {/* PRIMARY BUTTON */}
          <a
            href=''
            className="
      px-4 py-2 text-sm
      sm:px-5 sm:py-2.5 sm:text-base
      md:px-6 md:py-3 md:text-lg
      bg-[#125785] rounded-lg flex items-center gap-2 font-medium
      hover:bg-[#0f4668] transition"
          >
    Start Your Journey

            {/* <MdOutlineArrowForward /> */}
          </a>

          {/* SECONDARY BUTTON */}
          <a
            href=''
            className="
      px-4 py-2 text-sm
      sm:px-5 sm:py-2.5 sm:text-base
      md:px-6 md:py-3 md:text-lg
      bg-[#125785] rounded-lg flex items-center gap-2 font-medium
      hover:bg-[#0f4668] transition"
          >
      Explore Programs
          </a>
        </div>
      </div>

      {/*  DOTS */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {mediaList.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full ${
              activeIndex === i ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
