import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from './screens/Landing';
import { Game } from './screens/Game';


function App() {

  return (
    <div className='h-screen bg-slate-950'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} /> {/* 👈 Renders at /app/ */}
        <Route path="/game" element={<Game />} /> {/* 👈 Renders at /app/ */}
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
