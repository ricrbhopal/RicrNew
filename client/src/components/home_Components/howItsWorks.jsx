import React, { useEffect, useState } from "react";
import {adminAPI} from "../../config/api";

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
        console.error(err);
        setSteps([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!steps.length) return <div className="text-center py-10">No Data</div>;

  const first = steps[0]; 

  return (
<section className="w-full mt-20 overflow-hidden ">
  {/*  TITLE SECTION */}
  <div className="relative z-10 flex flex-col px-4 sm:px-6 md:px-8 lg:px-16 mt-2 mb-6">
    <div className="max-w-8xl mx-auto w-full">
   

      {/* Main Title */}
      <h2 className="text-[#125785] text-3xl md:text-4xl justify-center text-center mx-auto font-bold mb-4 leading-tight opacity-0 animate-slide-up">
        {first.title || "Default Title"}
      </h2>


    </div>
  </div>

  {/*  BANNER SECTION */}
  <div className="relative w-full max-w-[90%] sm:max-w-[85%] md:max-w-[90%] mx-auto mb-10 rounded-2xl h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] mt-6 overflow-hidden shadow-2xl group">
    
    {/* MEDIA (VIDEO or IMAGE) */}
    {first.mediaType === "video" ? (
      <video
        src={first.mediaUrl}
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
    ) : (
      <img
        src={first.mediaUrl}
        alt={first.title || "Banner image"}
        className="absolute w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
    )}

    {/*  ENHANCED OVERLAY with gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent rounded-2xl"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-2xl"></div>



    {/* Corner gradient effects */}
    <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-white/10 to-transparent rounded-tl-2xl"></div>
    <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tl from-white/10 to-transparent rounded-br-2xl"></div>
  </div>

  {/* Animation Styles */}
  <style jsx>{`
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
    
    .animate-slide-up {
      animation: slideUp 0.6s ease-out forwards;
    }
    
    .animate-slide-down {
      animation: slideDown 0.6s ease-out forwards;
    }
    
    .animate-ping {
      animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    
    @keyframes ping {
      75%, 100% {
        transform: scale(2);
        opacity: 0;
      }
    }
  `}</style>
</section>
  );
};

export default HowItWorks;