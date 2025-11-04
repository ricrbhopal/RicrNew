import React, { useState, useEffect, useRef } from 'react';
import { adminAPI } from '../../config/api.js';

const Affiliation = () => {
    const [remoteAffiliations, setRemoteAffiliations] = useState([]);
    const [loadingRemote, setLoadingRemote] = useState(false);

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
        const fetchRemote = async () => {
            setLoadingRemote(true);
            try {
                const res = await adminAPI.getAffiliations();
                const all = res.data || [];
                const activeOnly = all.filter(i => i.status === 'active');
                setRemoteAffiliations(activeOnly.map(a => ({ img: a.image })));
            } catch (e) {
                console.warn('Failed to load remote affiliations', e);
                setRemoteAffiliations([]);
            } finally {
                setLoadingRemote(false);
            }
        };

        fetchRemote();
    }, []);

    // Auto-scroll loop with mobile optimization
    const startAutoScroll = () => {
        if (animationRef.current) return;
        const step = () => {
            const slider = sliderRef.current;
            if (slider && !isPaused && !isDragging) {
                const scrollAmount = isMobile ? 0.4 : 0.6; // Slower on mobile
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
        if (remoteAffiliations.length > 3) {
            startAutoScroll();
        } else {
            stopAutoScroll();
        }
        return () => stopAutoScroll();
    }, [remoteAffiliations.length, isPaused, isDragging, isMobile]);

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
        const walk = (x - startX) * (isMobile ? 0.8 : 1.2); // Less sensitive on mobile
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                        Affiliation & Accreditation
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                        Recognized by leading educational bodies and industry partners worldwide
                    </p>
                </div>

                {/* Affiliations Slider Section */}
                <div className="mb-16 sm:mb-20">
                    {loadingRemote ? (
                        <div className="flex flex-col sm:flex-row justify-center items-center py-12 sm:py-16 gap-4">
                            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
                            <span className="text-base sm:text-lg text-gray-600">Loading affiliations...</span>
                        </div>
                    ) : remoteAffiliations.length === 0 ? (
                        <div className="text-center py-12 sm:py-16 bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-200 mx-2 sm:mx-0">
                            <div className="max-w-md mx-auto px-4">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Affiliations Available</h3>
                                <p className="text-gray-600">
                                    Our accreditation partners will be displayed here soon.
                                </p>
                            </div>
                        </div>
                    ) : remoteAffiliations.length <= 3 ? (
                        <div className={`grid grid-cols-1 ${remoteAffiliations.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'} lg:grid-cols-${remoteAffiliations.length} gap-6 sm:gap-8 items-center justify-items-center max-w-4xl mx-auto px-4`}>
                            {remoteAffiliations.map((affiliation, index) => (
                                <div 
                                    key={index}
                                    className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105 w-full max-w-xs sm:max-w-sm"
                                >
                                    <img
                                        src={affiliation.img}
                                        alt={`Affiliation ${index + 1}`}
                                        className="h-14 sm:h-16 lg:h-20 w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Enhanced slider view for 3+ images
                        <div className="relative group">
                            {/* Gradient Overlays - Hide on mobile for better space utilization */}
                            <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-12 lg:w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
                            <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-12 lg:w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
                            
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
                                {[...remoteAffiliations, ...remoteAffiliations, ...remoteAffiliations].map((affiliation, idx) => (
                                    <div 
                                        key={`slide-${idx}`} 
                                        className="inline-flex flex-shrink-0 px-2 sm:px-3 lg:px-4 xl:px-6"
                                    >
                                        <div className="bg-white p-3 sm:p-4 lg:p-6 xl:p-8 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-[120px] sm:min-w-[150px] lg:min-w-[180px] xl:min-w-[220px]">
                                            <img
                                                src={affiliation.img}
                                                alt={`Affiliation ${(idx % remoteAffiliations.length) + 1}`}
                                                className="h-12 sm:h-14 lg:h-16 xl:h-20 w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Scroll Indicator - Only show for slider mode (4+ items) */}
                            {remoteAffiliations.length > 3 && (
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
                            {isMobile && remoteAffiliations.length > 3 && (
                                <div className="text-center mt-4">
                                    <p className="text-sm text-gray-500">Swipe to view more</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Affiliation;