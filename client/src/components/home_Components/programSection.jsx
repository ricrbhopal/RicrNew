import React, { useEffect, useState } from "react";

import { adminAPI } from "../../config/api";

import ScrollVideoSkeleton from "../commonComponents/ScrollVideoSkeleton";

const Program = () => {
  const [steps, setSteps] = useState([]);

  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        console.error(err);

        setSteps([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, []);

  if (loading) return <div className="py-10 text-center">Loading...</div>;

  if (!steps.length) return <div className="py-10 text-center">No Data</div>;

  const first = steps[0];

  return (
    <>
   <div className="pt-20">
        <ScrollVideoSkeleton videoSrc={first.video} end={4000} overlay={true}>
          <div
            className="
          relative
          z-10
          w-full
          h-full
          flex
          items-center
          px-6
          md:px-16
        "
          >
            <p
              className="
            text-white
            text-xl
            md:text-3xl
            font-semibold
            max-w-3xl
            leading-relaxed
          "
            >
              {first.subtext}
            </p>
          </div>
        </ScrollVideoSkeleton>
      </div>
    </>
  );
};

export default Program;
