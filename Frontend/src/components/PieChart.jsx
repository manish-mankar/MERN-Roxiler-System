import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const PieChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  const [month, setMonth] = useState(3); // Default to March

  useEffect(() => {
    fetchChartData();
  }, [month]);

  const fetchChartData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pie-chart`, {
        params: { month }
      });
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Category Distribution</h2>
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
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="_id"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;