const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const CX_ID = process.env.CX_ID;

app.get('/search', async (req, res) => {
    const query = req.query.q;
    const domains = [
        '.888', '.altimist', '.anime', '.austin', '.binanceus',
        '.bitcoin', '.bitget', '.blockchain', '.clay', '.coin',
        '.crypto', '.dao', '.eth', '.go', '.hi', '.klever',
        '.kresus', '.manga', '.metropolis', '.nft', '.pog',
        '.polygon', '.pudgy', '.realm', '.secret', '.tomi',
        '.unstoppable', '.wallet', '.witg', '.wrkx', '.x', '.zil'
    ];

    const siteFilter = domains.map(domain => `site:${domain}`).join(' OR ');

    try {
        const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
            params: {
                key: GOOGLE_API_KEY,
                cx: CX_ID,
                q: `${siteFilter} ${query}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
