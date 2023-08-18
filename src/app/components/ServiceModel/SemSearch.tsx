import React, { useState, useEffect } from 'react';

const SemanticSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ sentence: string; similarity_score: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

//   useEffect(() => {
//     fetchResults();
//   }, [query]);

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
    </div>
  );
};

export default SemanticSearch;
