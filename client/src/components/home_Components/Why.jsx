import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaLaptopCode, FaBook, FaLightbulb, FaChalkboardTeacher, FaListUl, FaRocket, FaCode, FaHandshake } from "react-icons/fa";
import One from '../../assets/1.png'
import Two from '../../assets/2.png'
import { FaArrowRightLong } from "react-icons/fa6";

const items = [
    { key: 'book', icon: FaBook },
    { key: 'idea', icon: FaLightbulb },
    { key: 'teacher', icon: FaChalkboardTeacher },
    { key: 'list', icon: FaListUl },
    { key: 'rocket', icon: FaRocket },
    { key: 'code', icon: FaCode },
    { key: 'hand', icon: FaHandshake },
    { key: 'laptop', icon: FaLaptopCode },
];

const Why = () => {
    const [buttonActive, setButtonActive] = useState("book");
    const [isMobile, setIsMobile] = useState(false);
    const intervalRef = useRef(null);
    const radiusPercent = 38;

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const startAuto = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setButtonActive((prev) => {
                const idx = items.findIndex(i => i.key === prev);
                const next = (idx + 1) % items.length;
                return items[next].key;
            });
        }, 4000);
    };

    useEffect(() => {
        startAuto();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const handleClick = (key) => {
        setButtonActive(key);
        startAuto();
    };

    // Mobile-specific circular layout with smaller radius
    const getMobilePosition = (index, total) => {
        const radius = 30; // Smaller radius for mobile
        const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
        const xPercent = 50 + Math.cos(angle) * radius;
        const yPercent = 50 + Math.sin(angle) * radius;
        return { xPercent, yPercent };
    };

    // Desktop circular layout
    const getDesktopPosition = (index, total) => {
        const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
        const xPercent = 50 + Math.cos(angle) * radiusPercent;
        const yPercent = 50 + Math.sin(angle) * radiusPercent;
        return { xPercent, yPercent };
    };

    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl font-bold mb-2 py-3 sm:py-5"
            >
                <img 
                    src="/Starr.png" 
                    alt="star" 
                    className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" 
                />
                <h2 className="text-orange-600 text-base sm:text-lg md:text-xl">
                    Coding Excellence Awaits.
                </h2>
            </motion.div>

            {/* Title Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col text-center justify-center items-center mb-8 sm:mb-12 font-medium max-w-3xl gap-3 sm:gap-5 px-2"
            >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    Why Choose RICR
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
                    Unlock a world of coding possibilities with RICR's exceptional courses, expert mentors, and cutting-edge infrastructure. Your coding journey starts here.
                </p>
            </motion.div>

            {/* Circular Feature Selector & Content */}
            <div className="flex flex-col lg:flex-row items-center w-full max-w-6xl gap-6 sm:gap-8 lg:gap-12 xl:gap-20 mb-12 sm:mb-16">
                {/* Circular Button Container */}
                <div className="relative flex justify-center items-center w-full lg:w-1/2 mb-6 lg:mb-0">
                    <div className="relative w-56 sm:w-64 md:w-72 lg:w-80 xl:w-96 max-w-md" 
                         style={{ aspectRatio: '1 / 1' }}>
                        {items.map((it, i) => {
                            const { xPercent, yPercent } = isMobile 
                                ? getMobilePosition(i, items.length)
                                : getDesktopPosition(i, items.length);
                            
                            const Icon = it.icon;
                            const isActive = buttonActive === it.key;

                            return (
                                <motion.div
                                    key={it.key}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                                    style={{ 
                                        left: `${xPercent}%`, 
                                        top: `${yPercent}%`,
                                        zIndex: isActive ? 10 : 1
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    onClick={() => handleClick(it.key)}
                                    animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                >
                                    <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-full flex items-center justify-center shadow-lg border-2 ${
                                        isActive 
                                            ? 'bg-[#125785] border-[#0f4668]' 
                                            : 'bg-white border-gray-200 hover:border-gray-300'
                                    }`}>
                                        <Icon size={isMobile ? 20 : 24} className={isActive ? 'text-white' : 'text-gray-600'} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Content Display */}
                <motion.div
                    key={buttonActive}
                    initial={{ opacity: 0, x: isMobile ? 0 : 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative flex items-center w-full lg:w-1/2 px-2 sm:px-4"
                >
                    <div className="w-full max-w-lg mx-auto text-center lg:text-left">
                        {buttonActive === 'laptop' && (
                            <div className="leading-relaxed">
                                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#125785]">
                                    Real-Life Project Experience, Not Just Clones
                                </h3>
                                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                                    Immerse yourself in hands-on projects, gaining real-world coding experience beyond mere replication.
                                </p>
                            </div>
                        )}
                        {buttonActive === 'book' && (
                            <div className="leading-relaxed">
                                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#125785]">
                                    Expert-Led Coding Education
                                </h3>
                                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                                    Master coding skills under expert guidance for a transformative educational experience.
                                </p>
                            </div>
                        )}
                        {buttonActive === 'idea' && (
                            <div className="leading-relaxed">
                                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#125785]">
                                    Innovative Curriculum Design
                                </h3>
                                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                                    Engage with a cutting-edge curriculum designed to foster creativity and problem-solving.
                                </p>
                            </div>
                        )}
                        {buttonActive === 'teacher' && (
                            <div className="leading-relaxed">
                                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#125785]">
                                    Optimal Student-to-Teacher Ratio (36:2)
                                </h3>
                                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                                    Experience optimal learning with a balanced student-to-teacher ratio, fostering individualized attention and support.
                                </p>
                            </div>
                        )}
                        {buttonActive === 'list' && (
                            <div className="leading-relaxed">
                                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#125785]">
                                    Personalized Learning with Accessible Student Portal
                                </h3>
                                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                                    Tailor your learning journey through a user-friendly portal, ensuring a personalized and accessible education.
                                </p>
                            </div>
                        )}
                        {buttonActive === 'rocket' && (
                            <div className="leading-relaxed">
                                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#125785]">
                                    Your Pathway to Tech Careers
                                </h3>
                                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                                    Chart your course to a tech career with specialized programs and career-oriented guidance.
                                </p>
                            </div>
                        )}
                        {buttonActive === 'code' && (
                            <div className="leading-relaxed">
                                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#125785]">
                                    Diverse Range of Coding Languages
                                </h3>
                                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                                    Explore a diverse array of coding languages, broadening your technical expertise and versatility.
                                </p>
                            </div>
                        )}
                        {buttonActive === 'hand' && (
                            <div className="leading-relaxed">
                                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#125785]">
                                    Collaborative Learning Environment
                                </h3>
                                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                                    Thrive in a collaborative atmosphere, enhancing your coding skills through shared learning experiences.
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Web IDE Section */}
            <div className="flex flex-col lg:flex-row items-center w-full max-w-7xl gap-6 sm:gap-8 lg:gap-12 xl:gap-16 px-2 sm:px-4 py-8 sm:py-12 lg:py-16">
                {/* Image Section */}
                <div className='lg:w-1/2 w-full flex justify-center items-center order-2 lg:order-1'>
                    <img 
                        src="Code.webp" 
                        alt="Web IDE Illustration" 
                        className="max-w-full h-auto w-full max-w-md lg:max-w-lg xl:max-w-xl" 
                    />
                </div>
                
                {/* Content Section */}
                <div className='lg:w-1/2 w-full order-1 lg:order-2 mb-6 lg:mb-0'>
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl mb-3 sm:mb-4 py-1 sm:py-2"
                    >
                        <img 
                            src="/Starr.png" 
                            alt="star" 
                            className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" 
                        />
                        <h2 className="text-orange-600 text-sm sm:text-base md:text-lg">
                            Code Anywhere, Achieve Everywhere.
                        </h2>
                    </motion.div>

                    <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium pb-4 sm:pb-6 leading-tight'>
                        RICR Web IDE: Your Gateway to Seamless Coding Experience
                    </h1>
                    
                    <p className='text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed'>
                        Access top programming languages, code effortlessly online, and run your creations instantly with RICR's innovative Web IDE.
                    </p>

                    {/* Feature 1 */}
                    <div className='flex items-start py-3 sm:py-4'>
                        <div className='flex-shrink-0'>
                            <img 
                                src={One} 
                                alt="Multi-language support" 
                                className='w-12 sm:w-14 md:w-16 lg:w-20 pe-3 sm:pe-4' 
                            />
                        </div>
                        <div>
                            <h3 className='text-lg sm:text-xl md:text-2xl font-medium mb-1 sm:mb-2'>
                                Multi-Language Support
                            </h3>
                            <p className='text-gray-700 text-sm sm:text-base'>
                                Write code in your preferred language, from Python to JavaScript, our IDE supports a spectrum of programming languages.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className='flex items-start py-3 sm:py-4'>
                        <div className='flex-shrink-0'>
                            <img 
                                src={Two} 
                                alt="Instant code execution" 
                                className='w-12 sm:w-14 md:w-16 lg:w-20 pe-3 sm:pe-4' 
                            />
                        </div>
                        <div>
                            <h3 className='text-lg sm:text-xl md:text-2xl font-medium mb-1 sm:mb-2'>
                                Instant Code Execution
                            </h3>
                            <p className='text-gray-700 text-sm sm:text-base'>
                                Test and debug seamlessly—run your code instantly on the web for a rapid and efficient coding experience.
                            </p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='mt-6 sm:mt-8 inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#125785] hover:bg-[#0f4668] rounded-lg shadow-lg font-medium text-white transition-colors duration-300 text-sm sm:text-base w-full sm:w-auto justify-center'
                    >
                        Try Web IDE Now <FaArrowRightLong />
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default Why;