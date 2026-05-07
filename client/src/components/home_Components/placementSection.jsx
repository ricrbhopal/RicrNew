// ========================================
// PlacementSection.jsx
// ========================================

import React, {
  useEffect,
  useState,
} from "react";

import {
  FaGraduationCap,
} from "react-icons/fa";

import { adminAPI }
from "../../config/api";

import ScrollVideoSkeleton
from "../commonComponents/ScrollVideoSkeleton";

import backgroundVideoFile
from "../../assets/Home/placement.mp4";

import "../css/PlacementSection.css";

// ✅ FALLBACK
const FALLBACK_BACKGROUND =
  "https://www.w3schools.com/howto/rain.mp4";

// ✅ LEFT VIDEO
const LeftVideo =
  "https://www.w3schools.com/html/mov_bbb.mp4";

const PlacementSection = () => {

  const [
    placementData,
    setPlacementData,
  ] = useState([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isFullScreen,
    setIsFullScreen,
  ] = useState(false);

  // ========================================
  // FETCH
  // ========================================

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData =
    async () => {

      try {

        const res =
          await adminAPI.getCelebrates();

        const filtered =
          res.data.filter(
            (s) =>
              s.status ===
              "active"
          );

        const formatted =
          filtered.map(
            (s) => ({
              name: s.name,
              company:
                s.company,
              position:
                s.position,
            })
          );

        setPlacementData(
          formatted
        );

      } catch (err) {

        console.error(err);

      } finally {

        setIsLoading(false);

      }
    };

  const backgroundSrc =
    backgroundVideoFile ||
    FALLBACK_BACKGROUND;

  // ========================================
  // LOADER
  // ========================================

  if (
    isLoading ||
    placementData.length === 0
  ) {

    return (

      <section className="placement-loader">

        <div className="placement-spinner" />

      </section>
    );
  }

  return (

   <section className={`placement-main-wrapper ${isFullScreen ? "video-fullscreen" : ""}`}>

      <ScrollVideoSkeleton
        videoSrc={backgroundSrc}
        end={1200}
        overlay={true}
        navbarClass=".main-navbar"
        height="100vh"
        object="cover"
        scrubSpeed={0.2}
        onComplete={(progress) => {
          // ✅ VIDEO END
          if (progress > 0.90) {
            setIsFullScreen(true);
          } else {
            setIsFullScreen(false);
          }
        }}
      >

        {/* CONTENT */}

        <div className="placement-content">

          {/* LEFT */}

          <div

            className={`
              placement-left-video
              ${
                isFullScreen
                  ? "fullscreen"
                  : ""
              }
            `}
          >

            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="
                placement-reel-video
              "
            >

              <source
                src={LeftVideo}
                type="video/mp4"
              />

            </video>

            {/* CENTER TEXT */}

            <div className="placement-center-text">

              <h1
                className={`
                  placement-title
                  ${
                    isFullScreen
                      ? "fullscreen-title"
                      : ""
                  }
                `}
              >

                PLAY REEL

              </h1>

            </div>

            {/* BADGE */}

            <div className="placement-badge">

              <p>

                <FaGraduationCap />

                Real Students •
                Real Placements

              </p>

            </div>

          </div>



        </div>

      </ScrollVideoSkeleton>

    </section>
  );
};

export default PlacementSection;