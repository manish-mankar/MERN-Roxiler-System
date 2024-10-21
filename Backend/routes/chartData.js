const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/bar-chart', async (req, res) => {
  const { month } = req.query;

  try {
    const matchStage = {
      $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }
    };

    const barChartData = await Transaction.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lte: ['$price', 100] }, then: '0-100' },
                { case: { $lte: ['$price', 200] }, then: '101-200' },
                { case: { $lte: ['$price', 300] }, then: '201-300' },
                { case: { $lte: ['$price', 400] }, then: '301-400' },
                { case: { $lte: ['$price', 500] }, then: '401-500' },
                { case: { $lte: ['$price', 600] }, then: '501-600' },
                { case: { $lte: ['$price', 700] }, then: '601-700' },
                { case: { $lte: ['$price', 800] }, then: '701-800' },
                { case: { $lte: ['$price', 900] }, then: '801-900' },
              ],
              default: '901-above'
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json(barChartData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bar chart data' });
  }
});

router.get('/pie-chart', async (req, res) => {
  const { month } = req.query;

  try {
    const matchStage = {
      $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }
    };

    const pieChartData = await Transaction.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { 'count': -1 } }
    ]);

    res.json(pieChartData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pie chart data' });
  }
});

module.exports = router;