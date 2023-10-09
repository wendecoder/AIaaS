// components/SentixItem.tsx
import React from 'react';

type SentixItemProps = {
  data: {
    sentence: string;
    result: string;
  };
};

const SentixItem: React.FC<SentixItemProps> = ({ data }) => {
  return (
    <div className="bg-white border p-4 rounded-md shadow-md">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold my-2">Sentence: {data.sentence}</h2>
        <p className="text-gray-700 my-2">Result: {data.result}</p>
      </div>
    </div>
  );
};

export default SentixItem;
