import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
const App = () => {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/' element={<Signout/>} />
    </Routes>
    </>
    )
}

export default App