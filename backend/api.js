
//#region Imports e configurações
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const querystring = require('querystring');
const fs = require('fs');

const app = express();
const port = 3000;

const configFile = 'config.json';
const config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));


const clientId = config.clientId;
const clientSecret = config.clientSecret;
const redirectUri = 'http://localhost:3000/callback';

const brasilPlaylistURI = '37i9dQZEVXbMXbN3EUUhlg'
const globalPlaylistURI = '37i9dQZEVXbMDoHDwVN2tF'

app.use(cors());

//#endregion

app.get('/login', (req, res) => {
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

app.get('/callback', async (req, res) => {
    const code = req.query.code; // Código de autorização retornado pelo Spotify

    // Solicitar token de acesso
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

    res.redirect(`http://localhost:5173/?access_token=${tokenResponse.data.access_token}`);
});

app.get('/profile', async (req, res) => {
    const accessTokenHeader = req.headers['authorization'];

    if (!accessTokenHeader || !accessTokenHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de acesso ausente ou inválido.' });
    }

    const accessToken = accessTokenHeader.split(' ')[1];

    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const userData = response.data;
        return res.json(userData);
    } catch (error) {
        console.error('Erro ao obter dados do perfil do Spotify:', error.response.data);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados do perfil do Spotify.' });
    }
});

app.get('/playlists', async (req, res) => {
    const accessTokenHeader = req.headers['authorization'];

    if (!accessTokenHeader || !accessTokenHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de acesso ausente ou inválido.' });
    }

    const accessToken = accessTokenHeader.split(' ')[1];

    try {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists?limit=30', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const userData = response.data;
        return res.json(userData);
    } catch (error) {
        console.error('Erro ao obter dados das playlists Spotify:', error.response.data);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados das playlists do Spotify.' });
    }
});

app.get('/charts', async (req, res) => {
    const accessTokenHeader = req.headers['authorization'];

    if (!accessTokenHeader || !accessTokenHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de acesso ausente ou inválido.' });
    }

    const accessToken = accessTokenHeader.split(' ')[1];

    let charts = {};

    try {
        const response = await axios.get('https://api.spotify.com/v1/playlists/' + brasilPlaylistURI, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        charts.brasil = response.data.tracks.items.slice(0, 10); // Obter os 10 primeiros itens.
    } catch (error) {
        console.error('Erro ao obter dados das paradas brasileiras Spotify:', error.response.data);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados das paradas brasileiras Spotify.' });
    }

    try {
        const response = await axios.get('https://api.spotify.com/v1/playlists/' + globalPlaylistURI, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        charts.global = response.data.tracks.items.slice(0, 10); // Obter os 10 primeiros itens.
    } catch (error) {
        console.error('Erro ao obter dados das paradas globais Spotify:', error.response.data);
        return res.status(error.response.status).json({ message: 'Erro ao obter dados das paradas globais Spotify.' });
    }

    res.send(charts);
});


app.get('/ping', async (req, res) => {
    res.send('pong');
});

app.listen(port, () => {
    console.log(`Servidor em execução em http://localhost:${port}`);
});