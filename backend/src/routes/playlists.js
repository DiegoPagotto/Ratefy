const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/playlists', async (req, res) => {
    const accessToken = req.accessToken;
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists?limit=30', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const userData = response.data;
        return res.json(userData);
    } catch (error) {
        console.error('Erro ao obter dados das playlists Spotify:', error.response.data);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados das playlists do Spotify.' });
    }
});

module.exports = router;
