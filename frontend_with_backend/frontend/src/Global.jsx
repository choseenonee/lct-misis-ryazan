import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import Hero from './Components/Hero'
import Professions from './Components/Professions'
import GlobalHero from './Components/GlobalHero'
import GlobalHeader from './Components/GlobalHeader'

function Global() {
  return (
    <div className='min-h-screen  bg-gradient-to-tr from-[#7d4a10]
    via-[#120B2E] to-[#091498]'>

    <div className='min-h-screen bg-contain bg-transparent bg-right-bottom bg-no-repeat bg-[url("/src/assets/Topology-2.png")] px-8 md:px-14 lg:px-36 pt-7'>
    
        <GlobalHeader/>
        <GlobalHero/>
    </div>
    </div>
  )
}

export default Global