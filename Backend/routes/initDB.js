const express = require('express');
const router = express.Router();
const axios = require('axios');
const Transaction = require('../models/Transaction');

router.get('/init-db', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    await Transaction.deleteMany({});
    await Transaction.insertMany(transactions);

    res.json({ message: 'Database initialized successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error initializing database' });
  }
});

module.exports = router;