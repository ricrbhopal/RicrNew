import React, { useState, useRef, useEffect } from 'react';
import Affiliation1 from '../../assets/Affiliation/Affiliation.webp'
import Affiliation2 from '../../assets/Affiliation/Affiliation2.webp';
import Affiliation3 from '../../assets/Affiliation/Affiliation3.webp';
import One from '../../assets/MNC/1.webp';
import Two from '../../assets/MNC/2.webp';
import Three from '../../assets/MNC/3.webp';
import Four from '../../assets/MNC/4.webp';
import Five from '../../assets/MNC/5.webp';
import Six from '../../assets/MNC/6.webp';
import Seven from '../../assets/MNC/7.webp';
import Eight from '../../assets/MNC/8.webp';

const Affiliation = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const sliderRef = useRef(null);
    const scrollInterval = useRef(null);
    const animationFrameRef = useRef(null);

    const affiliations = [
        { img: Affiliation1 },
        { img: Affiliation2 },
        { img: Affiliation3 },
    ];

    const cards = [
        { img: One },
        { img: Two },
        { img: Three },
        { img: Four },
        { img: Five },
        { img: Six },
        { img: Seven },
        { img: Eight },
    ];

    const startAutoScroll = () => {
        if (scrollInterval.current) return;

        const scroll = () => {
            if (sliderRef.current && !isPaused && !isDragging) {
                const slider = sliderRef.current;
                const scrollAmount = 1; // Adjust speed here
                
                slider.scrollLeft += scrollAmount;
                
                if (slider.scrollLeft >= slider.scrollWidth / 3) {
                    slider.scrollLeft = 0;
                }
            }
            animationFrameRef.current = requestAnimationFrame(scroll);
        };
        
        animationFrameRef.current = requestAnimationFrame(scroll);
    };

    const stopAutoScroll = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    };

    // Mouse drag functionality
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setIsPaused(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
        sliderRef.current.style.cursor = 'grabbing';
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            setIsPaused(false);
            if (sliderRef.current) {
                sliderRef.current.style.cursor = 'grab';
            }
        } else {
            setIsPaused(false);
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
            setIsPaused(false);
            if (sliderRef.current) {
                sliderRef.current.style.cursor = 'grab';
            }
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();

        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Drag sensitivity
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        setIsPaused(true);
        setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setIsPaused(false);
    };

    const handleWheel = (e) => {
        if (sliderRef.current) {
            e.preventDefault();
            sliderRef.current.scrollLeft += e.deltaY * 0.5;
        }
    };

    useEffect(() => {
        startAutoScroll();
        return () => {
            stopAutoScroll();
        };
    }, [isPaused, isDragging]);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft = 0;
        }
    }, []);

    // Responsive card sizes
    const getCardSize = () => {
        if (typeof window === 'undefined') return 'w-56';
        
        const width = window.innerWidth;
        if (width < 640) return 'w-48';    // mobile
        if (width < 768) return 'w-56';    // sm
        if (width < 1024) return 'w-64';   // md
        if (width < 1280) return 'w-72';   // lg
        return 'w-80';                     // xl
    };

    return (
        <div className='min-h-screen flex flex-col items-center px-4 sm:px-6 py-12 lg:py-16'>

            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-center text-black/90'>
                Affiliation & Accreditation
            </h1>

            <div className='w-full mt-8 py-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-15  md:gap-6 items-center justify-items-center max-w-4xl mx-auto'>
                    {affiliations.map((affiliation, index) => (
                        <img
                            key={index}
                            src={affiliation.img}
                            alt={`Affiliation ${index + 1}`}
                            className="h-20 sm:h-24 md:h-32 w-auto object-contain transition-transform duration-300 hover:scale-105"
                        />
                    ))}
                </div>
            </div>

            <div className='flex flex-col items-center mt-8 px-4 sm:px-6 lg:px-8 w-full'>
                <div className="flex items-center gap-3 text-xl sm:text-2xl mb-2 py-5">
                    <img src="/Starr.png" alt="star" className="h-8 w-8 sm:h-10 sm:w-10" />
                    <h2 className="text-orange-600 font-semibold">Crafting a Dazzling GitHub Portfolio</h2>
                </div>

                <p className='max-w-3xl text-center text-gray-700 mb-6 text-lg leading-relaxed'>
                    Craft a powerful portfolio to impress recruiters at top-tier companies—Unicorns, Global MNCs, and Hyper-Growth Startups—ensuring impactful career opportunities.
                </p>

             
                <div className="w-full max-w-7xl mt-12 relative">
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-hidden scrollbar-hide space-x-4 sm:space-x-6 lg:space-x-8 py-4 cursor-grab select-none"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={handleMouseLeave}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onWheel={handleWheel}
                        style={{
                            scrollBehavior: isDragging ? 'auto' : 'smooth',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            userSelect: 'none',
                            WebkitOverflowScrolling: 'touch'
                        }}
                    >
                        {[...cards, ...cards, ...cards].map((card, index) => (
                            <div
                                key={`card-${index}`}
                                className={`flex-shrink-0 ${getCardSize()} bg-white rounded-xl  overflow-hidden`}
                                style={{ 
                                    pointerEvents: isDragging ? 'none' : 'auto',
                                    minHeight: '200px'
                                }}
                            >
                                <img 
                                    src={card.img} 
                                    alt={`Showcase ${(index % cards.length) + 1}`} 
                                    className="w-full "
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>

                </div>

              
            </div>

           
        </div>
    );
};

export default Affiliation;