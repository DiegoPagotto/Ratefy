const express = require('express');
const axios = require('axios');
const rateRoute = express.Router();
const { getUserData, updateUserRatesAndReviews } = require('./profile');
const { getExistingRate, getSongID } = require('./song');
const User = require('../models/User');
const Rate = require('../models/Rate');
const Song = require('../models/Song');

async function addSongToMyRates(user, songId, token) {
    const userData = await User.findOne({ where: { spotify_user_id: user } });
    const url = `https://api.spotify.com/v1/playlists/${userData.myrates_playlist_id}/tracks?uris=spotify:track:${songId}`;
    await axios.post(url, {}, { headers: { 'Authorization': `Bearer ${token}` } });
}

async function songExists(songId) {
    return Song.findOne({ where: { spotify_song_id: songId } });
}

async function createSong(songId, token) {
    const url = `https://api.spotify.com/v1/tracks/${songId}`;
    const response = await axios.get(url, { headers: { 'Authorization': `Bearer ${token}` } });
    const song = response.data;
    await Song.create({
        spotify_song_id: song.id,
        title: song.name,
    });
}

rateRoute.post('/rate', async (req, res) => {
    const accessToken = req.accessToken;
    const songId = getSongID(req.body.songId);
    const user = await getUserData(accessToken);
    const existingRate = await getExistingRate(songId, accessToken);
    try {
        if (existingRate) {
            await Rate.update({ rate: req.body.rate }, { where: { spotify_user_id: user.id, spotify_song_id: songId } });
        } else {
            if (!await songExists(songId)) {
                await createSong(songId, accessToken)
            }
            await Rate.create({
                rate: req.body.rate,
                spotify_user_id: user.id,
                spotify_song_id: songId
            });
            await addSongToMyRates(user.id, songId, accessToken);
        }
        await updateUserRatesAndReviews(user.id);
        res.send("Avaliação salva com sucesso.")
    } catch (error) {
        console.error('Erro ao obter dados do Spotify:', error);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados do Spotify.' });
    }
});

module.exports = { rateRoute, addSongToMyRates, songExists, createSong };
