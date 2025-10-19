'use strict';
// Simple proxy server (CommonJS) - use: node server.js
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message || '';
  try {
    if (!process.env.OPENAI_API_KEY) return res.status(500).json({ reply: 'Server misconfiguration: missing OPENAI_API_KEY in .env' });
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'אתה עוזר בשם מצפן זכויות התלמיד, המספק מידע מדויק על זכויות תלמידים במערכת החינוך בישראל.' },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 800,
        temperature: 0.0
      })
    });
    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text ?? 'אין תשובה מהמודל.';
    res.json({ reply: reply.trim(), raw: data });
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ reply: 'שגיאה בשרת הפרוקסי: ' + String(err.message) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ מצפן זכויות התלמיד רץ על http://localhost:${PORT}`));
