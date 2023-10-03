'use client'
import React, { useState, useEffect } from 'react';

// Define regions and their corresponding rewards
const regions = [
  { name: 'Region 1', minReward: 10, maxReward: 100 },
  { name: 'Region 2', minReward: 110, maxReward: 200 },
  { name: 'Region 3', minReward: 210, maxReward: 300 },
  { name: 'Region 4', minReward: 310, maxReward: 400 },
  { name: 'Region 5', minReward: 410, maxReward: 500 },
  { name: 'Region 6', minReward: 510, maxReward: 600 },
  { name: 'Region 7', minReward: 610, maxReward: 700 },
  { name: 'Region 8', minReward: 710, maxReward: 1000 },
];

const WheelOfFortune: React.FC = () => {
  const [reward, setReward] = useState<number | null>(null);
  const [canSpin, setCanSpin] = useState<boolean>(true);

  const spinWheel = async () => {
    if (!canSpin) {
      return;
    }

    // Generate a random region index
    const randomRegionIndex = Math.floor(Math.random() * regions.length);
    const selectedRegion = regions[randomRegionIndex];

    // Generate a random reward within the region's range
    const randomReward = Math.floor(
      Math.random() * (selectedRegion.maxReward - selectedRegion.minReward + 1) +
        selectedRegion.minReward
    );

    const wheel = document.querySelector('.wheel') as HTMLElement;
if (wheel) {
  const rotationAngle = 1440 + (randomRegionIndex * (360 / regions.length));
  wheel.style.transition = 'transform 5s ease-out';
  wheel.style.transform = `rotate(${rotationAngle}deg)`;
}


    // Update the user's balance with the reward
    // You can call an API to update the user's balance here
    // For now, we'll just set the reward in the state
    setReward(randomReward);

    // Disable spinning for the day
    setCanSpin(false);
    // Store the current date to limit spins per day
    localStorage.setItem('lastSpinDate', new Date().toISOString());
  };

  useEffect(() => {
    // Check if the user has already spun the wheel today
    const lastSpinDate = localStorage.getItem('lastSpinDate');
    if (lastSpinDate) {
      const today = new Date();
      const lastSpin = new Date(lastSpinDate);
      const timeDifference = today.getTime() - lastSpin.getTime();
      // Allow spinning after 24 hours
      if (timeDifference >= 24 * 60 * 60 * 1000) {
        setCanSpin(true);
      }
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Wheel of Fortune</h2>
      <div className="wheel relative w-96 h-96 mx-auto">
        <div className="wheel-base absolute rounded-full border-4 border-yellow-500 w-full h-full"></div>
        {regions.map((region, index) => {
          const rotationDegree = (360 / regions.length) * index;
          const background = index % 2 === 0 ? 'bg-blue-500' : 'bg-green-500'; // Example background colors
          return (
            <div
              key={region.name}
              className={`region absolute w-auto h-auto p-2 text-white font-semibold text-lg rounded-full flex items-center justify-center ${background}`}
              style={{
                transform: `rotate(${rotationDegree}deg)`,
              }}
              onClick={spinWheel}
            >
              {region.name}
            </div>
          );
        })}
      </div>
      <button
        onClick={spinWheel}
        disabled={!canSpin}
        className="block mx-auto mt-6 px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Spin the Wheel
      </button>
      {reward !== null && (
        <p className="mt-4 text-xl font-semibold text-green-500">
          You won {reward} PCT tokens!
        </p>
      )}
    </div>
  );
};

export default WheelOfFortune;
