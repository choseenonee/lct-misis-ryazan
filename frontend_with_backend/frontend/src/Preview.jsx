import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header.jsx'
import Hero from './Components/Hero.jsx'
import Professions from './Components/Professions.jsx'
import {
  useParams
} from "react-router-dom";


function Preview() {
  const [count, setCount] = useState(0)
  let { token } = useParams();
  console.log(token);
  return (

    <div className='min-h-screen bg-gradient-to-tr from-[#7d4a10]
        via-[#120B2E] to-[#091498] px-8 md:px-14 lg:px-36 pb-10 pt-7'>
        
      
        <Header/>
        <Hero/>
        <Professions/>
        
    </div>
    
  )
}

export default Preview