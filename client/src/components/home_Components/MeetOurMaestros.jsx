import React from 'react'
import { FaLinkedin } from 'react-icons/fa';
import Mentor1 from '../../assets/Mentor/Pranay Das Sir.webp'
import Mentor2 from '../../assets/Mentor/Raj Vardhhan Sir.webp'
import Mentor3 from '../../assets/Mentor/Mohit sir.jpg'

import Expert1 from '../../assets/Experts/1.webp'
import Expert2 from '../../assets/Experts/2.webp'
import Expert3 from '../../assets/Experts/3.webp'
import Expert4 from '../../assets/Experts/4.webp'
import Expert5 from '../../assets/Experts/5.webp'
import Expert6 from '../../assets/Experts/6.webp'
import Expert7 from '../../assets/Experts/7.webp'

const MeetOurMaestros = () => {

  const Maestros = [
    {
      name: "Pranay Das",
      img: Mentor1,
      role: "Senior Java instructor",
      linkedIn: "https://www.linkedin.com/in/pranay-das20"
    },
    {
      name: "Raj vardhan",
      img: Mentor2,
      role: "Full Stack Trainer",
      linkedIn: "https://www.linkedin.com/in/raj-vardhan-2b4b0215b/"
    },
    {
      name: "Mohit Payasi",
      img: Mentor3,
      role: "Data Science Trainer",
      linkedIn: "https://www.linkedin.com/in/mohit-payasi/"
    },
  ]


  const Experts = [
    {
      img: Expert1,
      name: "Anuj Saxena ",
      role: "CEO",
      company: "Institute of informatica",
      linkedIn: "https://www.linkedin.com/in/ankit-kumar-2a0b0215b/"
    },
    {
      img: Expert2,
      name: "Amit Tated",
      role: "Product Manager",  
      company: "Airbus",
      linkedIn: "https://www.linkedin.com/in/ankit-kumar-2a0b0215b/"
    },
    {
      img: Expert3,
      name: "Deepika Das",
      role: "Technical lead",
      company: "CBS-Cargill India",
      linkedIn: "https://www.linkedin.com/in/saurabh-jain-224b0215b/"

    },
     {
      img: Expert1,
      name: "Rajib Debnath ",
      role: "Lead Analyst MES",
      company: " Momentive",
      linkedIn: "https://www.linkedin.com/in/ankit-kumar-2a0b0215b/"
    },
    {
      img: Expert2,
      name: "Sharda Agrawal",
      role: "Sr Manager DFT",  
      company: "Achonix Semiconductor",
      linkedIn: "https://www.linkedin.com/in/ankit-kumar-2a0b0215b/"
    },
    {
      img: Expert3,
      name: "Debanjan Gosh",
      role: "Sr. Software test Engineer",
      company: "Continental Automotive",
      linkedIn: "https://www.linkedin.com/in/saurabh-jain-224b0215b/"

    }, {
      img: Expert1,
      name: "Lavish Arora ",
      role: "MD Corporate Trainer",
      company: "Race of Advance Computing Education  ",
      linkedIn: "https://www.linkedin.com/in/ankit-kumar-2a0b0215b/"
    },
   
  ]



  return (
   <section>
     <div className='w-full mx-auto px-4 sm:px-6 md:px-16 my-20 text-white py-20 bg-[#125785]'>
      <div className='max-w-6xl mx-auto flex flex-col justify-center items-center gap-6'>
        <h1 className='text-5xl font-medium text-center'>Meet Our Coding Maestros</h1>
        <h2 className='text-2xl text-medium text-center max-w-4xl'>
          Learn from industry veterans and coding experts at RICR. Our mentors bring real-world insights to elevate your coding skills.
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-10'>
          {Maestros.map((maestro, index) => (
            <div
              key={index}
              className='relative rounded-lg overflow-hidden group  transition-all duration-500  w-[350px]  hover:scale-105'
              style={{ height: '350px' }}
            >
              <div className='h-full w-full overflow-hidden'>
                <img
                  src={maestro.img}
                  alt={maestro.name}
                  className='h-full w-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110'
                />
              </div>

              <div className='absolute bottom-0 left-0 right-0 bg-black/90   transform transition-all duration-500 ease-in-out group-hover:translate-y-0 translate-y-1/1 h-1/3 '>
                <div className='flex flex-col items-center text-center text-white h-full justify-end pb-1 '>
                  <h3 className='text-xl font-bold mb-2'>{maestro.name}</h3>
                  <p className='text-sm mb-3 opacity-90 leading-relaxed'>{maestro.role}</p>

                  <a
                    href={maestro.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='inline-flex items-center justify-center p-2 transition hover:scale-110 z-50'
                  >
                    <FaLinkedin className='text-white text-lg  cursor-pointer z-99 ' />
                  </a>

                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>




    <div>


    <h1 className=' text-5xl font-medium text-center mb-10 text-White '>
      Industry Experts Guidance
    </h1>

    <p className='max-w-3xl mx-auto text-center text-gray-700 text-lg leading-relaxed px-4 sm:px-6 lg:px-8'>
      Gain insights from seasoned professionals working in top-tier MNCs. Learn from their expertise to excel in your coding journey.
    </p>
    </div>
   </section>
  )
}

export default MeetOurMaestros