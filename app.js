require('dotenv').config();
const bot = require('./bot');
const basicCommands = require('./services/basics');
const statusCommands = require('./services/status');
const updaterCommands = require('./services/updater');
const networkCommands = require('./services/network');
const helper = require('./services/help');

bot.add(basicCommands);
bot.add(statusCommands);
bot.add(updaterCommands);
bot.add(networkCommands);

bot.add(helper.buildHelp(bot.getCommands()));
bot.start();
