const botPrefix = process.env.BOT_PREFIX;
const buildHelp = commands => {
  const helpMessage = [
    `Here are some things I can do:`
  ];

  Object.keys(commands).sort().forEach(c => helpMessage.push(`\`${botPrefix}${c}\``));

  helpMessage.push(`\`${botPrefix}help\` - this message`);
  helpMessage.push(`\`${botPrefix}man\` - no full manual, just gives you help`);

  const help = async (client, message, _) => {
    await message.channel.send(helpMessage.join('\n'));
  };

  return {help, man: help};
};

module.exports = {buildHelp};
