const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/appdetails', async (req, res) => {
    const { appids } = req.query;
    if (!appids) return res.status(400).json({ error: 'Missing appids' });

    try {
        const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appids}`);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch from Steam API' });
    }
});

app.listen(PORT, () => {
    console.log(`Steam proxy server running on http://localhost:${PORT}`);
});
