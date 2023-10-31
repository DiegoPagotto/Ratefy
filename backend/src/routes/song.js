const express = require('express');
const axios = require('axios');
const songRoutes = express.Router();

const { Sequelize } = require('sequelize');

const Rate = require('../models/Rate');
const { getUserData } = require('./profile');

function getSongID(uri) {
    const parts = uri.split(":");
    return parts[parts.length - 1];
}

async function getExistingRate(songId, token) {
    try {
        const userId = await getUserData(token);

        return await Rate.findOne({
            where: {
                spotify_user_id: userId.id,
                spotify_song_id: songId,
            },
        });
    } catch (error) {
        console.error('Erro ao obter dados do perfil do banco de dados:', error);
        throw error;
    }
}

async function getRatesAndReviews(songId) {
    try {
        const rates = await Rate.findAll({
            attributes: ['rate', [Sequelize.fn('COUNT', 'rate'), 'count']],
            where: { spotify_song_id: songId },
            group: ['rate'],
        });

        const countMap = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
        };

        rates.forEach(rate => {
            countMap[rate.rate] = rate.dataValues.count;
        });

        const output = {
            rateCounts: countMap,
            reviews: (await Rate.findAll({ where: { spotify_song_id: songId, review: { [Sequelize.Op.not]: null } } })),
        };

        return output;
    } catch (error) {
        console.error('Erro ao obter dados de rates e reviews do banco de dados:', error);
        throw error;
    }
}

songRoutes.get('/song', async (req, res) => {
    const accessToken = req.accessToken;
    const song = {};
    try {
        const response = await axios.get("https://api.spotify.com/v1/tracks/" + getSongID(req.query.songId), {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.data)
            song.spotifyData = response.data;
        else
            res.status(404).json({ message: 'Música não encontrada.' });

        song.userActions = await getExistingRate(song.spotifyData.id, accessToken);
        song.ratefyData = await getRatesAndReviews(song.spotifyData.id);
        res.send(song);
    } catch (error) {
        console.error('Erro ao obter dados do Spotify:', error);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados do Spotify.' });
    }
});

module.exports = { songRoutes, getSongID, getExistingRate };
