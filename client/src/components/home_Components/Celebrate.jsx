import React, { useRef, useState, useEffect } from 'react';
import { celebrateAPI } from '../../config/api';

const Celebrate = () => {
    const sliderRef = useRef(null);
    const [isPaused, setIsPaused] = useState(true);
    const [activeStudents, setActiveStudents] = useState([]);

    useEffect(() => {
        fetchActiveStudents();
    }, []);

    const fetchActiveStudents = async () => {
        try {
            const res = await celebrateAPI.getCelebrates();
            setActiveStudents(res.data.filter(s => s.status === 'active'));
        } catch {
            setActiveStudents([]);
        }
    };

    const PlacedStudent = activeStudents.length > 0 ? activeStudents.map(s => ({
        name: s.name,
        position: s.position,
        company: s.company,
        image: s.image,
        Batch: s.batch || s.Batch
    })) : [];

    const duplicatedStudents = [...PlacedStudent, ...PlacedStudent, ...PlacedStudent];

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider || isPaused || PlacedStudent.length <= 1) return;

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
    }, [isPaused, PlacedStudent.length]);

    if (PlacedStudent.length <= 1) {
        return (
            <div className='text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
                <h1 className='text-5xl font-bold my-8 text-gray-900'>
                    Celebrating Success at <span className='text-blue-600'>RICR</span>
                </h1>
                <p className='text-gray-600 my-8 text-lg max-w-3xl mx-auto'>
                    Dreams achieved with successful campus placements. Our students are making waves in top companies worldwide.
                </p>

                <div className='flex justify-center items-center py-8'>
                    {PlacedStudent.map((student, index) => (
                        <div
                            key={index}
                            className='flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300 hover:shadow-2xl'
                        >
                            <div className='md:w-1/3 mb-4 md:mb-0'>
                                <div className='w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-500 shadow-lg'>
                                    <img
                                        src={student.image}
                                        alt={student.name}
                                        className='w-full h-full object-cover'
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/150/cccccc/969696?text=Student+Image';
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='md:w-2/3 md:pl-8 text-center md:text-left'>
                                <h3 className='text-2xl font-bold text-gray-800 mb-2'>{student.name}</h3>
                                <div className='mb-3'>
                                    <p className='text-lg font-semibold text-blue-600 mb-1'>{student.position}</p>
                                    <p className='text-md text-gray-600 font-medium'>{student.company}</p>
                                </div>
                                <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-full inline-block shadow-md'>
                                    <p className='text-sm font-medium'>{student.Batch}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <section className="bg-gradient-to-br from-gray-50 to-white">
            {/* Placed Students Section */}
            <div className='text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
                <div className='mb-12'>
                    <h1 className='text-5xl font-bold text-gray-900 mb-4'>
                        Celebrating Success at RICR
                    </h1>
                    <p className='text-gray-600 text-lg max-w-3xl mx-auto'>
                        Dreams achieved with successful campus placements. Our students are making waves in top companies worldwide.
                    </p>
                </div>

                <div className='relative overflow-hidden py-8'>
                    <div
                        ref={sliderRef}
                        className='flex space-x-8 overflow-x-auto scrollbar-hide pb-4'
                        style={{ pointerEvents: 'none' }}
                    >
                        {duplicatedStudents.map((student, index) => (
                            <div
                                key={index}
                                className='flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 group hover:shadow-2xl border border-gray-100'
                                style={{
                                    width: '380px',
                                    height: '220px',
                                    pointerEvents: 'auto'
                                }}
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(true)}
                            >
                                <div className='flex h-full'>
                                    <div className='w-2/5 flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100'>
                                        <div className='w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg'>
                                            <img
                                                src={student.image}
                                                alt={student.name}
                                                className='w-full h-full object-cover'
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/150/cccccc/969696?text=Student+Image';
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='w-3/5 flex flex-col justify-center p-6'>
                                        <h3 className='text-xl font-bold text-gray-800 mb-2 line-clamp-1'>{student.name}</h3>
                                        <p className='text-lg font-semibold text-blue-600 mb-1'>{student.position}</p>
                                        <p className='text-sm text-gray-600 font-medium mb-3'>{student.company}</p>
                                        <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-full text-xs font-medium inline-block shadow-md'>
                                            {student.Batch}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Celebrate;