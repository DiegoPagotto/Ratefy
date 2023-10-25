const express = require('express');
const axios = require('axios');
const profileRoute = express.Router();

const User = require('../models/User');

async function getUserData(accessToken) {
    let userData = await getSpotifyData(accessToken);
    userData = await getDatabaseData(userData);
    return userData;
}

async function getSpotifyData(accessToken) {
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

async function getDatabaseData(userData) {
    try {
        const user = await User.findOne({
            where: {
                spotify_user_id: userData.id
            },
            attributes: ['rates', 'reviews']
        });

        if (user) {
            userData.totalReviews = user.reviews;
            userData.totalRates = user.rates;
        }
        return userData

    } catch (error) {
        console.error('Erro ao obter dados do perfil do banco de dados:', error);
        throw error;
    }
}

profileRoute.get('/profile', async (req, res) => {
    const accessToken = req.accessToken;
    try {
        const userData = await getUserData(accessToken)
        return res.json(userData);
    } catch (error) {
        console.error('Erro ao obter dados do perfil do Spotify:', error);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados do perfil do Spotify.' });
    }
});

module.exports = { profileRoute, getUserData };
