// components/CryptoRushItem.tsx
import React, { useEffect, useState } from 'react';

type CryptoRushItemProps = {
  data: {
    gameId: string;
    betAmount: number;
    betTime: string;
    result: string;
  };
};

const CryptoRushItem: React.FC<CryptoRushItemProps> = ({ data }) => {
  const [formattedBetTime, setFormattedBetTime] = useState<string | null>(null);

  useEffect(() => {
    // Parse the ISO 8601 timestamp when data.betTime changes
    const betTimeDate = new Date(data.betTime);

    // Format the date and time
    const formattedTime = `${betTimeDate.toLocaleDateString()} ${betTimeDate.toLocaleTimeString()}`;

    // Set the formatted time in the state
    setFormattedBetTime(formattedTime);
  }, [data.betTime]);
  return (
    <div className="bg-white border p-4 rounded-md shadow-md">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold my-2">Game ID: {data.gameId}</h2>
        <p className="text-gray-700 my-2">Bet Amount: {data.betAmount} PCT</p>
        <p className="text-gray-700 my-2">Bet Time: {formattedBetTime || 'Loading...'}</p>
        <p className="text-gray-700 my-2">Result: {data.result}</p>
      </div>
    </div>
  );
};

export default CryptoRushItem;
