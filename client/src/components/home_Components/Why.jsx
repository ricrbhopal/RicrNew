import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaLaptopCode, FaBook, FaLightbulb, FaChalkboardTeacher, FaListUl, FaRocket, FaCode, FaHandshake, FaPlay, FaPause } from "react-icons/fa";
import One from '../../assets/1.png'
import Two from '../../assets/2.png'
import { FaArrowRightLong } from "react-icons/fa6";

const items = [
    { 
        key: 'book', 
        icon: FaBook,
        title: "Expert-Led Coding Education",
        description: "Master coding skills under industry experts with years of real-world experience and teaching excellence.",
        color: "#2563eb"
    },
    { 
        key: 'idea', 
        icon: FaLightbulb,
        title: "Innovative Curriculum Design",
        description: "Cutting-edge curriculum updated regularly to match industry demands and technological advancements.",
        color: "#d97706"
    },
    { 
        key: 'teacher', 
        icon: FaChalkboardTeacher,
        title: "Optimal Learning Ratio",
        description: "Personalized attention with optimal student-teacher ratio ensuring individual growth and support.",
        color: "#059669"
    },
    { 
        key: 'list', 
        icon: FaListUl,
        title: "Personalized Learning Portal",
        description: "AI-powered learning paths and progress tracking tailored to your pace and learning style.",
        color: "#7c3aed"
    },
    { 
        key: 'rocket', 
        icon: FaRocket,
        title: "Career Acceleration Program",
        description: "From learning to earning - dedicated placement support and career guidance programs.",
        color: "#dc2626"
    },
    { 
        key: 'code', 
        icon: FaCode,
        title: "Full-Stack Development Focus",
        description: "Master both frontend and backend technologies with industry-relevant project experience.",
        color: "#4f46e5"
    },
    { 
        key: 'hand', 
        icon: FaHandshake,
        title: "Industry Partnerships",
        description: "Direct connections with tech companies for internships and job opportunities.",
        color: "#0d9488"
    },
    { 
        key: 'laptop', 
        icon: FaLaptopCode,
        title: "Real-World Project Experience",
        description: "Build portfolio-worthy projects that solve real problems and impress employers.",
        color: "#ea580c"
    },
];

