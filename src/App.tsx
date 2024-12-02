import { useState } from 'react'
import React from 'react';
import './App.css'
import Hero from './Hero.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className = "bg-gradient-to-tl from-indigo-800 from-20% via-pink-600 to-yellow-200">
      <Hero />
    </div>
  )
}

export default App
