
import React, { useEffect, useState } from "react";
import { adminAPI } from "../../config/api";
import ScrollVideoSkeleton from "../commonComponents/ScrollVideoSkeleton";

const HowItWorks = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await adminAPI.getHowItWork();
        const data = Array.isArray(res.data) 
          ? res.data 
          : res.data 
            ? [res.data] 
            : [];
        setSteps(data);
      } catch (err) {
        console.error("Error fetching steps:", err);
        setSteps([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, []);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ================= EMPTY =================
  if (!steps.length) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">No content available</p>
      </div>
    );
  }

  return (
    <section className="w-full pt-25">
      <div className="w-full ">
        {steps.map((step, idx) => {
          // ================= VIDEO SECTION =================
          if (step.mediaType === "video" && step.mediaUrl) {
            return (
              <div key={step._id || idx} className=" w-full">
                <ScrollVideoSkeleton
                  videoSrc={step.mediaUrl}
                  end={4000}
                  overlay={false}
                  
            
                  object="contain"
                >

                </ScrollVideoSkeleton>
              </div>
            );
          }

          // ================= IMAGE SECTION =================
          if (step.mediaType === "image" && step.mediaUrl) {
            return (
              <section
                key={step._id || idx}
                className="relative w-full h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden bg-black"
              >
                <img
                  src={step.mediaUrl}
                  alt={step.title || "Banner"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-20 h-full flex items-center justify-center text-center px-4 sm:px-6 md:px-10">
                  <div className="max-w-5xl">
                    <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                      {step.title}
                    </h1>
                    {step.description && (
                      <p className="text-white/90 text-base sm:text-lg md:text-2xl mt-5 md:mt-8 leading-relaxed">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
};

export default HowItWorks;