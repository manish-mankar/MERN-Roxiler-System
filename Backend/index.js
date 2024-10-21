const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('MONGODB_URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Import routes
const initDBRoute = require('./routes/initDB');
const transactionsRoute = require('./routes/transactions');
const statisticsRoute = require('./routes/statistics');
const chartDataRoute = require('./routes/chartData');

// Use routes
app.use('/api', initDBRoute);
app.use('/api', transactionsRoute);
app.use('/api', statisticsRoute);
app.use('/api', chartDataRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});