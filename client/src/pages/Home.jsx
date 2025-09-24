import React from 'react'
import Hero from '../components/home_Components/Hero'
import Why from '../components/home_Components/Why'

const Home = () => {
  return (
    <div>
        
        <Hero/>
        <Why/>


        <div>
            <h1 className=' fixed right-5 bottom-8 h-12 w-60 px-4 py-2 font-bold text-center text-[#125785] bg-white  rounded-b-4xl rounded-tl-4xl'>Request a callback</h1>
        </div>
    </div>
  )
}

export default Home