require('dotenv').config({ path: './.env.local' });

console.log('OPENAI URI:', process.env.OPENAI_API_KEY);