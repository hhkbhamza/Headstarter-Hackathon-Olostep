const mongoose = require('mongoose');

const ScrapedDataSchema = new mongoose.Schema({
    category: String,
    url: String,
    title: String,
    headings: [String],
    links: [{ text: String, href: String }],
    paragraphs: [String],
    images: [{ src: String, alt: String }],
});

const ScrapedData = mongoose.model('ScrapedData', ScrapedDataSchema);

module.exports = ScrapedData;