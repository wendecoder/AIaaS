import React, { useState } from 'react';
import { useBalance } from '@/app/context/BalanceContext';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface SentimentResponse {
  sentiment: string;
  error?: string;
}

interface SentixProps {
  onClose: () => void;
}

const Sentix: React.FC<SentixProps> = ({ onClose }) => {
  const [inputText, setInputText] = useState('');
  const [sentimentResult, setSentimentResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {userBalance, updateUserBalance} = useBalance();

  const {data: session} = useSession();
  const userEmail = session?.user?.email ?? '';

  const sentimentEmojiMap: Record<string, string> = {
    Positive: '😄', // Smiley emoji
    Neutral: '😐',   // Neutral emoji
    Negative: '😠',  // Angry emoji
  };

  const analyzeSentiment = async () => {
    setIsLoading(true);
    if (inputText) {
      try {
        const response = await fetch('http://127.0.0.1:8000/sentix/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // You may need to include additional headers if required
          },
          body: new URLSearchParams({
            text: inputText,
          }).toString(),
        });

        if (response.ok) {
          const data: SentimentResponse = await response.json();
          if (data.sentiment) {
            setSentimentResult(data.sentiment); // Update the sentiment result state
            setError(null);
            // Update the user balance
          try{

            const formData = new FormData();
            formData.append('userEmail', userEmail);
            formData.append('sentence', inputText);
            formData.append('sentResult', data.sentiment as string | '');

            const response = await axios.post(`/api/services/sentix`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            if(response.data.message){
              console.log("Inserted the data successfully")
            }
            // Update the user balance
          }
          catch (error){
          }
          try {
            // Deduct the appropriate amount from the user's balance
            const deductionAmount = 50; // Adjust this as needed
            await updateUserBalance(userEmail, deductionAmount);
    

            // Show a success toast notification with the deducted amount
            toast.success(`Deducted ${deductionAmount} PCT from your balance`);
          } catch (error) {
            // Handle any errors that occur during balance update
            console.error('Error updating balance:', error);
            setError('Failed to update balance');
          }
          }

        } else {
          console.error('API request failed');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Sentiment Analysis</h2>
        <p className="mb-4 text-center">
          Enter text to analyze its sentiment and see the emotional tone of the text.
        </p>
        <textarea
          className="w-full p-2 border rounded"
          rows={4}
          placeholder="Enter text for sentiment analysis"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
          onClick={analyzeSentiment}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.854 3 7.979l3-2.688z"></path>
            </svg>
          ) : (
            'Analyze'
          )}
        </button>

        {sentimentResult && (
          <div className="mt-4">
            <h3 className="text-lg font-bold text-center">Sentiment Result</h3>
            <p className="mt-2 text-center">
              {sentimentResult} {sentimentEmojiMap[sentimentResult]}
            </p>
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
        <button className="w-full mt-2 bg-gray-300 text-gray-700 py-2 rounded-lg" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Sentix;
