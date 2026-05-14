import React,
{
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";

import { ScrollTrigger }
from "gsap/ScrollTrigger";

import Image
from "../../assets/Mentor/image.jpg";

import "../css/meetOurMentors.css";

gsap.registerPlugin(
  ScrollTrigger
);

const MentorsPage = () => {

  const sectionRef =
    useRef(null);

  const imageRef =
    useRef(null);

  const pathRef =
    useRef(null);

  useLayoutEffect(() => {

    const ctx =
      gsap.context(() => {

        const path =
          pathRef.current;

        if (!path)
          return;

        // =====================================
        // PATH LENGTH
        // =====================================

        const pathLength =
          path.getTotalLength();

        // =====================================
        // INITIAL STATES
        // =====================================

        gsap.set(
          path,
          {
            strokeDasharray:
              pathLength,

            strokeDashoffset:
              pathLength,
          }
        );

        gsap.set(
          ".mentor-left",
          {
            x: -200,
            opacity: 0,
          }
        );

        gsap.set(
          ".mentor-right",
          {
            x: 200,
            opacity: 0,
          }
        );

        gsap.set(
          imageRef.current,
          {
            y: 120,
            scale: 0.85,
            opacity: 0,
          }
        );

        // =====================================
        // TIMELINE
        // =====================================

        const tl =
          gsap.timeline({

            scrollTrigger: {

              trigger:
                sectionRef.current,

              start:
                "top 60%",

              end:
                "+=1000",

              scrub: 1,
            },
          });

        // =====================================
        // SVG DRAW
        // =====================================

        tl.to(
          path,
          {
            strokeDashoffset: 0,

            ease: "none",
          },
          0
        );

        // =====================================
        // TEXT LEFT
        // =====================================

        tl.to(
          ".mentor-left",
          {
            x: 0,
            opacity: 1,
            ease: "power3.out",
          },
          0.05
        );

        // =====================================
        // TEXT RIGHT
        // =====================================

        tl.to(
          ".mentor-right",
          {
            x: 0,
            opacity: 1,
            ease: "power3.out",
          },
          0.1
        );

        // =====================================
        // IMAGE
        // =====================================

        tl.to(
          imageRef.current,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power3.out",
          },
          0.2
        );

      }, sectionRef);

    return () =>
      ctx.revert();

  }, []);

  return (

    <section
      ref={sectionRef}
      className="
        mentor-section
        relative
        overflow-hidden
        w-full
        py-10
        sm:py-14
        md:py-16
        px-4
        sm:px-6
        md:px-10
        flex
        flex-col
        items-center
        justify-center
      "
    >

      {/* SVG */}

<svg
  className="mentor-svg-line"
  viewBox="0 0 1200 1200"
  preserveAspectRatio="none"
>

  <defs>

    <linearGradient
      id="mentorGradient"
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%"
    >

         <stop offset="0%" stopColor="#4254ff" stopOpacity="0" />
      <stop offset="50%" stopColor="#6d7cff" stopOpacity="1" />
      <stop offset="100%" stopColor="#4254ff" stopOpacity="1" />

    </linearGradient>

  </defs>

  <path
    ref={pathRef}
    className="mentor-path"
    d="
      M -100 -100

      C -100 -100,
        80 220,
        180 320

      C 260 400,
        360 470,
        470 520

      C 540 560,
        560 650,
        540 760

      C 510 850,
        430 900,
        330 890

      C 220 880,
        150 820,
        120 720

      C 90 610,
        100 500,
        170 420

      C 250 330,
        360 320,
        470 330

      C 560 340,
        650 410,
        760 520

      C 860 620,
        930 700,
        1020 720

      C 1100 730,
        1160 780,
        1180 900

      C 1190 1010,
        1230 1110,
        1310 1160
    "
  />

</svg>
      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-7xl
        "
      >

        {/* HEADING */}

        <div
          className="
            mb-10
            md:mb-14
          "
        >

          <h2
            className="
              heading
              mentor-left
            "
          >
            Learn from people
            who’ve worked
            in the industry
          </h2>

          <p
            className="
              paragraph
              mentor-right
            "
          >
            Our mentors bring
            real-world experience,
            not just textbook
            knowledge.
          </p>

        </div>

        {/* IMAGE */}

        <div
          ref={imageRef}
          className="
            relative
            overflow-hidden
            rounded-2xl
            shadow-lg
            
          "
        >

          <img
            src={Image}
            alt="Mentors"
            className="
              w-full
              h-[220px]
              sm:h-[300px]
              md:h-[420px]
              lg:h-[520px]
              xl:h-[560px]
              object-cover
              transition-transform
              duration-500
              ease-out
              hover:scale-[1.03]
              will-change-transform
              mt-15
            "
          />

        </div>

      </div>

    </section>
  );
};

export default MentorsPage;