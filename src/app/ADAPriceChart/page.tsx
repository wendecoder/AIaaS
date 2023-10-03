'use client'
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import  Header  from "../components/UserPage/Header"
import { useSession } from 'next-auth/react';
import { insertGameHistory } from '../customHooks/updateCryptoRush'
import { Chart as ChartJS, registerables } from 'chart.js';
import axios from 'axios';
ChartJS.register(...registerables);

type PriceData = { x: string; y: number };

type Game = {
  gameId: string;
  amount: number;
  time: string;
  Result: string; // You can set this based on your logic
};

const ADAPriceChart: React.FC = () => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [bidDirection, setBidDirection] = useState<'up' | 'down' | ''>('');
  const [bidStartTime, setBidStartTime] = useState<number | null>(null);
  const [bidPeriod, setBidPeriod] = useState<number | ''>(30000); // Default bid period is 30 seconds
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [bidEndTime, setBidEndTime] = useState<number | null>(null);
  const [initialPrice, setInitialPrice] = useState<number | null>(null); // State for initial price
  const [gameHistory, setGameHistory] = useState<Game[]>([]);
  const [bidAmountLessThanTwenty, setBidAmountLessThanTwenty] = useState<Boolean>(false);
  const [scrolled, setScrolled] = useState<Boolean | null>(null);

  const { data: session} = useSession();
  const userEmail = session?.user?.email;

const generateRandomGameId = () => {
  // Generate a random string for game ID and ensure it has a length of 10
  return Math.random().toString(36).substring(2, 12);
};

  const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',
      };

      // Define predefined bidding period options (in milliseconds)
  const predefinedBidPeriods = {
    '30s': 30000,
    '1m': 60000,
    '1m30s': 90000,
    '2m': 120000,
    '5m': 300000,
  };

  useEffect(() => {
    const api_key = 'YOUR_API_KEY';
    const websocketUrl = `wss://stream.binance.com:9443/ws/adausdt@trade/${api_key}`;

    const newSocket = new WebSocket(websocketUrl);
console.log('hey');
    newSocket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      const { p, T } = data;
      

      const MAX_VISIBLE_POINTS = 30;

      setPriceData((prevPriceData) => {
        const newData = [
          ...prevPriceData,
          { x: new Date(T).toLocaleTimeString('en-US', timeOptions), y: parseFloat(p) },
        ];
        if (newData.length > MAX_VISIBLE_POINTS) {
          return newData.slice(newData.length - MAX_VISIBLE_POINTS);
        }
        return newData;
      });
      
    });

    return () => {
      newSocket.close();
    };
  }, []);

 const handleScroll = () => {
    if(window.scrollY > 0){
      setScrolled(true);
    }
    else{
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  const handlePlaceBid = (direction: 'up' | 'down') => {
    if(bidAmount >= 20){
      setBidAmountLessThanTwenty(false);
      setBidDirection(direction);
    setBidStartTime(Date.now());
    // Set initialPrice to the last price in priceData
    if (priceData.length > 0) {
      setInitialPrice(priceData[priceData.length - 1].y);
    }
    if (typeof bidPeriod === 'number') {
  setBidEndTime(Date.now() + bidPeriod);
    }
} else{
  setBidAmountLessThanTwenty(true);
}
  };
  const X_AXIS_INTERVAL = 30000;
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPriceData((prevPriceData) => {
        if (prevPriceData.length > 0) {
          const newData = [...prevPriceData];
          newData.shift();
          return newData;
        }
        return prevPriceData;
      });
    }, X_AXIS_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  useEffect(() => {
    if (typeof bidStartTime === 'number' && bidAmount >= 20) {
      const alertMessage = `You have set a bid with ${bidAmount} PCT successfully.`;
      const alertStyles: React.CSSProperties = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'green',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontWeight: 'bold',
      };

      const alertElement = document.createElement('div');

      Object.entries(alertStyles).forEach(([property, value]) => {
        alertElement.style[property as any] = value;
      });

      alertElement.innerText = alertMessage;
      document.body.appendChild(alertElement);

      setTimeout(() => {
        document.body.removeChild(alertElement);
      }, 5000);
    } else if(bidAmountLessThanTwenty) {
      const alertMessage = `The minimum amount to bid is 20 PCT`;
      const alertStyles: React.CSSProperties = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'red',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontWeight: 'bold',
      };
      const alertElement = document.createElement('div');

      Object.entries(alertStyles).forEach(([property, value]) => {
        alertElement.style[property as any] = value;
      });

      alertElement.innerText = alertMessage;
      document.body.appendChild(alertElement);

      setTimeout(() => {
        document.body.removeChild(alertElement);
      }, 5000);
    }
  }, [bidStartTime, bidAmountLessThanTwenty]);

  useEffect(() => {
    if(typeof bidStartTime === 'number' && initialPrice !== null){
    if (bidEndTime && Date.now() >= bidEndTime) {
      const finalPrice = priceData[priceData.length - 1].y;
        const result = bidDirection === 'up' ? finalPrice > initialPrice : finalPrice < initialPrice;
        let gameresult;
        if (result) {
          gameresult = 'Won';
        } else {
          gameresult = 'Lost';
        }
        const alertMessage = result ? 'Congratulations! You won!' : 'Sorry! You lost.';
        const alertColor = result ? 'green' : 'red';
      // Create a new game entry
  const newGame: Game = {
    gameId: generateRandomGameId(),
    amount: bidAmount,
    time: new Date().toLocaleTimeString('en-US', timeOptions),
    Result: gameresult, // Set result based on your logic
  };

  // Update game history with the new game
  setGameHistory((prevHistory) => [...prevHistory, newGame]);
        const alertStyles: React.CSSProperties = {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: alertColor,
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          fontWeight: 'bold',
        };
      
        const alertElement = document.createElement('div');
      
        Object.entries(alertStyles).forEach(([property, value]) => {
          alertElement.style[property as any] = value;
        });
      
        alertElement.innerText = `${alertMessage}\nInitial Price: ${initialPrice}\nFinal Price: ${finalPrice}`;
        document.body.appendChild(alertElement);
      
        setTimeout(() => {
          document.body.removeChild(alertElement);
        }, 5000);
      
        setBidEndTime(null);
      }
    }
  }, [bidEndTime, priceData]);


