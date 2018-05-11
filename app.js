require('dotenv').config();
const bot = require('./bot');
const basicCommands = require('./services/basics');

bot.add(basicCommands);
bot.start();
