import React from 'react'
import Hero from '../components/home_Components/Hero'
import Why from '../components/home_Components/Why'
import Affiliation from '../components/home_Components/Affiliation&Accreditation'
import MeetOurMaestros from '../components/home_Components/MeetOurMaestros'
import Celebrate from '../components/home_Components/Celebrate'


const Home = () => {
  return (
    <div>
        
        <Hero/>
        <Why/>
        <Affiliation/>
        <MeetOurMaestros/>
        <Celebrate/>


    <div>
      <h1 className='z-50 fixed right-5 bottom-8 h-12 w-60 px-4 py-2 font-bold text-center text-[#125785] bg-white rounded-b-4xl rounded-tl-4xl shadow-[0_12px_30px_rgba(0,0,0,0.25)] ring-1 ring-black/5'>Request a callback</h1>
    </div>
    </div>
  )
}

export default Home