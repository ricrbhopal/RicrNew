import React, { useRef, useState, useEffect } from 'react';
import { FaLinkedin } from 'react-icons/fa';
// import API
import {adminAPI} from '../../config/api.js'; // adjust path if needed



const ExpertsSection = () => {
  const expertsSliderRef = useRef(null);
  const [isDraggingExperts, setIsDraggingExperts] = useState(false);
  const [startXExperts, setStartXExperts] = useState(0);
  const [scrollLeftExperts, setScrollLeftExperts] = useState(0);
  const [isPausedExperts, setIsPausedExperts] = useState(false);
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await adminAPI.getExperts();
        // Filter only experts with status "active"
        const activeExperts = res.data.filter(expert => expert.status === "active");
        setExperts(activeExperts);
      } catch (err) {
        setExperts([]);
      }
    };
    fetchExperts();
  }, []);

  // const duplicatedExperts = [...experts, ...experts, ...experts];
  const duplicatedExperts = experts;

  useEffect(() => {
    const slider = expertsSliderRef.current;
    if (!slider || isPausedExperts || isDraggingExperts) return;

    let animationId;
    const speed = 1;

    const autoScroll = () => {
      if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth) / 3 * 2) {
        slider.scrollLeft = slider.scrollWidth / 3;
      } else {
        slider.scrollLeft += speed;
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPausedExperts, isDraggingExperts]);

  const handleExpertsMouseDown = (e) => {
    setIsDraggingExperts(true);
    setStartXExperts(e.pageX - expertsSliderRef.current.offsetLeft);
    setScrollLeftExperts(expertsSliderRef.current.scrollLeft);
    setIsPausedExperts(true);
  };

  const handleExpertsMouseLeave = () => {
    setIsDraggingExperts(false);
    setIsPausedExperts(false);
  };

  const handleExpertsMouseUp = () => {
    setIsDraggingExperts(false);
    setIsPausedExperts(false);
  };

  const handleExpertsMouseMove = (e) => {
    if (!isDraggingExperts) return;
    e.preventDefault();
    const x = e.pageX - expertsSliderRef.current.offsetLeft;
    const walk = (x - startXExperts) * 2;
    expertsSliderRef.current.scrollLeft = scrollLeftExperts - walk;
  };

  const handleTouchStart = (e) => {
    setIsDraggingExperts(true);
    setStartXExperts(e.touches[0].pageX - expertsSliderRef.current.offsetLeft);
    setScrollLeftExperts(expertsSliderRef.current.scrollLeft);
    setIsPausedExperts(true);
  };

  const handleTouchMove = (e) => {
    if (!isDraggingExperts) return;
    const x = e.touches[0].pageX - expertsSliderRef.current.offsetLeft;
    const walk = (x - startXExperts) * 2;
    expertsSliderRef.current.scrollLeft = scrollLeftExperts - walk;
  };

  const handleTouchEnd = () => {
    setIsDraggingExperts(false);
    setIsPausedExperts(false);
  };

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
      <h1 className='text-5xl font-medium text-center mb-10 text-gray-900'>
        Industry Experts Guidance
      </h1>

      <p className='max-w-3xl mx-auto text-center text-gray-700 text-lg leading-relaxed px-4 sm:px-6 lg:px-8 mb-16'>
        Gain insights from seasoned professionals working in top-tier MNCs. Learn from their expertise to excel in your coding journey.
      </p>

      <div className='relative overflow-hidden py-8'>
        <div 
          ref={expertsSliderRef}
          className='flex space-x-8 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing'
          onMouseDown={handleExpertsMouseDown}
          onMouseLeave={handleExpertsMouseLeave}
          onMouseUp={handleExpertsMouseUp}
          onMouseMove={handleExpertsMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ scrollBehavior: isDraggingExperts ? 'auto' : 'smooth' }}
        >
          {duplicatedExperts.map((expert, index) => (
            <div
              key={index}
              className='flex-shrink-0 relative rounded-lg overflow-hidden group transition-all duration-300 hover:scale-105'
              style={{ width: '300px', height: '350px' }}
              onMouseEnter={() => setIsPausedExperts(true)}
              onMouseLeave={() => setIsPausedExperts(false)}
            >
              <div className='h-full w-full overflow-hidden'>
                <img
                  src={expert.img}
                  alt={expert.name}
                  className='h-full w-full object-cover rounded-lg'
                />
              </div>

              <div className='absolute bottom-0 left-0 right-0 bg-black/60 transform transition-all duration-500 ease-in-out group-hover:translate-y-0 translate-y-full h-1/2'>
                <div className='flex flex-col items-center text-center text-white h-full justify-end pb-4'>
                  <h3 className='text-xl font-bold mb-2'>{expert.name}</h3>
                  <p className='text-md font-medium mb-1'>{expert.role}</p>
                  <p className='text-sm opacity-90 mb-3'>{expert.company}</p>
                  <a
                    href={expert.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='inline-flex items-center justify-center p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200'
                  >
                    <FaLinkedin className='text-white text-lg' />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ExpertsSection;