const Why = () => {
    const [activeFeature, setActiveFeature] = useState("book");
    const [isMobile, setIsMobile] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);
    const intervalRef = useRef(null);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const startAutoPlay = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (!autoPlay) return;
        
        intervalRef.current = setInterval(() => {
            setActiveFeature((prev) => {
                const currentIndex = items.findIndex(item => item.key === prev);
                const nextIndex = (currentIndex + 1) % items.length;
                return items[nextIndex].key;
            });
        }, 4000);
    };

    useEffect(() => {
        startAutoPlay();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [autoPlay]);

    const handleFeatureClick = (key) => {
        setActiveFeature(key);
        startAutoPlay();
    };

    const toggleAutoPlay = () => {
        setAutoPlay(!autoPlay);
    };

    const currentItem = items.find(item => item.key === activeFeature);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                viewport={{ once: true, margin: "-50px" }}
                className="text-center max-w-4xl mx-auto mb-16 sm:mb-20"
            >
                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6"
                >
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    <span className="text-blue-700 font-semibold text-sm">
                        WHY CHOOSE RICR
                    </span>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight"
                >
                    Transform Your Coding
                    <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Journey with Excellence
                    </span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto"
                >
                    Join India's premier coding academy where innovation meets education. 
                    Experience world-class mentorship, industry-relevant curriculum, and 
                    career-focused learning.
                </motion.p>
            </motion.div>

            {/* Main Features Section */}
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:w-2/5"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {items.map((item, index) => {
                                const isActive = activeFeature === item.key;
                                
                                return (
                                    <motion.button
                                        key={item.key}
                                        onClick={() => handleFeatureClick(item.key)}
                                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left group ${
                                            isActive 
                                                ? 'border-blue-500 bg-white shadow-lg shadow-blue-100 scale-105'
                                                : 'border-slate-200 bg-white/50 hover:border-slate-300 hover:shadow-md'
                                        }`}
                                        whileHover={{ 
                                            scale: 1.02,
                                            transition: { type: "spring", stiffness: 400 }
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div 
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                                                    isActive 
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                                                }`}
                                            >
                                                <item.icon className="text-lg" />
                                            </div>
                                            {isActive && (
                                                <motion.div
                                                    className="w-2 h-2 bg-blue-500 rounded-full"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", stiffness: 500 }}
                                                />
                                            )}
                                        </div>
                                        <h3 className={`font-semibold text-sm leading-tight transition-colors ${
                                            isActive ? 'text-blue-600' : 'text-slate-700 group-hover:text-slate-900'
                                        }`}>
                                            {item.title.split(' ').slice(0, 3).join(' ')}
                                            {item.title.split(' ').length > 3 && '...'}
                                        </h3>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Auto-play Control */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-center gap-4 mt-6"
                        >
                            <button
                                onClick={toggleAutoPlay}
                                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                            >
                                {autoPlay ? <FaPause /> : <FaPlay />}
                                <span className="text-sm font-medium">
                                    {autoPlay ? 'Pause Auto' : 'Play Auto'}
                                </span>
                            </button>
                            
                            {/* Progress Dots */}
                            <div className="flex gap-1">
                                {items.map((item) => (
                                    <button
                                        key={item.key}
                                        onClick={() => handleFeatureClick(item.key)}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            activeFeature === item.key 
                                                ? 'bg-blue-500 scale-125'
                                                : 'bg-slate-300 hover:bg-slate-400'
                                        }`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Feature Content Display */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:w-3/5"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFeature}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div 
                                        className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg"
                                        style={{ backgroundColor: currentItem.color }}
                                    >
                                        <currentItem.icon className="text-xl" />
                                    </div>
                                    <div>
                                        <motion.h3 
                                            className="text-2xl font-bold text-slate-900 mb-1"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            {currentItem.title}
                                        </motion.h3>
                                        <div 
                                            className="w-12 h-1 rounded-full"
                                            style={{ backgroundColor: currentItem.color }}
                                        />
                                    </div>
                                </div>

                                <motion.p
                                    className="text-slate-600 text-lg leading-relaxed mb-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {currentItem.description}
                                </motion.p>

                                <motion.div
                                    className="flex gap-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
                                    >
                                        Learn More
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-3 border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold rounded-lg transition-colors"
                                    >
                                        View Details
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* Web IDE Section */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="w-full max-w-7xl mx-auto mt-20"
            >
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* Content */}
                        <div className="lg:w-1/2 p-8 sm:p-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3 mb-6"
                            >
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                                    <FaCode className="text-white text-lg" />
                                </div>
                                <span className="text-blue-600 font-semibold text-lg">
                                    ADVANCED CODING PLATFORM
                                </span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight"
                            >
                                RICR Web IDE
                                <span className="block text-blue-600">
                                    Your Professional Coding Environment
                                </span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                viewport={{ once: true }}
                                className="text-slate-600 text-lg leading-relaxed mb-8"
                            >
                                Experience enterprise-grade coding environment with real-time collaboration, 
                                instant execution, and professional development tools.
                            </motion.p>

                            {/* Features List */}
                            <div className="space-y-6 mb-8">
                                {[
                                    {
                                        icon: One,
                                        title: "Multi-Language Support",
                                        description: "Comprehensive support for all major programming languages and frameworks"
                                    },
                                    {
                                        icon: Two,
                                        title: "Instant Code Execution",
                                        description: "Real-time testing and debugging with immediate feedback and results"
                                    }
                                ].map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                            <img src={feature.icon} alt="" className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 text-lg mb-1">
                                                {feature.title}
                                            </h4>
                                            <p className="text-slate-600 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-colors flex items-center gap-3"
                            >
                                <span>Launch Web IDE</span>
                                <FaArrowRightLong />
                            </motion.button>
                        </div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="lg:w-1/2 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-8"
                        >
                            <div className="relative">
                                <motion.img
                                    src="Code.webp"
                                    alt="RICR Web IDE Interface"
                                    className="rounded-lg shadow-2xl w-full max-w-md"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                />
                                {/* Floating Elements */}
                                <motion.div
                                    className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    Live Preview
                                </motion.div>
                                <motion.div
                                    className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg"
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                >
                                    Code Running
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Why;