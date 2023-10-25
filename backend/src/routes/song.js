const express = require('express');
const axios = require('axios');
const songRoutes = express.Router();

const Rate = require('../models/Rate');
const { getUserData } = require('./profile');

function getSongID(uri) {
    const parts = uri.split(":");
    return parts[parts.length - 1];
}

async function getUserActions(songId, token) {
    try {
        const userId = await getUserData(token);

        const existingRate = await Rate.findOne({
            where: {
                spotify_user_id: userId.id,
                spotify_song_id: songId,
            },
        });

        if (!existingRate) {
            return { hasReviewed: false, hasRated: false };
        }

        const hasRated = existingRate.nota;
        const hasReviewed = existingRate.texto;

        return { hasReviewed, hasRated };

    } catch (error) {
        console.error('Erro ao obter dados do perfil do banco de dados:', error);
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

        song.userActions = await getUserActions(song.spotifyData.id, accessToken);
        res.send(song);
    } catch (error) {
        console.error('Erro ao obter dados do Spotify:', error);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados do Spotify.' });
    }
});

module.exports = { songRoutes, getSongID, getUserActions };
