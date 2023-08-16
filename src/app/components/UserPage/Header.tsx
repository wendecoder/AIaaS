'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import IceWidget from "../IceWidget";
// import { MenuIcon } from '@heroicons/react/outline';




const Header = () => {
  
    const [headerBackground, setHeaderBackground] = useState('header-initial');
  const [childrenPadding, setChildrenPadding] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleIconClick = () => {
    // Redirect to the HTML file
    window.location.href = "/index.html";
  };
  const handleScroll = () => {
    const headerHeight = 0; // Replace with the actual height of your header
    if (window.scrollY > headerHeight) {
      setHeaderBackground('fixed-header');
      setChildrenPadding('pt-20');
    } else {
      setHeaderBackground('header-initial');
      setChildrenPadding('');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    return(
        <div className={headerBackground}>
        <header>
          <div className='flex flex-wrap items-center justify-between'>
            <div className='mt-5 mb-10 ml-5 rounded-medium'>  <Image
    src='/predictoLogo.png'
    alt='ice-logo'
    width={200}
    height={50}
  /></div>
            
            <div className="bg-custom-blue mt-5 mb-10 rounded-full inline-block shadow-lg ring-4 ring-opacity-50 ring-custom-blue-white"
            onClick={() => handleIconClick() }// Toggle the widget open state
            style={{ cursor: "pointer" }}
            >
  <Image
    src='/ice-logo.png'
    alt='ice-logo'
    width={50}
    height={50}
  />
</div>

<div className='flex items-center justify-between mt-5 mb-10'>
    {/* Account Balance */}
    <div className="flex items-center rounded-lg mr-3 bg-black">
    {/* Cryptocurrency Image */}
    <img src="/adaIcon.png" alt="ADA Token" className="w-12 h-18 rounded-full p-2" />

    {/* Amount */}
    <span className="text-white font-semibold">10000.000</span>

    {/* Currency */}
    <span className="ml-1 text-gray-500 mr-5">ADA</span>
  </div>
  {/* User Profile Image with Dropdown */}
  <div className="relative inline-block">
    <div className="w-10 h-10 bg-gray-300 rounded-full mr-10 overflow-hidden cursor-pointer"
    onClick={toggleDropdown}>
      {/* Add your user profile image here */}
      <img src="/predictoprof.jpeg" alt="User Profile" className="w-full h-full object-cover" />
    </div>
    <div className={`absolute right-0 mt-2 bg-white mr-4 shadow-md rounded-md ${isDropdownOpen ? '' : 'hidden'}`}>
      <ul className="py-2">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">History</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
      </ul>
    </div>
  </div>
</div>

          </div>
        </header>
        </div>
    )
};

export default Header;
