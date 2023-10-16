const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/profile', async (req, res) => {
    const accessToken = req.accessToken;
    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const userData = response.data;
        return res.json(userData);
    } catch (error) {
        console.error('Erro ao obter dados do perfil do Spotify:', error);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados do perfil do Spotify.' });
    }
});

module.exports = router;
