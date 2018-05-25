const _ = require('lodash');
const stringToBinary = require('string-to-binary');
const confirmHelper = require('../helpers/confirm');
const quotes = require('../data/quotes');

const ping = async (client, message, _) => {
  // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
  // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
  const m = await message.channel.send('Ping?');
  m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};

const defaultSayMesage = `01100010 01100101 01100101 01110000 00100000 01100010 01101111 01101111 01110000`;

const say = (client, message, args) => {
  // Makes the bot say something and delete the message. As an example, it's open to anyone to use.
  // To get the 'message' itself we join the `args` back into a string with spaces:
  const sayMessage = args.join(' ') || defaultSayMesage;
  // And we get the bot to say the thing:
  message.channel.send(sayMessage);
};

const enlightenMe = (client, message, args) => {
  message.channel.send(stringToBinary(_.sample(quotes)));
}

// Say with confirmation
const sayConfirm = (client, message, args) => {
  const job = () => say(client, message, args);
  confirmHelper.needsConfirmation('say!', job, message.channel);
};

const confirm = (client, message, args) => {
  const jobState = confirmHelper.confirm(args[0]);
  if (jobState) {
    message.react('💚');
  } else {
    message.react('💩');
  }
};

module.exports = {ping, say, 'say!': sayConfirm, confirm, enlightenMe};
