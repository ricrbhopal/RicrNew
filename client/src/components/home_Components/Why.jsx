import React, { useEffect, useState } from "react";
import {adminAPI} from "../../config/api";

const WhyRICR = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await adminAPI.getWhyRICR(); // ✅ UPDATED
        console.log("Fetched WhyRICR data:", res.data);

        const data = Array.isArray(res.data)
          ? res.data
          : res.data
          ? [res.data]
          : [];

        setSteps(data);
      } catch (err) {
        console.error("Error fetching WhyRICR:", err);
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
    <section className="w-full">

      {/* 🔥 BANNER */}
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden mt-10">

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

        {/* 🔥 TEXT */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <h2 className="text-white text-3xl md:text-5xl font-bold">
            {first.title || "Why RICR"}
          </h2>
        </div>

      </div>

    </section>
  );
};

export default WhyRICR;