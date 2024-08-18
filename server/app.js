require('dotenv').config({ path: './.env.local' });
const express = require('express');
const mongoose = require('mongoose');
const scraperRoutes = require('./routes/scraper');

const app = express();


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());

app.use('/api/scraper', scraperRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});