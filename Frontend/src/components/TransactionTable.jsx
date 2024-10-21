import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState(3); // Default to March
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions`, {
        params: { month, search, page, perPage: 10 },
      });
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside the range of 2xx
        console.error('Error fetching transactions:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value, 10))}
          className="mr-4 p-2 border rounded"
        >
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search transactions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Sold</th>
            <th className="border p-2">Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="border p-2">{transaction.id}</td>
                <td className="border p-2">{transaction.title}</td>
                <td className="border p-2">${transaction.price.toFixed(2)}</td>
                <td className="border p-2">{transaction.description}</td>
                <td className="border p-2">{transaction.category}</td>
                <td className="border p-2">{transaction.sold ? 'Yes' : 'No'}</td>
                <td className="border p-2">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="border p-2 text-center">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
