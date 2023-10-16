const { Sequelize } = require('sequelize');
const sequelize = require('../database');

const Song = sequelize.define('Song', {
    spotify_song_id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
});

module.exports = Song;
