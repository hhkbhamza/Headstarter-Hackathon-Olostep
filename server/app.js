const express = require('express');
const scraperRoutes = require('./routes/scraper');

const app = express();

app.use(express.json());

app.use('/api/scraper', scraperRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
