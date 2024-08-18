import React from 'react';
import ScraperForm from './components/scraperForm';
import ScrapedData from './components/displayScrape';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <ScraperForm />
      <ScrapedData />
    </div>
  );
}

export default App;
