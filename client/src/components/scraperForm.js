import React, { useState } from 'react';
import axios from 'axios';
import '../ScraperForm.css'; // Assuming you'll create a separate CSS file for styles

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
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>Web Scraper</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to scrape"
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={handleScrape} disabled={loading} style={{ padding: '0.5rem 1rem' }}>
        {loading ? 'Scraping and Categorizing...' : 'Scrape'}
      </button>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      {category && (
        <div style={{ marginTop: '1rem' }}>
          <h2>Category: {category}</h2>
        </div>
      )}
      <div className='scraped-content'>
        {scrapedContent && Object.keys(scrapedContent).length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <h2>Scraped Content:</h2>
            <pre className='scraped-pre'>{JSON.stringify(scrapedContent, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
