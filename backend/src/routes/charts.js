const express = require('express');
const axios = require('axios');
const router = express.Router();
const { config } = require('../config');
const brasilPlaylistURI = config.brasilPlaylistURI;
const globalPlaylistURI = config.globalPlaylistURI;


router.get('/charts', async (req, res) => {
    const accessToken = req.accessToken;
    let charts = {};

    try {
        const response = await axios.get('https://api.spotify.com/v1/playlists/' + brasilPlaylistURI, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        charts.brasil = response.data.tracks.items.slice(0, 10); // Obter os 10 primeiros itens.
    } catch (error) {
        console.error('Erro ao obter dados das paradas brasileiras Spotify:', error.response.data);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados das paradas brasileiras Spotify.' });
    }

    try {
        const response = await axios.get('https://api.spotify.com/v1/playlists/' + globalPlaylistURI, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        charts.global = response.data.tracks.items.slice(0, 10); // Obter os 10 primeiros itens.
    } catch (error) {
        console.error('Erro ao obter dados das paradas globais Spotify:', error.response.data);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados das paradas globais Spotify.' });
    }

    res.send(charts);
});

module.exports = router;
