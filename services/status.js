const os = require('os');
const {spawnSync} = require('child_process');
const Discord = require('discord.js');
const Duration = require('duration');
const AsciiTable = require('ascii-table');
const humanFormat = require('human-format');
const getos = require('getos');

const timeScale = new humanFormat.Scale({
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
  months: 2592000
});

const startUpTime = new Date();

const pkg = require('../package.json');

const statusStats = () => {
  const table = new AsciiTable();

  const duration = new Duration(startUpTime);

  table
    .addRow('Available Actions', 'ask for help')
    .addRow('Bot Uptime', duration.toString(1, 1))
    .addRow('Action Run', 'TBD');

  return table.toString();
};

const statusSoftware = async () => {
  const table = new AsciiTable();

  const osData = await new Promise((resolve, reject) => getos((e, os) => e ? reject(e) : resolve(os)));

  table
    .addRow('DBot Version', pkg.version)
    .addRow('Node JS', process.versions.node)
    .addRow('Operating System', `${osData.dist} ${osData.release}`);

  return table.toString();
};

const statusHardware = () => {
  const table = new AsciiTable();

  table
    .addRow('CPU Arch', os.arch())
    .addRow('Device Uptime', humanFormat(os.uptime(), {scale: timeScale}))
    .addRow('Memmory', `${humanFormat(os.freemem())}/${humanFormat(os.totalmem())}`);

  return table.toString();
};

const statusNetwork = () => {
  const table = new AsciiTable();
  const wifi = (spawnSync('iwgetid', ['-r']).stdout || 'FAILED').toString().replace(/^\s+|\s+$/g, '');
  const publicIp = spawnSync('dig', ['+short', 'myip.opendns.com', '@resolver1.opendns.com']).stdout.toString().replace(/^\s+|\s+$/g, '');
  const privateIp = spawnSync('hostname', ['-I']).stdout.toString().replace(/^\s+|\s+$/g, '');

  table
    .addRow('WiFi', wifi)
    .addRow('Public IP', publicIp)
    .addRow('Private IP', privateIp)
    .addRow('Hostname', os.hostname());

  return table.toString();
};

const status = async (client, message, _) => {
  const m = await message.channel.send('How nice of you to ask');

  const embed = new Discord.RichEmbed()
    .setColor('#258B2D')
    .setTimestamp()
    .addField('Stats', '```' + statusStats() + '```')
    .addField('Software', '```' + await statusSoftware() + '```')
    .addField('Hardware', '```' + statusHardware() + '```')
    .addField('Network', '```' + statusNetwork() + '```');

  m.edit({embed});
};

module.exports = {status, howareyou: status};
