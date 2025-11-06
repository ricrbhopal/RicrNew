import React, { useEffect, useRef, useState } from 'react';
import { adminAPI } from '../../config/api';
import { FaStar } from "react-icons/fa6";
import { MdOutlineArrowForward } from "react-icons/md";
import { motion } from "framer-motion";

const Hero = () => {
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const [media, setMedia] = useState({ url: '/HeroVideo.mp4', mediaType: 'video', thumbnail: '' });
  const [mediaError, setMediaError] = useState(false);
  const [mediaList, setMediaList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Animations
  const fadeInRight = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  const buttonVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: 1, duration: 0.5, ease: "easeOut" } }
  };

  // Helper to guess if a URL is a video
  const isVideoUrl = (url = '') => {
    if (!url) return false;
    const lower = url.toLowerCase();
    // common video extensions + Cloudinary video path heuristic
    return /\.(mp4|webm|ogg|mov|m3u8)(\?.*)?$/i.test(lower) || lower.includes('/video/upload/');
  };

  // Fetch hero media from backend
  useEffect(() => {
    let cancelled = false;
    const fetchMedia = async () => {
      try {
        const res = await adminAPI.getHero();
        if (cancelled) return;
        if (res && res.data) {
          const data = res.data;
          console.log('getHero response data:', data);

          const list = [];

          // If backend returns a videos array
          if (Array.isArray(data.videos) && data.videos.length > 0) {
            for (const item of data.videos) {
              const videoUrl =
                (item.backgroundVideo && item.backgroundVideo.trim()) ||
                (item.url && item.url.trim()) ||
                (item.secure_url && item.secure_url.trim()) ||
                (item.image && item.image.trim()) ||
                '';
              if (!videoUrl) continue;
              const mediaType = (item.mediaType && item.mediaType.toLowerCase()) ||
                (isVideoUrl(videoUrl) ? 'video' : 'image');
              list.push({ url: videoUrl, mediaType, thumbnail: item.thumbnail || item.poster || '' });
            }
          }

          // hero.backgroundVideo (some backends put it under hero)
          if (data.hero && data.hero.backgroundVideo) {
            const url = data.hero.backgroundVideo;
            const mediaType = (data.hero.mediaType && data.hero.mediaType.toLowerCase()) || (isVideoUrl(url) ? 'video' : 'image');
            list.push({ url, mediaType, thumbnail: data.hero.thumbnail || '' });
          }

          // generic backgroundVideo field
          if (data.backgroundVideo) {
            const url = data.backgroundVideo;
            const mediaType = (data.mediaType && data.mediaType.toLowerCase()) || (isVideoUrl(url) ? 'video' : 'image');
            list.push({ url, mediaType, thumbnail: data.thumbnail || '' });
          }

          // Remove duplicates while preserving order
          const unique = [];
          const seen = new Set();
          for (const it of list) {
            if (!it.url || seen.has(it.url)) continue;
            seen.add(it.url);
            unique.push(it);
          }

          // Prefer videos first (optional)
          unique.sort((a, b) => {
            if (a.mediaType === b.mediaType) return 0;
            return a.mediaType === 'video' ? -1 : 1;
          });

          if (unique.length > 0) {
            setMediaList(unique);
            setActiveIndex(0);
            setMedia(unique[0]);
            setMediaError(false);
          } else {
            console.warn('No hero media found (backend returned none or only images).');
            // fallback: if backend gave an image, show it
            if (data.backgroundVideo && !isVideoUrl(data.backgroundVideo)) {
              setMedia({ url: data.backgroundVideo, mediaType: 'image', thumbnail: data.thumbnail || '' });
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch hero/videos', err);
      }
    };

    fetchMedia();
    return () => { cancelled = true; };
  }, []);

  // Rotate media every 8 seconds if multiple items exist
  useEffect(() => {
    // clean previous interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (!Array.isArray(mediaList) || mediaList.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((idx) => {
        const next = (idx + 1) % mediaList.length;
        setMedia(mediaList[next]);
        return next;
      });
    }, 8000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [mediaList]);

  // When media changes and is a video, ensure it loads and tries to play (muted)
  useEffect(() => {
    if (!media) return;
    setMediaError(false);
    if (media.mediaType === 'video' && videoRef.current) {
      try {
        // Calling load ensures new <source> is loaded
        // Note: if src is not a video (e.g. .jpg), this may trigger error — we guard with isVideoUrl earlier
        videoRef.current.load();
        const playPromise = videoRef.current.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise.catch((e) => {
            // Autoplay could be blocked by browser policies despite muted — log but don't crash
            console.log('Autoplay blocked or play failed:', e);
          });
        }
      } catch (e) {
        console.error('Error while trying to load/play hero video', e);
      }
    }
  }, [media]);

  // Fallback handler for img/video errors
  const handleMediaError = () => {
    setMediaError(true);
    console.warn('Hero media failed to load:', media && media.url);
  };

  return (
    <section className='relative min-h-screen flex items-center overflow-hidden mt-18'>
      {/* Background media */}
      {media && media.mediaType === 'image' ? (
        <img
          className='absolute inset-0 w-full h-full object-cover'
          src={mediaError ? '/fallback-hero.jpg' : media.url}
          alt='Hero background'
          loading='lazy'
          onError={handleMediaError}
          aria-hidden='true'
        />
      ) : (
        <video
          ref={videoRef}
          className='absolute inset-0 w-full h-full object-cover'
          autoPlay
          loop
          muted
          playsInline
          preload='metadata'
          poster={media && media.thumbnail ? media.thumbnail : ''}
          aria-hidden='true'
          onCanPlay={() => console.log('Hero video can play:', media && media.url)}
          onError={(e) => { console.error('Hero video error', e); handleMediaError(); }}
        >
          {media && media.url && (
            <source
              src={media.url}
              type={media.url.toLowerCase().endsWith('.webm') ? 'video/webm' : 'video/mp4'}
            />
          )}
          Your browser does not support the video tag.
        </video>
      )}

      {/* Gradient overlay to improve text legibility */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/30'></div>

      {/* Content */}
      <motion.div
        className='relative z-10 max-w-6xl mx-6 md:ps-20 ps-10 lg:mx-0 w-full md:w-1/2 flex flex-col items-start gap-8 text-white'
        initial="hidden"
        animate="visible"
        variants={fadeInRight}
      >
        <div className='flex-1'>
          <motion.div className='inline-flex items-center gap-3 mb-4' variants={fadeInRight}>
            <div className='h-12 w-12 rounded-lg flex justify-center items-center bg-gradient-to-r from-[#ff7350] to-[#ff9a6b] shadow-lg'>
              <FaStar size={22} />
            </div>
            <div>
              <p className='text-sm md:text-base font-semibold opacity-90'>Embark Today</p>
              <p className='text-xs md:text-sm opacity-80'>Fuel your Coding Journey</p>
            </div>
          </motion.div>

          <motion.h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 bg-clip-text text-white'
            variants={fadeInRight} transition={{ delay: 0.2 }}>
            Unlock Your Potential at RICR
          </motion.h1>

          <motion.p className='text-sm md:text-lg max-w-xl text-white/90 mb-6' variants={fadeInRight} transition={{ delay: 0.4 }}>
            Unlock the potential of your college journey with expert coding guidance at RICR. Elevate your skills for a future in robotics and technology.
          </motion.p>

          <motion.div className='flex flex-col sm:flex-row gap-3 sm:gap-4' variants={buttonVariant}>
            <button aria-label='Book a demo' className='group inline-flex items-center gap-2 px-6 py-3 bg-[#125785] hover:bg-[#0f4668] rounded-lg shadow-md font-medium transition transform hover:-translate-y-0.5'>
              Book A Demo
              <MdOutlineArrowForward className='text-lg transition-transform group-hover:translate-x-1' />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
