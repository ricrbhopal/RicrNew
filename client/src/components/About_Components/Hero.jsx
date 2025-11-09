import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../config/api';

const Hero = () => {
  const [activeMedia, setActiveMedia] = useState(null);

  useEffect(() => {
    const fetchActiveMedia = async () => {
      try {
        const response = await adminAPI.getAllAboutHeroes();
        const activeMedia = response.data.find(media => media.status === 'active');
        setActiveMedia(activeMedia);
      } catch (error) {
        console.error('Error fetching active media:', error);
      }
    };

    fetchActiveMedia();
  }, []);

  return (
    <div className="mt-20 h-[80vh] w-full flex justify-center items-center px-6 text-black">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full gap-10">
        <div className="flex flex-col items-start text-left space-y-6 max-w-3xl">
          <h4 className="flex items-center text-lg font-medium text-gray-600">
            <span className="font-extrabold text-black mr-2">|</span>
            A Raj Digital Initiative
          </h4>

          <h1 className="text-4xl text-[#125785] md:text-5xl font-bold leading-tight">
            Empowering Innovation <br /> Through RICR
          </h1>

          <p className="text-gray-700 text-md">
            Driving digital excellence and building future-ready solutions for businesses and learners worldwide.
          </p>
        </div>

        <div className="flex justify-center items-center max-w-md w-full">
          {activeMedia ? (
            activeMedia.mediaType === 'image' ? (
              <img
                src={activeMedia.url}
                alt="Hero Illustration"
                className="w-full h-auto object-contain"
              />
            ) : (
              <video
                src={activeMedia.url}
                controls
                autoPlay
                loop
                muted
                className="w-full h-auto object-contain"
              />
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
