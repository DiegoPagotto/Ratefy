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
    num_resenhas: {
        type: Sequelize.INTEGER
    },
    num_avaliacoes: {
        type: Sequelize.INTEGER
    }
});

module.exports = User;
