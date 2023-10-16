const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const router = express.Router();

const { config } = require('../config');
const clientId = config.clientId;
const clientSecret = config.clientSecret;
const redirectUri = config.redirectUri;
const frontEndUrl = config.frontEndUrl;

const User = require('../models/User');

async function createUserIfNotExists(token) {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const userData = response.data;
        let dbUser = await User.findOne({ where: { spotify_user_id: userData.id } });

        if (!dbUser) {
            dbUser = await User.create({ spotify_user_id: userData.id, display_name: userData.display_name, num_resenhas: 0, num_avaliacoes: 0 });
        }

    } catch (error) {
        console.error('Erro ao obter dados do perfil do Spotify:', error);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados do perfil do Spotify.' });
    }
}

router.get('/login', (req, res) => {
    const scope = 'user-read-private user-read-email';
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

        createUserIfNotExists(tokenResponse.data.access_token);

        res.redirect(`${frontEndUrl}/?access_token=${tokenResponse.data.access_token}`);
    } catch (error) {
        console.error('Erro ao obter token de acesso:', error.response.data);
        return res.status(error.response.status).json({ message: 'Erro ao obter token de acesso.' });
    }
});

module.exports = router;
