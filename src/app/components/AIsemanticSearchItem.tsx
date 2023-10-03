// components/AIsemanticSearchItem.tsx
import React, { useEffect, useState } from 'react';

type AIsemanticSearchItemProps = {
  data: {
    userQuery: string;
    results: string;
  };
};

const AIsemanticSearchItem: React.FC<AIsemanticSearchItemProps> = ({ data }) => {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (data.results) {
      // Parse the JSON string into an array and update the state
      setResults(JSON.parse(data.results));
    }
  }, [data.results]);
  return (
    <div className="bg-white border p-4 rounded-md shadow-md">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold my-2">User Query: {data.userQuery}</h2>
        <p className="text-gray-700 my-2">Results: </p>
        {results && results.map((result: { sentence: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; similarity_score: number; }, index: React.Key | null | undefined) => (
    <div key={index} className="border p-2 m-2 w-96 rounded-lg bg-white shadow-md">
      <p className="font-semibold text-blue-500">{result.sentence}</p>
      <p className="text-gray-600">Similarity Score: {result.similarity_score.toFixed(4)}</p>
    </div>))}
      </div>
    </div>
  );
};

export default AIsemanticSearchItem;
