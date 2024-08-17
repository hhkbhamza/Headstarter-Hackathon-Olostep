import React, { useState } from 'react';
import axios from 'axios';

export default function ScraperForm() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await axios.get(`/api/scraper`, {
        params: { url }
      });

      if (response.data.data) {
        setResults(response.data.data);
      } else {
        setError('No data found.');
      }
    } catch (err) {
      setError('An error occurred while scraping the website.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Web Scraper</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to scrape"
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={handleScrape} disabled={loading}>
        {loading ? 'Scraping...' : 'Scrape'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {results && (
        <div>
          <h2>Results:</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
