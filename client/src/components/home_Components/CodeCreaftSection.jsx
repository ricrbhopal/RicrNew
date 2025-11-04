import React, { useEffect, useState, useRef } from 'react';
import { adminAPI } from '../../config/api';

const CodeCraftSection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // slider state
  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getAllPortfolio();
      setImages(res.data || []);
    } catch (err) {
      console.warn('Failed to load portfolio images', err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll loop with mobile optimization
  const startAutoScroll = () => {
    if (animationRef.current) return;
    const step = () => {
      const slider = sliderRef.current;
      if (slider && !isPaused && !isDragging) {
        const scrollAmount = isMobile ? 0.4 : 0.6;
        slider.scrollLeft += scrollAmount;
        if (slider.scrollLeft >= slider.scrollWidth / 3) {
          slider.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(step);
    };
    animationRef.current = requestAnimationFrame(step);
  };

  const stopAutoScroll = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  useEffect(() => {
    // Start auto-scroll only when there are more than 3 items (i.e. 4+)
    if (images.length > 3) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
    return () => stopAutoScroll();
  }, [images.length, isPaused, isDragging, isMobile]);

  // Drag / touch handlers with mobile optimization
  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.clientX);
    setScrollStart(sliderRef.current.scrollLeft || 0);
    sliderRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = (x - startX) * (isMobile ? 0.8 : 1.2);
    sliderRef.current.scrollLeft = scrollStart - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
    if (sliderRef.current) sliderRef.current.style.cursor = 'grab';
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => { if (!isDragging) setIsPaused(false); };

  const handleTouchStart = (e) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.touches[0].clientX);
    setScrollStart(sliderRef.current.scrollLeft || 0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    const x = e.touches[0].clientX;
    const walk = (x - startX) * (isMobile ? 0.8 : 1.2);
    sliderRef.current.scrollLeft = scrollStart - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  if (loading) {
    return (
      <section className="py-16 flex flex-col items-center bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-2xl w-full mx-auto text-center mb-8">
          <h2 className="text-3xl font-extrabold mb-2 text-blue-900">Crafting a Dazzling GitHub Portfolio</h2>
          <p className="text-lg text-gray-700 mb-1">Craft a powerful portfolio to impress recruiters at top-tier companies—Unicorns, Global MNCs, and Hyper-Growth Startups—ensuring impactful career opportunities.</p>
        </div>
        <div className="flex flex-col items-center py-12 gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="text-lg text-gray-600">Loading portfolio...</span>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="py-16 flex flex-col items-center bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-2xl w-full mx-auto text-center mb-8">
          <h2 className="text-3xl font-extrabold mb-2 text-blue-900">Crafting a Dazzling GitHub Portfolio</h2>
          <p className="text-lg text-gray-700 mb-1">Craft a powerful portfolio to impress recruiters at top-tier companies—Unicorns, Global MNCs, and Hyper-Growth Startups—ensuring impactful career opportunities.</p>
        </div>
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200 max-w-md mx-4">
          <div className="max-w-md mx-auto px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Portfolio Images</h3>
            <p className="text-gray-600">
              Portfolio showcase will be displayed here soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 flex flex-col items-center bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-2xl w-full mx-auto text-center mb-8 px-4">
        <h2 className="text-3xl font-extrabold mb-2 text-blue-900">Crafting a Dazzling GitHub Portfolio</h2>
        <p className="text-lg text-gray-700 mb-1">Craft a powerful portfolio to impress recruiters at top-tier companies—Unicorns, Global MNCs, and Hyper-Growth Startups—ensuring impactful career opportunities.</p>
      </div>

      {/* Portfolio Images Section */}
      <div className="w-full max-w-6xl mx-auto px-4">
        {images.length <= 3 ? (
          // Static grid for 3 or fewer images
          <div className={`grid grid-cols-1 ${images.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'} lg:grid-cols-${images.length} gap-6 sm:gap-8 items-center justify-items-center max-w-4xl mx-auto`}>
            {images.map((image, index) => (
              <div 
                key={index}
                className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105 w-full max-w-xs sm:max-w-sm"
              >
                <img
                  src={image.image}
                  alt={`Portfolio ${index + 1}`}
                      className="w-full h-36 sm:h-40 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : (
          // Enhanced slider view for 3+ images
          <div className="relative group">
            {/* Gradient Overlays - Hide on mobile for better space utilization */}
            <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-12 lg:w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
            <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-12 lg:w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
            
            <div
              ref={sliderRef}
              className="flex gap-4 sm:gap-6 lg:gap-8 xl:gap-12 overflow-x-hidden whitespace-nowrap py-4 sm:py-6 lg:py-8 px-2 sm:px-4 scrollbar-hide"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ cursor: isMobile ? 'default' : 'grab' }}
            >
              {/* Triplicate items for seamless looping */}
              {[...images, ...images, ...images].map((image, idx) => (
                <div 
                  key={`slide-${idx}`} 
                  className="inline-flex flex-shrink-0 px-2 sm:px-3 lg:px-4 xl:px-6"
                >
                  <div className="bg-white w-[300px]  rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 ">
                    <img
                      src={image.image}
                      alt={`Portfolio ${(idx % images.length) + 1}`}
                      className="w-full h-28 sm:h-32 lg:h-36 xl:h-40 object-contain rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator - Only show for slider mode (4+ items) */}
            {images.length > 3 && (
              <div className="flex justify-center mt-4 sm:mt-6">
                <div className="flex space-x-1 sm:space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      !isPaused ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  ></div>
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      !isPaused ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  ></div>
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      !isPaused ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  ></div>
                </div>
              </div>
            )}

            {/* Mobile Instructions */}
            {isMobile && images.length > 3 && (
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">Swipe to view more</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Decorative gradient circles */}
      <div className="fixed -top-10 -left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-2xl pointer-events-none"></div>
      <div className="fixed -bottom-10 -right-10 w-20 h-20 bg-purple-200/30 rounded-full blur-2xl pointer-events-none"></div>
    </section>
  );
};

export default CodeCraftSection;