require('dotenv').config();
const bot = require('./bot');
const basicCommands = require('./commands/basics');
const statusCommands = require('./commands/status');
const updaterCommands = require('./commands/updater');
const networkCommands = require('./commands/network');
const helper = require('./commands/help');

bot.add(basicCommands);
bot.add(statusCommands);
bot.add(updaterCommands);
bot.add(networkCommands);

bot.add(helper.buildHelp(bot.getCommands()));
bot.start();
