const {spawnSync} = require('child_process');
const pkg = require('../package.json');

const status = async (client, message, _) => {
  const m = await message.channel.send('How nice of you to ask');

  const uptime = spawnSync('uptime', []).stdout.toString();
  const wifi = spawnSync('iwgetid', ['-r']).stdout.toString();
  const publicIp = spawnSync('dig', ['+short', 'myip.opendns.com', '@resolver1.opendns.com']).stdout.toString();
  const privateIp = spawnSync('hostname', ['-I']).stdout.toString();

  const statusMessage = [
    `DBOT v${pkg.version}`,
    `-----------------`,
    `Server Uptime: ${uptime}`.slice(0, -1),
    `Network: ${wifi}`.slice(0, -1),
    `Public IP: ${publicIp}`.slice(0, -1),
    `Private IP: ${privateIp}`.slice(0, -1)
  ];

  m.edit(statusMessage);
};

module.exports = {status, howareyou: status};
