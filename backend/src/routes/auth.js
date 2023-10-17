const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const router = express.Router();

const { config } = require('../config');
const clientId = config.clientId;
const clientSecret = config.clientSecret;
const redirectUri = config.redirectUri;
const frontEndUrl = config.frontEndUrl;

const { getUserData } = require('./profile');
const { getUserPlaylists, createMyRatesPlaylist } = require('./playlists');

const User = require('../models/User');

async function createUserIfNotExists(userData) {
    let dbUser = await User.findOne({ where: { spotify_user_id: userData.id } });

    if (!dbUser) {
        dbUser = await User.create({ spotify_user_id: userData.id, display_name: userData.display_name, num_resenhas: 0, num_avaliacoes: 0 });
    }

}

async function createRatefyPlaylistIfNotExists(token, spotify_user_id) {
    const playlists = await getUserPlaylists(token);
    const ratefyPlaylist = playlists.items.find((playlist) => playlist.name === 'MyRates');
    if (!ratefyPlaylist) {
        createMyRatesPlaylist(token, spotify_user_id);
    }
}


router.get('/login', (req, res) => {
    const scope = 'user-read-private user-read-email playlist-modify-public';
    const state = 'some-random-state';

    const authorizeUrl = `https://accounts.spotify.com/authorize?` +
        `client_id=${clientId}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=${encodeURIComponent(scope)}` +
        `&state=${state}`;

    res.redirect(authorizeUrl);
});

router.get('/callback', async (req, res) => {
    const code = req.query.code; // Código de autorização retornado pelo Spotify

    try {
        const tokenResponse = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
            }),
            headers: {
                'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const userData = await getUserData(tokenResponse.data.access_token);
        createUserIfNotExists(userData);
        createRatefyPlaylistIfNotExists(tokenResponse.data.access_token, userData.id);

        res.redirect(`${frontEndUrl}/?access_token=${tokenResponse.data.access_token}`);
    } catch (error) {
        console.error('Erro ao obter token de acesso:', error.response.data);
        return res.status(error.response.status).json({ message: 'Erro ao obter token de acesso.' });
    }
});

module.exports = router;
