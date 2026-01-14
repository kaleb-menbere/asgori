const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post('/api/send-telegram', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    const botMessage = `🚨 NEW CONTACT FORM 🚨
-------------------------
👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
💬 Message: ${message}
📅 Date: ${new Date().toLocaleString()}
-------------------------`;

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: botMessage
      })
    });

    if (!response.ok) throw new Error('Telegram API error');
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));