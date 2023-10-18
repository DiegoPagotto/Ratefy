const express = require('express');
const cors = require('cors');
const { checkAccessTokenMiddleware } = require('./middlewares/checkAccessToken');
const authRoutes = require('./routes/auth');
const { profileRoute } = require('./routes/profile');
const { playlistRoutes } = require('./routes/playlists');
const chartsRoute = require('./routes/charts');
const searchRoute = require('./routes/search');
const songRoute = require('./routes/song');

const sequelize = require('./database');
const User = require('./models/User');
const Song = require('./models/Song');
const Rate = require('./models/Rate');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(authRoutes);

// Middlewares
app.use(checkAccessTokenMiddleware);

// Rotas
app.use(profileRoute);
app.use(playlistRoutes);
app.use(chartsRoute);
app.use(searchRoute);
app.use(songRoute);

sequelize.sync()
    .then(() => {
        console.log('Tabelas foram sincronizadas.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar tabelas: ', error);
    });

app.listen(port, () => {
    console.log(`Servidor em execução em na porta ${port}`);
});
