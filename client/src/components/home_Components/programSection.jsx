// ========================================
// PlacementSection.jsx
// ========================================

import React, {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  FaGraduationCap,
} from "react-icons/fa";

import gsap from "gsap";

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

  const leftVideoContainerRef =
    useRef(null);

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

    <div className="placement-main-wrapper">

      <ScrollVideoSkeleton

        videoSrc={
          backgroundSrc
        }

        // ✅ EXTRA SCROLL
        // video end hone ke baad
        // fullscreen 10 sec tak
        // hold karega

        end={9000}

        overlay={true}

        navbarClass="
          .main-navbar
        "

        height="100vh"

        object="cover"

        scrubSpeed={0.2}

        onComplete={(progress) => {

          // ✅ LAST PART FULLSCREEN

          if (
            progress > 0.72
          ) {

            setIsFullScreen(
              true
            );

            gsap.to(
              leftVideoContainerRef.current,
              {
                scale: 1.05,
                duration: 0.6,
                ease:
                  "power3.out",
              }
            );

          } else {

            setIsFullScreen(
              false
            );
          }
        }}
      >

        {/* CONTENT */}

        <div className="placement-content">

          {/* LEFT */}

          <div

            ref={
              leftVideoContainerRef
            }

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

          {/* RIGHT */}

          <div
            className={`
              placement-right
              ${
                isFullScreen
                  ? "hide-right"
                  : ""
              }
            `}
          >

            <div className="placement-card">

              <h2>
                Our Top Placements
              </h2>

              <ul>

                {placementData
                  .slice(0, 5)
                  .map(
                    (
                      p,
                      idx
                    ) => (

                      <li
                        key={idx}
                      >

                        <span>
                          {p.name}
                        </span>

                        {" "}–{" "}

                        {p.company}

                        {" "}(
                        {p.position}
                        )

                      </li>
                    )
                  )}

              </ul>

              <button>

                View All Placements →

              </button>

            </div>

          </div>

        </div>

      </ScrollVideoSkeleton>

    </div>
  );
};

export default PlacementSection;