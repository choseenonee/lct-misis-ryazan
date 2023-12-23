import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import Hero from './Components/Hero'
import Professions from './Components/Professions'
import JwtDecodePage from './Components/Extract'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Preview from './Preview'
import Global from './Global'


function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
          <Routes>
              <Route path='/decode-jwt' Component={JwtDecodePage} />
              <Route path='/profile' element={<Preview/>} />
              <Route path='/' element={<Global/>} />
          </Routes>
      </Router>
  )
}

export default App