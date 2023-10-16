const { Sequelize } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const Song = require('./Song');

const Rate = sequelize.define('Rate', {
    nota: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
    },
    texto: {
        type: Sequelize.STRING
    }
});

User.hasMany(Rate, { foreignKey: 'spotify_user_id' });
Song.hasMany(Rate, { foreignKey: 'spotify_song_id' });

module.exports = Rate;
