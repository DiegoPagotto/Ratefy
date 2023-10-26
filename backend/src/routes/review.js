const express = require('express');
const reviewRoute = express.Router();
const { getUserData, updateUserRatesAndReviews } = require('./profile');
const { getExistingRate, getSongID } = require('./song');
const { songExists, createSong, addSongToMyRates } = require('./rate');
const User = require('../models/User');
const Rate = require('../models/Rate');

reviewRoute.post('/review', async (req, res) => {
    const accessToken = req.accessToken;
    const songId = getSongID(req.body.songId);
    const user = await getUserData(accessToken);
    const existingRate = await getExistingRate(songId, accessToken);
    try {
        if (existingRate) {
            await Rate.update({ review: req.body.review }, { where: { spotify_user_id: user.id, spotify_song_id: songId } });
        } else {
            if (!await songExists(songId)) {
                await createSong(songId, accessToken)
            }
            await Rate.create({
                review: req.body.review,
                spotify_user_id: user.id,
                spotify_song_id: songId
            });
            await addSongToMyRates(user.id, songId, accessToken);
        }
        await updateUserRatesAndReviews(user.id);
        res.send("Resenha salva com sucesso.")
    } catch (error) {
        console.error('Erro ao criar resenha:', error);
        return res.status(error.response.status).json({ message: 'Erro ao criar resenha.' });
    }
});

module.exports = { reviewRoute };