useEffect(() => {
  const saveGameHistory = async () => {
    if (gameHistory.length > 0) {
      try {
        // Save the last element of gameHistory
        const lastGame = gameHistory[gameHistory.length - 1];
        const isoFormattedTime = new Date().toISOString();
        await axios.post('/api/game-history', { userEmail, lastGame}, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Data saved successfully.');
      } catch (error) {
        console.error('Failed to save data:', error);
      }
    }
  };

  // Call saveGameHistory whenever gameHistory changes
  saveGameHistory();
}, [gameHistory]); // Listen for changes in gameHistory

  

  const chartData = {
    labels: priceData.map((dataPoint) => dataPoint.x),
    datasets: [
      {
        label: 'ADA/USD Price',
        data: priceData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        pointRadius: 3,
        pointBackgroundColor: (context: any) => {
          const index = context.dataIndex;
          if (index === priceData.length - 1 && bidEndTime && Date.now() >= bidEndTime) {
            return bidDirection === 'up' ? 'green' : 'red';
          }
          return 'rgba(75, 192, 192, 1)';
        },
        fill: false,
      },
    ],
  };

  return (
    <>
    <Header/>
    <div className={`p-6 space-y-6 ${scrolled ? 'pt-28' : ''} bg-white`}>
      <h2 className="text-xl font-semibold text-center">ADA Price Movement Prediction</h2>
      <div className="relative mr-32">
        <p className="absolute text-4xl font-semibold opacity-25 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          PredictoChain
        </p>
        <Line data={chartData} options={{ maintainAspectRatio: false }} height={300} />
        {bidEndTime && (
          <div
            className="absolute top-0 left-0 right-0 bottom-0 flex bg-opacity-50"
            style={{ pointerEvents: 'none' }}
          >
            <p className="text-black font-semibold">
              Bid ends at {new Date(bidEndTime).toLocaleTimeString()}
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
        <label className="font-semibold">Set Bidding Period (ms):</label>
        <select
          className="border rounded px-2 py-1"
          value={bidPeriod}
          onChange={(e) => setBidPeriod(parseInt(e.target.value))}
        >
          {Object.entries(predefinedBidPeriods).map(([label, value]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <label className="font-semibold">Amount to Bid:</label>
        <input
  type="number"
  className="border rounded px-2 py-1"
  value={bidAmount}
  onChange={(e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 15) {
      setBidAmount(value);
    }
  }}
  min="16" // Minimum allowed value is 16 (greater than 15)
/>

      </div>
      <div className='w-full bg-slate-500 rounded-md h-auto p-5'>
  <div className='grid grid-cols-4 gap-2 text-amber-200 text-2xl'>
    <div className='font-bold text-center'>Game ID</div>
    <div className='font-bold text-center'>Amount</div>
    <div className='font-bold text-center'>Time</div>
    <div className='font-bold text-center'>Result</div>
  </div>
  {gameHistory.map((game, index) => (
    <div key={index} className='grid grid-cols-4 gap-2 items-center mt-2'>
      <div className='rounded-md bg-blue-500 pl-5 pr-5 text-white text-center font-normal'>
        {game.gameId}
      </div>
      <div className='rounded-md bg-purple-500 pl-5 pr-5 text-white text-center font-normal'>
        {game.amount} PCT
      </div>
      <div className='rounded-md bg-pink-500 pl-5 pr-5 text-white text-center font-normal'>
        {game.time}
      </div>
      <div className={`rounded-md ${game.Result === 'Won' ? 'bg-green-500' : 'bg-red-500'} pl-5 pr-5 text-white text-center font-normal`}>
        {game.Result}
      </div>
    </div>
  ))}
</div>

    </div>
    </>
  );
};

export default ADAPriceChart;
