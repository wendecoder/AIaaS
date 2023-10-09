// components/Tabs.tsx
import React from 'react';

type TabsProps = {
  services: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ services, activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-10 justify-center">
      {services.map((service) => (
        <button
          key={service}
          onClick={() => setActiveTab(service)}
          className={`${
            activeTab === service
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-700'
          } px-4 py-2 rounded-md`}
        >
          {service}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
