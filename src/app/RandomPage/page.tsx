'use client'

import React, { useState, useEffect } from 'react';

const MyPage = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This effect will be called when the component mounts and whenever the count state changes.
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      // This cleanup function will be called when the component unmounts.
      clearInterval(interval);
    };
  }, [count]);

  return (
    <div>
      <h1>The current count is {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default MyPage;
