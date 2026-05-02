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
    <section className="w-full  mt-15">

{/* 🔥 TEXT */}
<div className="h-full w-[90%] text-center mx-auto flex items-center justify-center">
  <h2 className="text-[#125785] text-3xl md:text-4xl font-bold">
    {first.title || "Why RICR"}
  </h2>
</div>

      {/* 🔥 BANNER */}
      <div className="relative w-[90%] justify-center mx-auto rounded-2xl h-[60vh] md:h-[80vh] overflow-hidden mt-10">

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



      </div>

    </section>
  );
};

export default WhyRICR;