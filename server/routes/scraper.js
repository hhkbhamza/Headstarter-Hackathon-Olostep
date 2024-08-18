const express = require('express');
const Xray = require('x-ray');
const OpenAI = require('openai');
const ScrapedData = require('../models/ScrapedData');
require('dotenv').config({ path: './.env.local' }); 

const router = express.Router();
const x = Xray();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

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

    const content = `${result.title}\n\n${result.paragraphs.join('\n')}`;
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that categorizes content." },
        { role: "user", content: `Analyze the following content and provide a category:\n\n"${content}"\n\nCategory:` }
      ],
      max_tokens: 60,
      temperature: 0.7,
    });
    const category = aiResponse.choices[0].message.content.trim();

    // Save to MongoDB
    const scrapedData = new ScrapedData({
      category,
      url,
      title: result.title,
      headings: result.headings,
      links: result.links,
      paragraphs: result.paragraphs,
      images: result.images,
    });

    await scrapedData.save();

    res.status(200).json({ category, results: result });
  } catch (error) {
    res.status(500).json({ error: 'Scraping failed', details: error.message });
  }
});


module.exports = router;
