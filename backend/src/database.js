const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ratefy', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
