const express = require('express');
const axios = require('axios');
const profileRoute = express.Router();

const User = require('../models/User');
const Rate = require('../models/Rate');

const { Op } = require('sequelize');

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

async function getReviewerData(spotifyUserId, accessToken) {
    try {
        const response = await axios.get('https://api.spotify.com/v1/users/'+ spotifyUserId, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return (({ id, display_name, images }) => ({ id, display_name, images }))(response.data);
    } catch (error) {
        console.error('Erro ao obter dados de quem escreveu a resenha no Spotify:', error);
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

async function updateUserRatesAndReviews(spotifyUserId) {
    try {
        const rates = await Rate.count({
            where: {
                spotify_user_id: spotifyUserId,
                rate: { [Op.ne]: null }
            }
        });

        const reviews = await Rate.count({
            where: {
                spotify_user_id: spotifyUserId,
                review: { [Op.ne]: null }
            }
        });

        await User.update(
            { rates: rates, reviews: reviews },
            { where: { spotify_user_id: spotifyUserId } }
        );

        console.log('Dados do usuário atualizados com sucesso.');
    } catch (error) {
        console.error('Erro ao atualizar reviews e rates do perfil do banco de dados:', error);
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

module.exports = { profileRoute, getUserData, updateUserRatesAndReviews, getReviewerData };
