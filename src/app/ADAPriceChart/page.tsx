'use client'
import React, { useState, useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
import { ChartConfiguration, ChartType } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

type PriceData = { x: Date; y: number };

const ADAPriceChart: React.FC = () => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [bidDirection, setBidDirection] = useState<'up' | 'down' | ''>('');
  const [bidTime, setBidTime] = useState<number | null>(null);

  useEffect(() => {
    // Your websocket setup logic here...
    const api_key = 'UVfEWYppLK2RJ4MnCcqo37KTuG0zUP2M4w2gFZ2051vNdcHybbowZTB2HCYpBpgK'
    const websocketUrl = `wss://stream.binance.com:9443/ws/adausdt@trade/${api_key}`;

    const newSocket = new WebSocket(websocketUrl);

    newSocket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      const { p, T } = data;

      setPriceData((prevPriceData) => {
        const newData = [...prevPriceData, { x: new Date(T), y: parseFloat(p) }];
        return newData;
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const handlePlaceBid = (direction: 'up' | 'down') => {
    setBidDirection(direction);
    setBidTime(Date.now() + 30000); // Set bid time 30 seconds from now
  };

  const chartData = {
    labels: priceData.map((dataPoint) => dataPoint.x),
    datasets: [
      {
        label: 'ADA/USD Price',
        data: priceData.map((dataPoint) => ({ x: dataPoint.x, y: dataPoint.y })),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 0, // Remove line
        pointRadius: 4, // Set point size
        pointBackgroundColor: (context: any) => {
          const index = context.dataIndex;
          if (index === priceData.length - 1 && bidTime && Date.now() >= bidTime) {
            return bidDirection === 'up' ? 'green' : 'red';
          }
          return 'rgba(75, 192, 192, 1)';
        },
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 bg-white">
      <h2 className="text-xl font-semibold text-center">ADA Price Movement Prediction</h2>
      <div className="relative">
        <Line data={chartData} options={{ maintainAspectRatio: false }} height={300} />
        {bidTime && (
          <div
            className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-blue-500 bg-opacity-50"
            style={{ pointerEvents: 'none' }}
          >
            <p className="text-white font-semibold">
              Placing a {bidDirection} bid at {new Date(bidTime).toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => handlePlaceBid('up')}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded"
        >
          Place Up Bid
        </button>
        <button
          onClick={() => handlePlaceBid('down')}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded"
        >
          Place Down Bid
        </button>
      </div>
      <div className="flex space-x-4 items-center">
        <label className="font-semibold">Set Bidding Time:</label>
        <input
          type="time"
          className="border rounded px-2 py-1"
          value={bidTime ? new Date(bidTime).toLocaleTimeString('en-GB', { timeStyle: 'short' }) : ''}
          onChange={(e) => setBidTime(new Date(`2000-01-01 ${e.target.value}`).getTime())}
        />
      </div>
    </div>
  );
};

export default ADAPriceChart;