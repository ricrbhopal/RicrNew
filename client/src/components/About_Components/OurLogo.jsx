import React from 'react'
import Logo  from "../../../public/About/LOGO1.jpg"
import Logo1 from "../../../public/About/LOGO2.jpg"
import Logo2 from "../../../public/About/LOGO3.jpg"

const OurLogo = () => {
    const logos = [
        {
            img: Logo,
            name: "Empower",
            description: "Global leader in search, cloud, and AI innovation.",
        },
        {
            img: Logo1 ,
            name: "Innovate",
            description: "Empowering every person and every organization to achieve more.",
        },
        {
            img: Logo2 ,
            name: "Inspire",
            description: "World's most customer-centric company with vast digital services.",
        },
        
    ];

    return (
        <div className='min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center items-center py-16 px-4 sm:px-6 lg:px-8'>
            
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
                            className='group bg-white rounded-2xl   flex flex-col items-center text-center'
                        >
                          
                            <div className='mb-6  bg-gray-50 rounded-xl hover:scale-105 group-hover:bg-blue-50 transform transition-all duration-300'>
                                <img 
                                    src={logo.img} 
                                    alt={`${logo.name} logo`}
                                    className='w-full  object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300'
                                   
                                />
                            </div>

                        
                            <div className='flex-1 flex flex-col justify-center'>
                                <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300'>
                                    {logo.name}
                                </h3>
                                <p className='text-gray-600 leading-relaxed'>
                                    {logo.description}
                                </p>
                            </div>

                          
                        </div>
                    ))}
                </div>
            </div>

          
           
        </div>
    )
}

export default OurLogo;