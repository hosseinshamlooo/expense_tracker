import React from 'react'
import { FaHome, FaPiggyBank, FaChartPie, FaCog, FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const SideBar = () => {

  const { openSignIn } = useClerk();
  const { user } = useUser();



  return (
    <div className="flex flex-col justify-between h-screen w-16 bg-sidebar">
  <img src="" alt="logo" className="hidden"  /> {/* logo placeholder */}

  {/* Top icons */}
  <div className="flex flex-col items-center space-y-2 mt-4 mb-auto">
    <Link to='/' aria-label="Dashboard" className="p-3 icon-default hover:icon-hover"> <FaHome size={24} /> </Link>
    <Link to='/savings' aria-label="Savings" className="p-3 icon-default hover:icon-hover"> <FaPiggyBank  size={24} /> </Link> 
    <Link to='/insights' aria-label="Insights" className="p-3 icon-default hover:icon-hover"> <FaChartPie size={24} /> </Link>
    
  </div>

 {/* Bottom icons */}
<div className="flex flex-col items-center space-y-2 mt-auto mb-10">
  <Link to='/settings' aria-label="Settings" className="p-3 icon-default hover:icon-hover mb-2">
    <FaCog size={24} />
  </Link>

        { user ? <UserButton/> :
          
        <button onClick={() => openSignIn()} className="p-3 text-gray-400 hover:text-[#c9c9c9] hover:scale-125 transition-transform transition-colors duration-200 cursor-hover"><FaUserCircle size={24} /></button> }   
  
        
  
</div>
</div>

  )
}

export default SideBar