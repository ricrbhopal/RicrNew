import React, { useRef, useState, useEffect } from 'react'
import Nandani from '../../assets/Succeess/Nandani.png'
import Ashish from '../../assets/Succeess/Ashish.png'
import Sanjay from '../../assets/Succeess/Sanjay.jpg'
import Kushik from '../../assets/Succeess/Kaushik.png'
import Abhishek from '../../assets/Succeess/Abhishek.png'
import media1 from "../../assets/FeatureMedia/1.jpg"
import media2 from "../../assets/FeatureMedia/2.jpg"

const Celebrate = () => {
    const sliderRef = useRef(null);
    const [isPaused, setIsPaused] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

    const SuccessStories = [
        {
            id: 1,
            profile: "ricredu",
            Dp: "https://via.placeholder.com/50/125785/ffffff?text=R",
            image: "https://via.placeholder.com/400x400/125785/ffffff?text=Success+Story+1",
            likes: 335,
            comments: 15,
        },
        {
            id: 2,
            profile: "ricredu",
            Dp: "https://via.placeholder.com/50/125785/ffffff?text=R",
            image: "https://via.placeholder.com/400x400/0ea5e9/ffffff?text=Success+Story+2",
            likes: 210,
            comments: 8,
        },
        {
            id: 3,
            profile: "ricredu",
            Dp: "https://via.placeholder.com/50/125785/ffffff?text=R",
            image: "https://via.placeholder.com/400x400/10b981/ffffff?text=Success+Story+3",
            likes: 156,
            comments: 12,
        },
        {
            id: 4,
            profile: "ricredu",
            Dp: "https://via.placeholder.com/50/125785/ffffff?text=R",
            image: "https://via.placeholder.com/400x400/f59e0b/ffffff?text=Success+Story+4",
            likes: 289,
            comments: 22,
        },
    ];

    const FeaturedMedia = [
        {
            image: media1,
        },
        {
            image: media2,
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

    const openModal = (index) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const nextImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === FeaturedMedia.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === 0 ? FeaturedMedia.length - 1 : prevIndex - 1
        );
    };

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

            {/* Featured Media Section */}
            <div className='w-screen flex justify-center items-center'>
                <div className='max-w-7xl px-4 sm:px-6 lg:px-8 py-20 bg-white rounded-3xl shadow-sm'>
                    <div className='text-center mb-12'>
                        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                            Featured in Media
                        </h1>
                        <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
                            Explore our highlights in leading media platforms and publications showcasing our excellence in education.
                        </p>
                    </div>

                    <div className='flex justify-center items-center gap-8 flex-wrap lg:flex-nowrap px-4'>
                        {FeaturedMedia.map((media, index) => (
                            <div
                                key={index}
                                className='group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer'
                                onClick={() => openModal(index)}
                            >
                                <img
                                    src={media.image}
                                    alt={`Media Feature ${index + 1}`}
                                    className='w-full max-w-md h-64 object-cover rounded-2xl'
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Success Stories Section */}
            <div className='w-full mx-auto px-4 sm:px-6 md:px-16 my-20 text-white py-20 bg-[#125785]'>
                <div className='max-w-9xl mx-auto flex flex-col justify-center items-center gap-6'>
                    <h1 className='text-5xl font-medium text-center'>Student Success Stories</h1>
                    <h2 className='text-2xl text-medium text-center max-w-4xl'>
                        Discover how our learners turned RICR training into real-world achievements.
                    </h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 mt-10'>
                        {SuccessStories.map((story) => (
                            <div
                                key={story.id}
                                className='bg-white h-[450px] w-[320px] text-black rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105'
                            >
                              
                                <div className='h-[15%] flex items-center px-4 gap-3 border-b border-gray-200'>
                                    <img 
                                        src={story.Dp} 
                                        alt={`${story.profile} profile`}
                                        className='h-8 w-8 rounded-full object-cover'
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/32/125785/ffffff?text=R';
                                        }}
                                    />
                                    <h1 className='font-semibold text-lg text-gray-800'>@{story.profile}</h1>
                                </div>

                                <div 
                                    className='h-[70%] bg-cover bg-center relative group cursor-pointer'
                                    style={{ backgroundImage: `url(${story.image})` }}
                                >
                                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center'>
                                        <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-3'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className='h-[15%] bg-gradient-to-r from-blue-600 to-green-600 flex gap-5 items-center px-4'>
                                    <div className='flex items-center gap-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                        </svg>
                                        <span className='text-white font-medium'>{story.likes.toLocaleString()}</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
                                        </svg>
                                        <span className='text-white font-medium'>{story.comments}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
                    <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 text-white bg-red-600 hover:bg-red-700 rounded-full p-2 transition-all duration-200 transform hover:scale-110"
                            style={{ zIndex: 60 }}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {FeaturedMedia.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 z-10 text-white bg-blue-600 hover:bg-blue-700 rounded-full p-3 transition-all duration-200 transform hover:scale-110"
                                    style={{ zIndex: 60 }}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 z-10 text-white bg-blue-600 hover:bg-blue-700 rounded-full p-3 transition-all duration-200 transform hover:scale-110"
                                    style={{ zIndex: 60 }}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {FeaturedMedia.length > 1 && (
                            <div className="absolute top-4 left-4 z-10 text-white bg-black bg-opacity-50 rounded-full px-4 py-2 text-sm font-medium" style={{ zIndex: 60 }}>
                                {selectedImageIndex + 1} / {FeaturedMedia.length}
                            </div>
                        )}

                        <img
                            src={FeaturedMedia[selectedImageIndex].image}
                            alt={`Media Feature ${selectedImageIndex + 1}`}
                            className="max-w-full max-h-full object-contain rounded-lg"
                            style={{ zIndex: 50 }}
                        />
                    </div>
                </div>
            )}

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
        </section>
    )
}

export default Celebrate