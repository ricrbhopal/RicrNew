import React, { useEffect, useRef, useState } from "react";
import { adminAPI } from "../../config/api";
import { MdOutlineArrowForward } from "react-icons/md";
import Placement from "../../assets/Home/placement.mp4";

const Hero = () => {
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const [mediaList, setMediaList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await adminAPI.getHero();
        const data = res.data;

        let list = [];

        // 🔥 HANDLE ARRAY (LOCAL + FUTURE)
        if (Array.isArray(data.heroes) && data.heroes.length > 0) {
          const activeHeroes = data.heroes.filter(
            (item) => item.status === "active",
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
            (item) => item.status === "active",
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
            })),
          );
        }

        // 🔥 REMOVE DUPLICATES (IMPORTANT)
        const uniqueList = Array.from(
          new Map(list.map((item) => [item.url, item])).values(),
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
    id="hero-section"
      className="relative w-full 
      h-[300px] sm:h-[400px] md:h-[70vh] lg:h-[100vh] 
    bg-black overflow-hidden"
    >
      <video
        ref={videoRef}
        key={current.url}
        className="absolute inset-0 w-full h-[300px] md:h-[70vh] lg:h-[100vh]  object-cover scale-100"
        style={{ objectPosition: "center 75%" }}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={current.url} type="video/mp4" />z
      </video>

      {/* SIDE GRADIENT (hide gap smartly) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/20"></div>

      {/* BOTTOM GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>


    </section>
  );
};

export default Hero;
