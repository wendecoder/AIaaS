'use client'
import React, { Suspense, useState } from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

const App = () => {
  const [data, setData] = useState([
    {
      name: "January",
      value: 100,
    },
    {
      name: "February",
      value: 200,
    },
    {
      name: "March",
      value: 300,
    },
    {
      name: "April",
      value: 400,
    },
    {
      name: "May",
      value: 500,
    },
  ]);

  return (
    <Suspense fallback={null}>
      <div>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </Suspense>
  );
};

export default App;