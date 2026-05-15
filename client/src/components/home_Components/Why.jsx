import React, {
  useEffect,
  useRef,
} from "react";


import gsap from "gsap";


import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";


gsap.registerPlugin(
  ScrollTrigger
);


const cardsData = [
  {
    title:
      "WHY DO STUDENTS\nCHOOSE RICR?",
    bg: "#001f53",
  },


  {
    title:
      "INTERVIEW AND\nCAREER SUPPORT",
    bg: "#1d7df2",
  },


  {
    title:
      "PLACEMENT-FOCUSED\nTRAINING",
    bg: "#7c5cff",
  },


  {
    title:
      "REAL WORLD\nPROJECTS",
    bg: "#0ea76b",
  },


  {
    title:
      "DAILY CODING\nPRACTICE",
    bg: "#ff4f7b",
  },
];


const WhyRICRStackCards =
  () => {


    const sectionRef =
      useRef(null);


    const cardsRef =
      useRef([]);


    const pathRef =
      useRef(null);


    useEffect(() => {


      const cards =
        cardsRef.current;


      const path =
        pathRef.current;


      if (
        !cards.length ||
        !path
      )
        return;


      const ctx =
        gsap.context(() => {


          // =========================================
          // SVG PATH
          // =========================================


          const pathLength =
            path.getTotalLength();


          gsap.set(path, {


            strokeDasharray:
              pathLength,


            strokeDashoffset:
              pathLength,
          });


          // =========================================
          // INITIAL STACK
          // =========================================


          cards.forEach(
            (
              card,
              index
            ) => {


              if (!card)
                return;


              let y = 0;


              let scale = 1;


              let zIndex =
                100 - index;


              if (
                index === 0
              ) {


                y = 0;
                scale = 1;
              }


              else if (
                index === 1
              ) {


                y = 20;
                scale = 0.94;
              }


              else if (
                index === 2
              ) {


                y = 40;
                scale = 0.88;
              }


              else if (
                index === 3
              ) {


                y = 60;
                scale = 0.82;
              }


              else {


                y = 80;
                scale = 0.76;
              }


              gsap.set(card, {


                y,


                scale,


                opacity: 1,


                zIndex,


                transformOrigin:
                  "center center",
              });
            }
          );


          // =========================================
          // TIMELINE
          // =========================================


          const tl =
            gsap.timeline({


              scrollTrigger: {


                trigger:
                  sectionRef.current,


                start:
                  "top  top",


       end:
  `+=${cards.length * 400}`,


                scrub: 0.8,


                pin:
                  false,


                pinSpacing:
                  true  ,


                anticipatePin: 1,


                invalidateOnRefresh:
                  true,
              },
            });


          // =========================================
          // CARD ANIMATION
          // =========================================


          cards.forEach(
            (
              card,
              idx
            ) => {


              if (
                idx >=
                cards.length - 1
              )
                return;


              // SVG DRAW


              tl.to(
                path,


                {


                  strokeDashoffset:
                    pathLength -
                    (
                      pathLength *
                      (idx + 1)
                    ) /
                      cards.length,


                  ease:
                    "none",


                  duration: 1,
                },


                idx
              );


              // CURRENT CARD EXIT


              tl.to(
                cards[idx],


                {


         y: -220,


                  opacity: 0,


                  scale: 0.7,


                  duration: 1.2,


                  ease:
                    "power3.inOut",
                },


                idx
              );


              // NEXT CARD CENTER


              tl.to(
                cards[
                  idx + 1
                ],


                {


                  y: 0,


                  scale: 1,


                  duration: 1.2,


                  ease:
                    "power3.inOut",
                },


                idx
              );


              // THIRD CARD


              if (
                cards[
                  idx + 2
                ]
              ) {


                tl.to(
                  cards[
                    idx + 2
                  ],


                  {


                    y: 180,


                    scale:
                      0.94,


                    duration: 1.2,


                    ease:
                      "power3.inOut",
                  },


                  idx
                );
              }


              // FOURTH CARD


              if (
                cards[
                  idx + 3
                ]
              ) {


                tl.to(
                  cards[
                    idx + 3
                  ],


                  {


                    y: 320,


                    scale:
                      0.88,


                    duration: 1.2,


                    ease:
                      "power3.inOut",
                  },


                  idx
                );
              }


            }
          );


          // =========================================
          // FINAL SVG
          // =========================================


          tl.to(
            path,


            {


              strokeDashoffset: 0,


              ease: "none",


              duration: 0.8,
            },


            cards.length
          );


        }, sectionRef);


      ScrollTrigger.refresh();


      return () => {


        ctx.revert();


    
      };


    }, []);


    // =========================================
    // REF HELPER
    // =========================================


    const setCardRef =
      (
        el,
        index
      ) => {


        cardsRef.current[
          index
        ] = el;
      };


    return (




<section
  ref={sectionRef}

  className="
    relative
    w-full
    min-h-screen
    overflow-hidden
    bg-gradient-to-br
    from-[#f5f7fc]
    to-[#e9eef4]
    flex
    items-center
    justify-center
    z-30
  "
>


          {/* BG LIGHTS */}


          <div
            className="
              absolute
              inset-0
              overflow-hidden
              pointer-events-none
            "
          >


            <div
              className="
                absolute
                top-[20%]
                left-[-10%]
                w-[500px]
                h-[500px]
                rounded-full
                bg-blue-400/10
                blur-[120px]
              "
            />


            <div
              className="
                absolute
                bottom-[10%]
                right-[-5%]
                w-[600px]
                h-[600px]
                rounded-full
                bg-purple-500/10
                blur-[140px]
              "
            />


          </div>


          {/* SVG */}


          <svg
            className="
              absolute
              inset-0
              w-full
              h-full
              pointer-events-none
              z-0
            "
            viewBox="0 0 1920 1080"
            preserveAspectRatio="none"
          >


            <defs>


              <linearGradient
                id="lineGradient"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="0%"
              >


                <stop
                  offset="0%"
                  stopColor="#4254ff"
                  stopOpacity="1"
                />


                <stop
                  offset="40%"
                  stopColor="#4254ff"
                  stopOpacity="0.9"
                />


                <stop
                  offset="70%"
                  stopColor="#6c7eff"
                  stopOpacity="0.5"
                />


                <stop
                  offset="100%"
                  stopColor="#a5b2ff"
                  stopOpacity="0"
                />


              </linearGradient>


              <filter
                id="glow"
              >


                <feGaussianBlur
                  stdDeviation="6"
                  result="blur"
                />


                <feComposite
                  in="SourceGraphic"
                  in2="blur"
                  operator="over"
                />


              </filter>


            </defs>


            <path
              ref={pathRef}


              d="
                M 1880 0
                C 1890 180, 1800 280, 1650 360
                C 1500 440, 1320 340, 1360 180
                C 1400 20, 1650 40, 1720 220
                C 1790 420, 1540 640, 1220 660
                C 980 670, 860 620, 720 720
                C 580 820, 560 980, 340 1040
                C 180 1080, 80 1040, -100 920
              "


              fill="none"


              stroke="url(#lineGradient)"


              strokeWidth="14"


              strokeLinecap="round"


              strokeLinejoin="round"


              filter="url(#glow)"
            />


          </svg>


          {/* CARD WRAPPER */}


          <div
            className="
              relative
              z-20
              w-full
              max-w-[820px]
              h-[720px]
              mx-auto
              px-4
            "
          >


            {cardsData.map(
              (
                card,
                index
              ) => (


                <div
                  key={index}


                  ref={(el) =>
                    setCardRef(
                      el,
                      index
                    )
                  }


                  className="
                    absolute
                    left-1/2
                    top-1/2
                    w-full
                    md:w-[640px]
                    h-[340px]
                    rounded-[2rem]
                    shadow-2xl
                    -translate-x-1/2
                    -translate-y-1/2
                    flex
                    flex-col
                    items-center
                    justify-center
                    overflow-hidden
                    backdrop-blur-sm
                    border
                    border-white/30
                    will-change-transform
                  "


                  style={{


                    background:
                      card.bg,


                    boxShadow:
                      "0 25px 45px -12px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.2)",
                  }}
                >


                  {/* OVERLAY */}


                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-br
                      from-white/15
                      via-transparent
                      to-black/10
                    "
                  />


                  {/* TOP LINE */}


                  <div
                    className="
                      absolute
                      top-0
                      left-8
                      right-8
                      h-[2px]
                      bg-gradient-to-r
                      from-white/30
                      via-white/70
                      to-white/30
                    "
                  />


                  {/* CONTENT */}


                  <div
                    className="
                      relative
                      z-10
                      px-6
                      text-center
                    "
                  >


                    <h2
                      className="
                        text-white
                        whitespace-pre-line
                        text-3xl
                        sm:text-4xl
                        md:text-5xl
                        lg:text-6xl
                        font-bold
                        leading-[1.2]
                        tracking-tight
                        drop-shadow-lg
                      "
                    >
                      {card.title}
                    </h2>



                  </div>


                </div>
              )
            )}


          </div>


        </section>


    );
  };


export default
  WhyRICRStackCards;
