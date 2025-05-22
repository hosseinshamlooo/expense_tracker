import React, { useState } from 'react'
import DynamicPieChart from '../components/DynamicPieChart'
import NewEntryModalWindow from '../components/NewEntryModalWindow'



const DashboardPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev)
  }
  return (
    <div className='flex-1 h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center '>
        
        <DynamicPieChart />

        <button onClick={toggleModal} className="mt-0 bg-[#1a1a1a] text-white font-bold py-4 px-16 rounded-full text-xl shadow-lg border-2 border-[#bfa75d] hover:shadow-[0_0_20px_#bfa75d] hover:bg-[#1a1a1a] hover:bg-[#bfa75d] transition-all duration-300 scale-hover cursor-pointer">
      New Entry
        </button>
        
        <NewEntryModalWindow isOpen={isModalOpen} onClose={toggleModal} />
      </div>
    </div>
  )
}

export default DashboardPage