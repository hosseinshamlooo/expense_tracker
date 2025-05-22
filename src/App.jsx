import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Savings from './pages/Savings'
import Insights from './pages/Insights'
import Settings from './pages/Settings'
import SideBar from './components/SideBar'


const App = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/savings' element={<Savings />} />
        <Route path='/insights' element={<Insights />} />
        <Route path='/settings' element={<Settings />} />
        
      </Routes>
    </div>
  )
}

export default App