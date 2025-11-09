import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../config/api';
import toast from 'react-hot-toast';

const OurLogo = () => {
    const [logos, setLogos] = useState([]);

    useEffect(() => {
        const fetchActiveLogos = async () => {
            try {
                const res = await adminAPI.getAllOurLogos();
                const activeLogos = res.data.filter(logo => logo.status === 'active');
                setLogos(activeLogos);
            } catch (err) {
                console.error('Error fetching active logos:', err);
                toast.error('Failed to load active logos');
            }
        };

        fetchActiveLogos();
    }, []);

    return (
        <div className='min-h-screen  w-full bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center items-center py-16 px-4 sm:px-6 lg:px-8'>
            {/* Header Section */}
            <div className='text-center mb-12 max-w-4xl'>
                <h3 className='text-lg font-semibold text-blue-600 uppercase tracking-wide mb-2'>
                    OUR PARTNERS
                </h3>

                <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight'>
                    Coding Excellence Symbolized 
                </h1>

                <p className='text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto'>
                    Explore the depth of our partnerships, where each collaboration signifies our commitment
                    to empowering, innovating, and inspiring through coding education.
                </p>
            </div>

            <div className='max-w-7xl w-full'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12'>
                    {logos.map((logo, index) => (
                        <div 
                            key={index}
                            className='group bg-white rounded-2xl flex flex-col items-center '
                        >
                            <div className=' bg-gray-50 rounded-xl hover:scale-105 group-hover:bg-blue-50 transform transition-all duration-300'>
                                <img 
                                    src={logo.url} 
                                    alt={`${logo.title} logo`}
                                    className='w-full object-contain transition-all duration-300'
                                />
                            </div>

                            <div className=''>
                                <h3 className='text-xl p-2 font-bold text-gray-900   transition-colors duration-300'>
                                    {logo.title}
                                </h3>
                                <p className='text-gray-600 p-2 leading-relaxed'>
                                    {logo.sub}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurLogo;