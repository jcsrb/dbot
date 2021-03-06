// Load up the discord.js library
const Discord = require('discord.js');
const Duration = require('duration');

const pkg = require('./package.json');

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = {
  token: process.env.DISCORD_TOKEN,
  prefix: process.env.BOT_PREFIX
};
// Config value config.token contains the bot's token
// Config value config.prefix contains the message prefix.

let commands = {};
const startUpTime = new Date();

const updateActivity = () => {
  const duration = new Duration(startUpTime);
  client.user.setActivity(`${config.prefix} 🏃 ${duration.toString(1, 2)} - v${pkg.version} `);
};

const everyMinute = () => {
  updateActivity();
};

client.on('ready', () => {
  updateActivity();
  setInterval(everyMinute, 60 * 1000);
});

client.on('message', async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that 'botception').
  if (message.author.bot) {
    return;
  }

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(config.prefix) !== 0) {
    return;
  }

  // Here we separate our 'command' name, and our 'arguments' for the command.
  // e.g. if we have the message '+say Is this the real life?' , we'll get the following:
  // command = say
  // args = ['Is', 'this', 'the', 'real', 'life?']
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const commandFn = commands[command];
  if (commandFn) {
    await commandFn(client, message, args);
  } else {
    message.channel.send(`don't know what \`${config.prefix}${command}\` is`);
  }
});

const add = function (newCommands = {}) {
  commands = {...commands, ...newCommands};
};

const start = function () {
  client.login(config.token);
};

const getCommands = () => commands;

module.exports = {start, add, getCommands};
