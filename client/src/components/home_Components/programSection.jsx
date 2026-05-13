import React, { useEffect, useState } from "react";
import { adminAPI } from "../../config/api";
import ScrollVideoSkeleton from "../commonComponents/ProgramSectionScroll";
import { Link } from "react-router-dom";

const Program = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await adminAPI.getProgram();
        const data = Array.isArray(res.data)
          ? res.data
          : res.data
            ? [res.data]
            : [];
        setSteps(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load program data.");
        setSteps([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSteps();
  }, []);

  // Professional loading state
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-800"></div>
          <p className="mt-4 text-sm text-gray-500 font-normal tracking-wide">
            Loading
          </p>
        </div>
      </div>
    );
  }

  // Professional error state
  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white">
        <div className="text-center max-w-sm px-6">
          <p className="text-sm text-gray-500 font-normal mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2  text-white text-xs font-medium tracking-wide transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!steps.length) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white">
        <p className="text-sm text-gray-400 font-normal">
          No program data available
        </p>
      </div>
    );
  }

  const first = steps[0];
  const headingText = first.subtext || "Learn more about our program";

  return (
    <>
      <ScrollVideoSkeleton
        videoSrc={first.video}
        end={4000}
        overlay={false}
        layout="split"
      >
        {/* Professional content container - clean, refined, enterprise ready */}
        <div className="relative z-[100] px-6 md:px-0">
          {" "}
          {/* Subtle label */}
          <div className="mb-5">
            <span className="text-[11px]  tracking-[0.2em] font-bold text-gray-400 uppercase">
              Our Program
            </span>
          </div>
          {/* Main heading - professional, clean, no gradients */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-[1.2] tracking-tight text-gray-900">
            {headingText}
          </h1>
          {/* Simple accent line */}
          <div className="mt-8 w-12 h-px bg-gray-300"></div>
          {/* Refined CTA */}
          <div className="">
            <Link
              to="/ourStory"
              className="
      btn
      bg-[#4A5CFF]
      hover:bg-[#4052f5]
      text-white
      border-none
      shadow-lg
      shadow-[#4A5CFF]/30
      items-center
      gap-2
      font-bold
      text-lg
      transition-all
      duration-300
      hover:scale-105
    "
            >
              Explore Our Program
            </Link>
          </div>
        </div>
      </ScrollVideoSkeleton>
    </>
  );
};

export default Program;
