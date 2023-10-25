const { Sequelize } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
    spotify_user_id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    display_name: {
        type: Sequelize.STRING
    },
    myrates_playlist_id: {
        type: Sequelize.STRING
    },
    rates: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    reviews: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

module.exports = User;
