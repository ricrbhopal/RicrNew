import React, { useEffect, useState } from "react";
import {adminAPI} from "../../config/api";

const HowItWorks = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await adminAPI.getHowItWork(); // ✅ UPDATED

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

  const first = steps[0]; // 🔥 main banner data

  return (
    <section className="w-full">

      {/* 🔥 DYNAMIC TITLE (REPLACED STATIC TEXT) */}
      {/* <div className="max-w-6xl mx-auto mt-10 px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold text-black">
          {first.title || "Default Title"}
        </h2>
      </div> */}

      {/* 🔥 BANNER */}
      <div className="relative w-full h-[60vh] md:h-[80vh] mt-6 overflow-hidden">

        {first.mediaType === "video" ? (
          <video
            src={first.mediaUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
          />
        ) : (
          <img
            src={first.mediaUrl}
            alt={first.title}
            className="absolute w-full h-full object-cover"
          />
        )}

        {/* 🔥 OVERLAY */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* 🔥 TEXT ON VIDEO */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-4">
            {first.title}
          </h2>

     
        </div>
      </div>



    </section>
  );
};

export default HowItWorks;