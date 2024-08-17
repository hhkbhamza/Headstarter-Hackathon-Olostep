const express = require('express');
const Xray = require('x-ray');

const router = express.Router();
const x = Xray();

router.get('/', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      x(url, {
        title: 'title',
        headings: x(['h1', 'h2', 'h3']), 
        links: x('a', [{ text: '', href: '@href' }]), 
        paragraphs: x(['p']), 
        images: x('img', [{ src: '@src', alt: '@alt' }]),
      })((err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ error: 'Scraping failed', details: error.message });
  }
});

module.exports = router;
