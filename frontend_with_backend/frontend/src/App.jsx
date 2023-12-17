import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header.jsx'
import Hero from './Components/Hero.jsx'
import Professions from './Components/Professions.jsx'
import JwtDecodePage from './Components/Extract.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Preview from './Preview.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
          <Routes>
              <Route path='/decode-jwt' Component={JwtDecodePage} />
              <Route path='/' element={<Preview/>} />
          </Routes>
      </Router>
  )
}

export default App