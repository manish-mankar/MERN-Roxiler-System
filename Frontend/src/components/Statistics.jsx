import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = () => {
  const [statistics, setStatistics] = useState({});
  const [month, setMonth] = useState(3); // Default to March

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/statistics`, {
        params: { month }
      });
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Transaction Statistics</h2>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="font-bold">Total Sale Amount</h3>
          <p>${statistics.totalSaleAmount?.toFixed(2) || 0}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-bold">Total Sold Items</h3>
          <p>{statistics.totalSoldItems || 0}</p>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <h3 className="font-bold">Total Not Sold Items</h3>
          <p>{statistics.totalNotSoldItems || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;