// components/MedicognizeItem.tsx
import React from 'react';

type MedicognizeItemProps = {
  data: {
    diseaseType: string;
    diseaseImage: string;
    result: string;
  };
};

const MedicognizeItem: React.FC<MedicognizeItemProps> = ({ data }) => {
  return (
    <div className="bg-white border p-4 rounded-md shadow-md">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold my-2">Disease Type: {data.diseaseType}</h2>
        <img src={data.diseaseImage} alt="Disease" className="w-24 h-24 object-cover rounded-md" />
        <p className="text-gray-700 my-2">Result: {data.result}</p>
      </div>
    </div>
  );
};

export default MedicognizeItem;
