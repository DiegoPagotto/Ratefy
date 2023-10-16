const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/search', async (req, res) => {
    const accessToken = req.accessToken;
    const artist = {};
    try {
        const response = await axios.get("https://api.spotify.com/v1/search?q=" + req.query.query + "&type=artist", {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        artist.info = response.data.artists.items[0];
    } catch (error) {
        console.error('Erro ao obter dados do Spotify:', error.response.data);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados do Spotify.' });
    }

    try {
        const response = await axios.get("https://api.spotify.com/v1/artists/" + artist.info.uri.split(':')[2] + "/top-tracks?market=BR", {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        artist.tracks = response.data.tracks;
    } catch (error) {
        console.error('Erro ao obter dados do Spotify:', error.response.data);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados do Spotify.' });
    }
    res.send(artist);
});

module.exports = router;
