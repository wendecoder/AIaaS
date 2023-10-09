'use client'
import React, { useState } from 'react';
import Login from '../components/loginAndSignup/Login';
import Signup from '../components/loginAndSignup/Signup';

const HomePage: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleSwap = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='h-screen'>
      <div className='transition-container'>
        {/* Apply the "active" class based on the "isLogin" state */}
        <div className={`content ${isLogin ? 'active' : ''}`}>
          <Login onSwap={handleSwap} />
        </div>
        <div className={`content ${!isLogin ? 'active' : ''}`}>
          <Signup onSwap={handleSwap} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
