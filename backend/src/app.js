const express = require('express');
const cors = require('cors');
const { checkAccessTokenMiddleware } = require('./middlewares/checkAccessToken');
const authRoutes = require('./routes/auth');
const profileRoute = require('./routes/profile');
const playlistsRoute = require('./routes/playlists');
const chartsRoute = require('./routes/charts');
const searchRoute = require('./routes/search');

const app = express();
const port = 3000;

app.use(cors());
app.use(authRoutes);

// Middlewares
app.use(checkAccessTokenMiddleware);

// Rotas
app.use(profileRoute);
app.use(playlistsRoute);
app.use(chartsRoute);
app.use(searchRoute);

app.listen(port, () => {
    console.log(`Servidor em execução em http://localhost:${port}`);
});