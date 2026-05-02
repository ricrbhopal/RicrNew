import React, { useEffect, useRef } from "react";
import Video from "../../assets/DataType.mp4";

function MakeOurMentors() {
  const videoRef = useRef(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});

    const handleWheel = (e) => {
      if (!video.duration) return;

      let newProgress = progressRef.current + e.deltaY * 0.0008;

      if (newProgress < 0) newProgress = 0;
      if (newProgress > 1) newProgress = 1;

      //  CONDITION: lock only when inside range
      const isAtStart = newProgress <= 0;
      const isAtEnd = newProgress >= 1;

      if (!isAtStart && !isAtEnd) {
        e.preventDefault(); //  lock scroll
        video.pause();
      } else {
      
        video.play().catch(() => {});
        return;
      }

      progressRef.current = newProgress;

      video.currentTime = video.duration * newProgress;
    };

    //  MOBILE SUPPORT
    let startY = 0;

    const touchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const touchMove = (e) => {
      if (!video.duration) return;

      const delta = startY - e.touches[0].clientY;

      let newProgress = progressRef.current + delta * 0.001;

      if (newProgress < 0) newProgress = 0;
      if (newProgress > 1) newProgress = 1;

      const isAtStart = newProgress <= 0;
      const isAtEnd = newProgress >= 1;

      if (!isAtStart && !isAtEnd) {
        e.preventDefault();
        video.pause();
      } else {
        video.play().catch(() => {});
        return;
      }

      progressRef.current = newProgress;

      video.currentTime = video.duration * newProgress;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchmove", touchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        className="w-[100%] mx-auto mt-15 h-[70vh] rounded-2xl object-cover"
        muted
        playsInline
        autoPlay
        loop
      >
        <source src={Video} type="video/mp4" />
      </video>
    </div>
  );
}

export default MakeOurMentors;