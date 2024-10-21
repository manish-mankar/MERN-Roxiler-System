const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/transactions', async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;
  const skip = (page - 1) * perPage;

  try {
    let query = { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: parseFloat(search) || 0 }
      ];
    }

    const transactions = await Transaction.find(query)
      .skip(skip)
      .limit(parseInt(perPage));

    const total = await Transaction.countDocuments(query);

    res.json({
      transactions,
      total,
      page: parseInt(page),
      perPage: parseInt(perPage),
      totalPages: Math.ceil(total / perPage)
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transactions' });
  }
});

module.exports = router;