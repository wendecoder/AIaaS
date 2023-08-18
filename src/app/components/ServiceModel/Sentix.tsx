import React, { useState } from 'react';

interface SentimentResponse {
  sentiment: string;
  error?: string;
}

const Sentix: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [sentimentResult, setSentimentResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-2 text-center">Sentiment Analysis</h2>
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
                  {isLoading ? <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.854 3 7.979l3-2.688z"></path>
          </svg> : 'Analyze'}
      </button>

      {sentimentResult && (
        <div className="mt-4">
          <h3 className="text-lg font-bold text-center">Sentiment Result</h3>
          <p className="mt-2 text-center">{sentimentResult}{sentimentEmojiMap[sentimentResult]}</p>
          
        </div>
      )}
    </div>
  );
};

export default Sentix;
