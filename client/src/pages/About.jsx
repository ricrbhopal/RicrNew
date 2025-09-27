import React from 'react'
import Hero from '../components/About_Components/Hero'
import OurLogo from '../components/About_Components/OurLogo'
import MeetOurMaestros from '../components/home_Components/MeetOurMaestros'
import Footer from '../components/Footer'


const About = () => {
  return (
    <div>
        <Hero/>
        <OurLogo/>
        <MeetOurMaestros/>


        
            <div className="bg-white mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <div className="relative flex flex-col justify-center items-center rounded-2xl max-w-6xl mx-auto bg-[#0F172A] px-6 py-18 leading-9 shadow-lg overflow-hidden">

                    <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-gray-200 mb-6">
                        <img src="/Star2.png" alt="star" className="h-5 w-5 sm:h-6 sm:w-6" />
                        <span>Subscribe For Free</span>
                    </div>

                    <h1 className="max-w-xl text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-8">
                        Stay updated with Upcoming Events <br /> and Workshops
                    </h1>

                    <div className="flex w-full max-w-md bg-[#1a263e]  rounded-lg overflow-hidden shadow-md">
                        <input
                            type="email"
                            placeholder="Enter your email..."
                            className="flex-grow px-4 py-1 text-white/80 focus:outline-none"
                        />
                        <button className="px-6 bg-[#125785] hover:cursor-pointer text-white font-semibold transition-all">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

        <Footer/>
    </div>
  )
}

export default About