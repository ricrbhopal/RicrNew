import React, { useRef, useState, useEffect } from 'react'
import Nandani from '../../assets/Succeess/Nandani.png'
import Ashish from '../../assets/Succeess/Ashish.png'
import Sanjay from '../../assets/Succeess/Sanjay.jpg'
import Kushik from '../../assets/Succeess/Kaushik.png'
import Abhishek from '../../assets/Succeess/Abhishek.png'

const Celebrate = () => {
    const sliderRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    const PlacedStudent = [
        {
            name: "Ashish Rahangdale",
            position: "Associate Developer",
            company: "Raj Digital",
            image: Ashish,
            Batch: "RICR • Batch 2025"
        },
        {
            name: "Ritam Sundar Sandhaki",
            position: "Associate Developer",
            company: "Raj Digital",
            image: "wdd", 
            Batch: "RICR • Batch 2025"
        },
        {
            name: "Sanjay Kumar",
            position: "Key Management Crew",
            company: "Compass Group",
            image: Sanjay,
            Batch: "RICR • Batch 2025"
        },
        {
            name: "Kushik Mishra",
            position: "Project Engineer",
            company: "Wipro",
            image: Kushik,
            Batch: "RICR • Batch 2025"
        },
        {
            name: "Abhishek Asthana",
            position: "Software Developer",
            company: "Beam",
            image: Abhishek,
            Batch: "RICR • Batch 2025"
        },
        {
            name: "Nandini Patel",
            position: "Associate Developer",
            company: "Raj Digital",
            image: Nandani,
            Batch: "RICR • Batch 2025"
        },
    ]

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
                <h1 className='text-5xl font-bold my-8'>
                    Celebrating Success at RICR
                </h1>
                <p className='text-gray-600 my-8 text-lg'>
                    Dreams achieved with successful campus placements
                </p>

                <div className='flex justify-center items-center py-8'>
                    {PlacedStudent.map((student, index) => (
                        <div
                            key={index}
                            className='flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-2xl p-6 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300'
                        >
\                            <div className='md:w-1/3 mb-4 md:mb-0'>
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
                                <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-full inline-block'>
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
        <div className='text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
            <h1 className='text-5xl font-bold my-8'>
                Celebrating Success at RICR
            </h1>
            <p className='text-gray-600 my-8 text-lg'>
                Dreams achieved with successful campus placements
            </p>

            <div className='relative overflow-hidden py-8'>
                <div
                    ref={sliderRef}
                    className='flex space-x-8 overflow-x-hidden'
                    style={{ pointerEvents: 'none' }}
                >
                    {duplicatedStudents.map((student, index) => (
                        <div
                            key={index}
                            className='flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 group'
                            style={{ 
                                width: '380px', 
                                height: '200px',
                                pointerEvents: 'auto'
                            }}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            <div className='flex h-full'>
                                {/* Student Image */}
                                <div className='w-2/5 flex items-center justify-center p-4'>
                                    <div className='w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 shadow-md'>
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

                                <div className='w-3/5 flex flex-col justify-center p-4 bg-gradient-to-r from-gray-50 to-white'>
                                    <h3 className='text-xl font-bold text-gray-800 mb-2 line-clamp-1'>{student.name}</h3>
                                    <p className='text-lg font-semibold text-blue-600 mb-1'>{student.position}</p>
                                    <p className='text-sm text-gray-600 font-medium mb-3'>{student.company}</p>
                                    <div className='bg-blue-500 text-white py-1 px-3 rounded-full text-xs font-medium inline-block'>
                                        {student.Batch}
                                    </div>
                                </div>
                            </div>

                        
                        </div>
                    ))}
                </div>

                </div>

            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    )
}

export default Celebrate