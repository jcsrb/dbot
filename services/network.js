const {spawnSync} = require('child_process');
const arpScanner = require('arpscan');
const map = require('lodash/map');

let scannerActive = false;
const [interfaceName, networkName] = (spawnSync('iwgetid', []).stdout|| "FAILED").toString().split(' ');

const arpScannerSettings = {
  command: 'arp-scan',
  args: ['-l'],
  interface: interfaceName,
  verbose: true,
  sudo: true
};

const sendResults = (message, data) => {
  const fields = map(data, item => {
    return {
      name: item.ip,
      value: item.vendor
    };
  });

  console.log(fields);

  message.edit({embed: {
    color: 3447003,
    author: {
      name: 'ARP Scanner'
    },
    title: `Scann of ${networkName}`,
    fields,
    timestamp: new Date()
  }
  });
};

const arpscan = async (client, message, _) => {
  if (scannerActive) {
    await message.channel.send('One scan at a time');
    return;
  }
  scannerActive = true;
  const m = await message.channel.send('Warming up scanner :satellite_orbital:...');
  function onResult(err, data) {
    if (err) {
      m.edit('Stuff broke');
    }
    sendResults(m, data);
    scannerActive = false;
  }
  arpScanner(onResult, arpScannerSettings);
};

module.exports = {arpscan};
