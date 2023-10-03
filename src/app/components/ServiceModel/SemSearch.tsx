import React, { useState, useEffect } from 'react';
import { useBalance } from '../../context/BalanceContext';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface SemanticSearchProps {
  onClose: () => void;
}

const SemanticSearch: React.FC<SemanticSearchProps> = ({onClose}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ sentence: string; similarity_score: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userBalance, updateUserBalance } = useBalance();
  const [error, setError] = useState<string | null>(null);

  const {data: session} = useSession();
  const userEmail = session?.user?.email ?? ''; 

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/semsearch/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            text: query,
          }).toString(),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setResults(data.results);
        try{
          const formData = new FormData();
          formData.append('userEmail', userEmail)
          formData.append('userQuery', query);
          const listOfResults = JSON.stringify(data.results);
          formData.append('results', listOfResults);

          const response = await axios.post(`/api/services/semsearch`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          })

          if(response.data.message){
            console.log('Inserted data successfully')
          }
        
        }
        catch(error){
          console.error('An error occurred while uploading:', error);
          setError('An error occurred while uploading');
        }
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
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-2">AI SemanticSearch</h2>
      <p className="text-sm text-gray-500 mb-4">
        Please note that the model is trained with
         a limited dataset, and some answers may be irrelevant.
      </p>
      <div className="flex space-x-2">
        <input
          className="flex-grow p-2 border rounded"
          type="text"
          placeholder="Search AI-related topics"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={fetchResults}
          disabled={isLoading}
        >
          {isLoading ? <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.854 3 7.979l3-2.688z"></path>
          </svg> : 'Search'}
        </button>
      </div>

      <div className="space-y-2 mt-4 overflow-y-scroll max-h-60">
  {results && results.map((result, index) => (
    <div key={index} className="border p-2 rounded-lg bg-white shadow-md">
      <p className="font-semibold text-blue-500">{result.sentence}</p>
      <p className="text-gray-600">Similarity Score: {result.similarity_score.toFixed(4)}</p>
    </div>
  ))}
</div>
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

export default SemanticSearch;
