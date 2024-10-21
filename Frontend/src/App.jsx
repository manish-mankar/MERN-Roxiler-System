import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionTable from "./components/TransactionTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="text-3xl font-bold text-center my-4">
          Product Transactions Dashboard
        </h1>
        <Routes>
          <Route path="/" element={<TransactionTable />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/bar-chart" element={<BarChart />} />
          <Route path="/pie-chart" element={<PieChart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
