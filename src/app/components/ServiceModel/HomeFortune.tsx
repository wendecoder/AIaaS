import React, { useState } from 'react';

const cities = ['Addis Ababa', 'Adama', 'BahirDar', 'Hawassa'];

const HomeFortune = () => {
  const [location, setLocation] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [area, setArea] = useState('');
  const [proximity, setProximity] = useState('');
  const [predictedPrice, setPredictedPrice] = useState(0);

  const handlePredict = () => {
    // Perform prediction logic here
    // You can use APIs, ML models, or any prediction mechanism
    // For now, let's just set a random price as a placeholder
    const randomPrice = Math.floor(Math.random() * 1000000) + 50000;
    setPredictedPrice(randomPrice);
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
    </div>
  );
};

export default HomeFortune;
