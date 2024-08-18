import React, { useState } from 'react';
import axios from 'axios';
import '../ScraperForm.css'; 

export default function ScraperForm() {
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState(null);
  const [scrapedContent, setScrapedContent] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    setLoading(true);
    setError('');
    setCategory(null);
    setScrapedContent(null);

    try {
      const response = await axios.get(`/api/scraper`, {
        params: { url }
      });

      if (response.data.category) {
        setCategory(response.data.category);
        setScrapedContent(response.data.results || {});
      } else {
        setError('No data found.');
      }
    } catch (err) {
      setError('An error occurred while scraping and categorizing the website.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scraper-container">
      <h1>Advanced AI Web Scraper</h1>
      <div className="input-group">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to scrape"
          className="url-input"
        />
        <button onClick={handleScrape} disabled={loading} className="scrape-button">
          {loading ? 'Scraping and Categorizing...' : 'Scrape'}
        </button>
      </div>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      {category && (
        <div style={{ marginTop: '1rem' }}>
          <h2>AI Summarized Category: {category}</h2>
        </div>
      )}
      {scrapedContent && Object.keys(scrapedContent).length > 0 && (
        <div className="scraped-content">
          <h2>Scraped Content:</h2>
          <pre>{JSON.stringify(scrapedContent, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
