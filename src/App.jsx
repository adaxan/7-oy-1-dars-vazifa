import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <div>
       <Routes>
        <Route index element={<Home></Home>}></Route>
        <Route path='/about' element={<About></About>}></Route>
       </Routes>
    </div>
  )
}

export default App