const cmp = require('semver-compare');
const request = require('request');
const pkg = require('../package.json');

const remotePkgUrl = 'https://raw.githubusercontent.com/jcsrb/dbot/master/package.json';

const update = async (client, message, _) => {
  const m = await message.channel.send('Checking for updates...');

  request(remotePkgUrl, {json: true}, (err, _, body) => {
    if (err) {
      m.edit('Checking failed');
    }
    const status = cmp(body.version, pkg.version);
    if (status === 1) {
      m.edit(`I am v${pkg.version} and v${body.version} is available`);
    }

    if (status === 0) {
      m.edit(`I am v${pkg.version} the latest pubilic version`);
    }

    if (status === -1) {
      m.edit(`I am v${pkg.version} ahead of public v${body.version}`);
    }
  });
};

module.exports = {'update!': update};
