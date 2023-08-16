// components/LandingPage/HeroSection.js
'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform} from 'framer-motion';

const HeroSection = () => {
  
  const [scrolled, setScrolled] = useState(false);
  // const x = useMotionValue(0); // Create a motion value for x
  // const y = useMotionValue(0); // Create a motion value for y


  const getRandomValue = () => Math.random() * 20 - 10; // Generates random value between -10 and 10

  const animateOptions = {
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 5,
      ease: 'easeInOut',
      loop: Infinity,
    },
  };
  const handleScroll = () => {
    if(window.scrollY > 0){
      setScrolled(true);
    }
    else{
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])
  return (
      <div className={`bg-gray-100 py-20 rounded-lg ${scrolled ? 'pt-48' : ''}`}>

        <div className="max-w-6xl max-h-full mx-auto px-4 sm:px-6 lg:px-8 ">
        <motion.div

        initial={{ x: 0, y: 0, scale: 1.2 }}
        animate={{ x: 100, y: 100, scale: 1.2 }} // No need for arrays
        className="relative bg-custom-blue rounded-full shadow-lg ring-4 ring-opacity-50 ring-custom-blue-white logo-animation"
        style={{
          // Set width and height to match the image dimensions
          width: 50,
          height: 50,
        }}
      >
        <Image
          src="/ice-logo.png"
          alt="ice-logo"
          width={50}
          height={50}
        />
      </motion.div>
          <div className="flex items-center justify-between space-evenly">

          <div className="w-full md:w-1/2 lg:w-2/3 z-1000">
            <motion.h1 
            initial={{x:200, scale: 1}}
            animate={{x:0, transition: {duration: 0.5, ease:'easeInOut'}}}
            className="text-4xl font-extrabold text-gray-900 mb-4">
              Welcome to PredictoChain
            </motion.h1>
            <p className="text-xl text-gray-600 mb-6">
              The Future of Predictions Powered by <br /> Machine Learning and Blockchain
            </p>
            <motion.button 
            initial={{y:200, scale: 1}}
            animate={{y:0, transition: {duration: 1, ease:'easeInOut'}}}
            className="px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600">
              Get Started
            </motion.button>
          </div>
          <div className='absolute ml-80 mt-20 z-0'>
          <motion.div

initial={{ x: 0, y: 0, scale: 1.2 }}
animate={{ x: 100, y: 100, scale: 1.2 }} // No need for arrays
className="relative bg-custom-blue rounded-full shadow-lg ring-4 ring-opacity-50 ring-custom-blue-white logo-animation"
style={{
  // Set width and height to match the image dimensions
  width: 50,
  height: 50,
}}
>
<Image
  src="/ice-logo.png"
  alt="ice-logo"
  width={50}
  height={50}
/>
</motion.div>
          <motion.div
      initial={{ y: -200, scale: 1 }}
      animate={{ y: [0, -70, 0, -50, 0, -20, 0], scale: [1.2, 0.8, 1], transition: { duration: 1.5, ease: 'easeInOut' } }}
      className="bg-custom-blue rounded-full inline-block shadow-lg ring-4 ring-opacity-50 ring-custom-blue-white"
    >
      <Image
        src="/ice-logo.png"
        alt="ice-logo"
        width={150}
        height={150}
      />
    </motion.div>
    <motion.div
      initial={{ y: -200, scale: 1 }}
      animate={{ y: [0, -70, 0, -50, 0, -20, 0], scale: [1.2, 0.8, 1], transition: { duration: 2.5, ease: 'easeInOut' } }}
      className="bg-custom-blue rounded-full inline-block ml-5 mr-5 shadow-lg ring-4 ring-opacity-50 ring-custom-blue-white"
    >
      <Image
        src="/ice-logo.png"
        alt="ice-logo"
        width={150}
        height={150}
      />
    </motion.div>
    <motion.div
      initial={{ y: -200, scale: 1 }}
      animate={{ y: [0, -70, 0, -50, 0, -20, 0], scale: [1.2, 0.8, 1], transition: { duration: 1.5, ease: 'easeInOut' } }}
      className="bg-custom-blue rounded-full inline-block shadow-lg ring-4 ring-opacity-50 ring-custom-blue-white"
    >
      <Image
        src="/ice-logo.png"
        alt="ice-logo"
        width={150}
        height={150}
      />
    </motion.div>
    </div>
          <motion.div
          initial={{ x:200, scale: 1 }}
          animate={{ x:0, scale: [1.2, 0.8, 1], transition: {duration: 1.5, ease: 'easeIn'}}}
  className="w-full md:w-1/2 lg:w-1/3 mt-8 md:mt-0 rounded-lg h-full z-20 ml-28 bg-gradient-to-r from-blue-500 to-pink-500"
  style={{
    // Replace with the path to your image
    boxShadow: '0 20px 20px rgba(0, 0, 0, 0.5)' // Add a shadow effect
  }}
>
<Image
            src='/AIHeros.png' 
            alt="My image"
            width={500}
            height={500}
            />
          </motion.div>
        </div>
    </div>
    </div>
  );
};

export default HeroSection;
