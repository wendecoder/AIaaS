'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import IceWidget from "../IceWidget";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


const Header = () => {
    const [headerBackground, setHeaderBackground] = useState('header-initial');
  const [childrenPadding, setChildrenPadding] = useState('');
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
  const router = useRouter();
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

<div className='flex items-center justify-center mt-5 mb-10'>
  <button
    onClick={() => {
      router.push('/LoginAndSignup')// Replace 'UserPage' with the actual path to your UserPage component
    }}
    className='px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 mr-5'
  >
    Login
  </button>
  <button
    onClick={() => {
      router.push('/LoginAndSignup') // Replace 'UserPage' with the actual path to your UserPage component
    }}
    className='px-6 py-3 text-lg font-bold text-white bg-green-500 mr-5 rounded-lg shadow-md hover:bg-green-600'
  >
    Signup
  </button>
</div>
          </div>
        </header>
        </div>
    )
};

export default Header;
