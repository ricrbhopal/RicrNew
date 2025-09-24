import React from 'react';
import { FaStar } from "react-icons/fa6";
import { MdOutlineArrowForward } from "react-icons/md";
import { motion } from "framer-motion";

const Hero = () => {

    // Variants for animation
    const fadeInRight = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }

    const buttonVariant = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { delay: 1, duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div className='relative min-h-screen md:flex justify-center items-center'>

            <video
                className='absolute top-0 left-0 w-full h-[91vh] object-cover '
                src="HeroVideo.mp4"
                autoPlay
                loop
                muted
            />

            <div className='absolute top-0 left-0 w-full h-[91vh] bg-black/30'></div>

            <motion.div
                className='relative w-full flex flex-col gap-6 px-10 md:px-30 pt-20 md:pt-0 text-white leading-6'
                initial="hidden"
                animate="visible"
                variants={fadeInRight}
            >
                <motion.div className='flex items-center gap-3' variants={fadeInRight}>
                    <div className='h-12 w-12 rounded-lg flex justify-center items-center bg-[#ff7350]'>
                        <FaStar size={25} />
                    </div>
                    <div>
                        <h2 className='text-lg md:text-xl font-medium'>Embark Today</h2>
                        <h3 className='text-sm md:text-base font-medium'>Fuel your Coding Journey and</h3>
                    </div>
                </motion.div>

                <motion.div className='max-w-md' variants={fadeInRight} transition={{ delay: 0.3 }}>
                    <h1 className='text-4xl md:text-7xl font-bold leading-tight'>
                        Unlock Your Potential at RICR
                    </h1>
                </motion.div>

                <motion.div className='max-w-lg' variants={fadeInRight} transition={{ delay: 0.6 }}>
                    <p className='text-sm md:text-base font-medium'>
                        Unlock the potential of your college journey with expert coding guidance at RICR. Elevate your skills for a future in robotics and technology.
                    </p>
                </motion.div>

                <motion.div variants={buttonVariant}>
                    <button className='group flex items-center gap-2 px-5 py-3 bg-[#125785] font-medium rounded-lg hover:bg-blue-900 transition-all duration-300'>
                        Book A Demo
                        <MdOutlineArrowForward className='text-2xl transform transition-transform duration-300 group-hover:translate-x-1' />
                    </button>
                </motion.div>





            </motion.div>


         

        </div>
    );
};

export default Hero;
