import React, {
  useEffect,
  useState,
} from "react";

import { adminAPI }
from "../../config/api";

import ScrollVideoSkeleton
from "../commonComponents/ScrollVideoSkeleton";

const Program = () => {

  const [
    steps,
    setSteps,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  // ========================================
  // FETCH
  // ========================================

  useEffect(() => {

    const fetchSteps =
      async () => {

        try {

          const res =
            await adminAPI.getProgram();

          console.log(
            "Program Data:",
            res.data
          );

          const data =
            Array.isArray(
              res.data
            )
              ? res.data
              : res.data
              ? [res.data]
              : [];

          setSteps(data);

        } catch (err) {

          console.error(
            "Error fetching Program:",
            err
          );

          setSteps([]);

        } finally {

          setLoading(false);
        }
      };

    fetchSteps();

  }, []);

  // ========================================
  // LOADING
  // ========================================

  if (loading)
    return (
      <div
        className="
          text-center
          py-10
        "
      >
        Loading...
      </div>
    );

  // ========================================
  // NO DATA
  // ========================================

  if (!steps.length)
    return (
      <div
        className="
          text-center
          py-10
        "
      >
        No Data
      </div>
    );

  // ========================================
  // FIRST ITEM
  // ========================================

  const first =
    steps[0];

  return (
<>



<div className="">

  <ScrollVideoSkeleton
  videoSrc={first.video}
  end={5000}
  navbarClass=".main-navbar"
  height="100vh"
  scrubSpeed={0.2}
  overlay={true}
  className=" mt-30 "
>

  <div
    className="
      relative
      z-10
      w-full
      h-full
      flex
      flex-col
    mt-20
    "
  >



    {/* SUBTEXT */}

    <p
      className="
        mt-5
        text-black
        text-lg
        md:text-2xl
        max-w-2xl

        md:ml-3
      
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