// Loading.js
import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <motion.div
        style={{
          width: '25px',
          height: '25px',
          borderRadius: '50%',
          backgroundColor: 'black', // You can customize the color here
        }}
        initial={{x:300, opacity:0}}
        animate={{
          opacity:1
        }}
        transition={{
          loop: Infinity, // Infinite loop for the rotation
          duration: 1, // Each rotation takes 1 second
          ease: 'linear', // Linear animation
        }}
      ></motion.div>
    </div>
  );
};

export default Loading;
