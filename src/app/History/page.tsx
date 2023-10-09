// pages/history.tsx
import React from 'react';
import HistoryPage from '../components/HistoryPage';

const services = ['medicognize', 'aniclassify', 'sentix', 'cryptorush', 'aisemanticsearch'];

const History: React.FC = () => {
  return (
    <div className="bg-white w-auto h-screen">
      <h1 className="text-3xl p-8 text-center font-semibold">History Page</h1>
      <HistoryPage services={services} initialTab="medicognize" />
    </div>
  );
};

export default History;
