const express = require('express');
const axios = require('axios');
const playlistRoutes = express.Router();

const User = require('../models/User');


async function getUserPlaylists(token) {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists?limit=50', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados das playlists do usuário do Spotify:', error);
        throw error;
    }
}

async function createMyRatesPlaylist(token, spotify_user_id) {
    try {
        const response = await axios({
            method: 'post',
            url: `https://api.spotify.com/v1/users/${spotify_user_id}/playlists`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: {
                name: 'MyRates',
                public: true,
                description: 'Playlist criada automaticamente pelo Ratefy para as músicas que você avaliou!',
            },
        });

        const playlistId = response.data.id;

        await User.update(
            { myrates_playlist_id: playlistId },
            { where: { spotify_user_id: spotify_user_id } }
        );

        return playlistId;
    } catch (error) {
        console.error('Erro ao criar a playlist:', error);
        throw new Error('Erro ao criar a playlist.');
    }
}

playlistRoutes.get('/playlists', async (req, res) => {
    const accessToken = req.accessToken;
    try {
        return res.json(await getUserPlaylists(accessToken));
    } catch (error) {
        console.error('Erro ao obter dados das playlists Spotify:', error.response.data);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados das playlists do Spotify.' });
    }
});


module.exports = { playlistRoutes, getUserPlaylists, createMyRatesPlaylist };
