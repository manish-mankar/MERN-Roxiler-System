const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/statistics', async (req, res) => {
  const { month } = req.query;

  try {
    const matchStage = {
      $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }
    };

    const statistics = await Transaction.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: '$price' },
          totalSoldItems: { $sum: { $cond: ['$sold', 1, 0] } },
          totalNotSoldItems: { $sum: { $cond: ['$sold', 0, 1] } }
        }
      }
    ]);

    res.json(statistics[0] || { totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching statistics' });
  }
});

module.exports = router;