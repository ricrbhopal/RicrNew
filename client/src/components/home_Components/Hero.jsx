// ...existing code...
import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../config/api';
import { FaStar } from "react-icons/fa6";
import { MdOutlineArrowForward } from "react-icons/md";
import { motion } from "framer-motion";

const Hero = () => {

    const fadeInRight = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }

    const buttonVariant = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { delay: 1, duration: 0.5, ease: "easeOut" } }
    };

    const [media, setMedia] = useState({ url: '/HeroVideo.mp4', mediaType: 'video', thumbnail: '' });
    const [mediaError, setMediaError] = useState(false);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const res = await adminAPI.getHero();
                if (res && res.data) {
                    const data = res.data;
                    if (data.videos && data.videos.length > 0) {
                        const item = data.videos[0];
                        setMedia({
                            url: item.url,
                            mediaType: item.mediaType || (item.url?.endsWith('.jpg') || item.url?.endsWith('.png') ? 'image' : 'video'),
                            thumbnail: item.thumbnail || ''
                        });
                        return;
                    }
                    if (data.hero && data.hero.backgroundVideo) {
                        setMedia({
                            url: data.hero.backgroundVideo,
                            mediaType: data.hero.mediaType || (data.hero.backgroundVideo?.endsWith('.jpg') || data.hero.backgroundVideo?.endsWith('.png') ? 'image' : 'video'),
                            thumbnail: data.hero.thumbnail || ''
                        });
                        return;
                    }
                    if (data.backgroundVideo) {
                        setMedia({
                            url: data.backgroundVideo,
                            mediaType: data.mediaType || (data.backgroundVideo?.endsWith('.jpg') || data.backgroundVideo?.endsWith('.png') ? 'image' : 'video'),
                            thumbnail: data.thumbnail || ''
                        });
                        return;
                    }
                }
            } catch (err) {
                console.error('Failed to fetch hero/videos', err);
            }
        };
        fetchMedia();
    }, []);

    return (
        <section className='relative min-h-screen flex items-center  overflow-hidden mt-20'>

            {media.mediaType === 'image' ? (
                <img
                    className='absolute inset-0 w-full h-full object-cover'
                    src={mediaError ? '/fallback-hero.jpg' : media.url}
                    alt='Hero background'
                    loading='lazy'
                    onError={() => setMediaError(true)}
                    aria-hidden='true'
                />
            ) : (
                <video
                    className='absolute inset-0 w-full h-full object-cover'
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload='metadata'
                    poster={media.thumbnail || ''}
                    aria-hidden='true'
                >
                    <source src={media.url} type='video/mp4' />
                    <source src={media.url} type='video/webm' />
                    {/* fallback */}
                    Your browser does not support the video tag.
                </video>
            )}

            <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60'></div>

            <motion.div
                className='relative z-10 max-w-6xl mx-6 md:ps-20 ps-10  lg:mx-0 w-1/2 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 text-white'
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
}

export default Hero;
// ...existing code...