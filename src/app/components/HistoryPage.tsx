// components/HistoryPage.tsx
'use client'
import React, { useState, useEffect } from 'react';
import Tabs from './Tabs';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import MedicognizeItem from './MedicognizeItem';
import CryptoRushItem from './CryptoRushItem';
import SentixItem from './SentixItem';
import AIsemanticSearchItem from './AIsemanticSearchItem';
import AniClassifyItem from './AniClassifyItem';


type HistoryPageProps = {
  services: string[];
  initialTab: string;
};

const HistoryPage: React.FC<HistoryPageProps> = ({ services, initialTab }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const {data: session} = useSession();
  const UserEmail = session?.user?.email ?? '';

  useEffect(() => {
    const fetchHistoryData = async (service: string) => {
        try {
            const response = await axios.post(`/api/${service}`, { UserEmail }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
          if (!response) {
            throw new Error('Failed to fetch history data');
          }
    
          const data = response.data;
          setHistoryData(data);
        } catch (error) {
          console.error('Error while fetching history data:', error);
        }
      };
    // Fetch history data based on the active tab
    fetchHistoryData(activeTab);
  }, [activeTab]);

  // console.log(historyData);
  

  return (
    <div>
      <Tabs services={services} activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Display history data based on the active tab */}
      <div className="mt-4">
        {historyData.map((item) => (
          <div key={item.id}>
            {activeTab === 'medicognize' && <MedicognizeItem data={item} />}
            {activeTab === 'aniclassify' && <AniClassifyItem data={item} />}
            {activeTab === 'sentix' && <SentixItem data={item} />}
            {activeTab === 'cryptorush' && <CryptoRushItem data={item} />}
            {activeTab === 'aisemanticsearch' && <AIsemanticSearchItem data={item} />}
            {/* Render other feature components based on the active tab */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
