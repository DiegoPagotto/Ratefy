const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { checkAccessTokenMiddleware } = require('./middlewares/checkAccessToken');

const authRoutes = require('./routes/auth');
const { profileRoute } = require('./routes/profile');
const { playlistRoutes } = require('./routes/playlists');
const chartsRoute = require('./routes/charts');
const searchRoute = require('./routes/search');
const { songRoutes } = require('./routes/song');
const { rateRoute } = require('./routes/rate');

const sequelize = require('./database');
const User = require('./models/User');
const Song = require('./models/Song');
const Rate = require('./models/Rate');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(authRoutes);
app.use(bodyParser.json());

// Middlewares
app.use(checkAccessTokenMiddleware);

// Rotas
app.use(profileRoute);
app.use(playlistRoutes);
app.use(chartsRoute);
app.use(searchRoute);
app.use(songRoutes);
app.use(rateRoute);

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
