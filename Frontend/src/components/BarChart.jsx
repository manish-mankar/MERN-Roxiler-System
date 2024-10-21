import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  const [month, setMonth] = useState(1); 

  useEffect(() => {
    fetchChartData();
  }, [month]);

  const fetchChartData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bar-chart`, {
        params: { month }
      });
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Price Range Distribution</h2>
      <select
        value={month}
        onChange={(e) => setMonth(parseInt(e.target.value))}
        className="mb-4 p-2 border rounded"
      >
        {[...Array(12)].map((_, i) => (
          <option key={i} value={i + 1}>
            {new Date(0, i).toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;