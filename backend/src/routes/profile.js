const express = require('express');
const axios = require('axios');
const profileRoute = express.Router();

async function getUserData(accessToken) {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados do perfil do Spotify:', error);
        throw error;
    }
}

profileRoute.get('/profile', async (req, res) => {
    const accessToken = req.accessToken;
    try {
        const userData = await getUserData(accessToken);
        return res.json(userData);
    } catch (error) {
        console.error('Erro ao obter dados do perfil do Spotify:', error);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados do perfil do Spotify.' });
    }
});

module.exports = { profileRoute, getUserData };
