import React from 'react'
import HeroSection from '../components/program_Components/heroProgramSection'
import LearnAtRICR from '../components/program_Components/learnAtRICR'
import SectionThree from '../components/program_Components/teamSactuallyWork'
import ProgramCards from '../components/program_Components/programCard'
import RealCompanies from '../components/program_Components/realCompaniesWork'

function ourProgram() {
  return (
    <div>
      <HeroSection />
      <LearnAtRICR />
     <SectionThree/>
     <ProgramCards/>
     <RealCompanies/>
    
    </div>
  )
}

export default ourProgram
