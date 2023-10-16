const path = require('path');
const fs = require('fs');

const configFilePath = path.resolve(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));

module.exports = {
    config
};
