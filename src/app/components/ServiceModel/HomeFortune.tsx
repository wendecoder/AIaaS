import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useBalance } from '../../context/BalanceContext';
import useFetchUserBalance from '@/app/customHooks/useFetchUserBalance';
import useUpdateUserBalance from '@/app/customHooks/useUpdateUserBalance';

const cities = ['Addis Ababa', 'Adama', 'BahirDar', 'Hawassa'];

interface HomeFortuneProps {
  onClose: () => void;
}

const HomeFortune: React.FC<HomeFortuneProps> = ({onClose}) => {
  const [location, setLocation] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [area, setArea] = useState('');
  const [proximity, setProximity] = useState('');
  const [predictedPrice, setPredictedPrice] = useState(0);
  const { userBalance, updateUserBalance } = useBalance();

  // Use the useSession hook to access user information
  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? '';
  console.log(userEmail);
  // const [userBalance, setUserBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // const fetchUserBalance = async () => {
  //   if (userEmail) {
  //     try {
  //       const headers = {
  //         'Content-Type': 'application/json', // Set the content type as needed
  //         'Accept': '*/*'// Add other headers if necessary
  //       };
  //       const data = {
  //          email: userEmail,
  //       };
  //       const response = await axios.post('/api/user/userBalance', data, { headers} );

  //       setUserBalance(response.data);
  //     } catch (error) {
  //       console.error('Error fetching user balance:', error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchUserBalance();
  // }, [userEmail]);

  const handlePredict = async () => {
    // Perform prediction logic here
    // You can use APIs, ML models, or any prediction mechanism
    // For now, let's just set a random price as a placeholder
    const randomPrice = Math.floor(Math.random() * 1000000) + 50000;
    setPredictedPrice(randomPrice);
    // Update the user balance
    try {
      // Deduct the appropriate amount from the user's balance
      const deductionAmount = 10; // Adjust this as needed
      await updateUserBalance(userEmail, deductionAmount);

      // Show a success toast notification with the deducted amount
      toast.success(`Deducted ${deductionAmount} ETB from your balance`);
    } catch (error) {
      // Handle any errors that occur during balance update
      console.error('Error updating balance:', error);
      setError('Failed to update balance');
    }
    
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Home Price Predictor</h2>
      <div className="mb-4">
        <label htmlFor="location" className="block font-semibold">
          Location
        </label>
        <select
          id="location"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="bedrooms" className="block font-semibold">
          Number of Bedrooms
        </label>
        <input
          type="number"
          id="bedrooms"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="area" className="block font-semibold">
          Area (in square meters)
        </label>
        <input
          type="number"
          id="area"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="proximity" className="block font-semibold">
          Proximity to Social Services
        </label>
        <input
          type="text"
          id="proximity"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={proximity}
          onChange={(e) => setProximity(e.target.value)}
        />
      </div>
      <button
        className="px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
        onClick={handlePredict}
      >
        Predict
      </button>
      {predictedPrice !== null && (
        <div className="mt-4">
          <p className="font-semibold">Predicted Price:</p>
          <p>{predictedPrice} ETB</p>
        </div>
      )}
      {error && (
          <p className="mt-4 text-red-500">{error}</p>
        )}

        {/* Display user balance */}
        {userBalance !== null && (
          <div className="mt-4">
            <p className="font-semibold">User Balance:</p>
            <p className="font-semibold rounded-md text-white bg-black w-32 p-5">{userBalance} PCT</p>
          </div>
        )}
      <button
          className="w-full mt-2 bg-gray-300 text-gray-700 py-2 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
    </div>
  );
};

export default HomeFortune;
function setError(arg0: string) {
  throw new Error('Function not implemented.');
}

