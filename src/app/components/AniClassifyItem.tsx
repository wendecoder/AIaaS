// components/AniClassifyItem.tsx
import React from 'react';

type AniClassifyItemProps = {
  data: {
    animalImage: string;
    result: string;
  };
};

const AniClassifyItem: React.FC<AniClassifyItemProps> = ({ data }) => {
  return (
    <div className="bg-white border p-4 rounded-md shadow-md">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold my-2">Animal Image:</h2>
        <img src={data.animalImage} alt="Animal" className="w-24 h-24 object-cover rounded-md" />
        <p className="text-gray-700 my-2">Result: {data.result}</p>
      </div>
    </div>
  );
};

export default AniClassifyItem;
