require('dotenv').config();
const bot = require('./bot');
const basicCommands = require('./services/basics');
const statusCommands = require('./services/status');
const updaterCommands = require('./services/updater');
const helper = require('./services/help');

bot.add(basicCommands);
bot.add(statusCommands);
bot.add(updaterCommands);

bot.add(helper.buildHelp(bot.getCommands()));
bot.start();
