#!/bin/bash
echo "DBot installer - slow be pachiencd"

# Ask for the administrator password upfront
cd ~

# native deps
sudo apt-get -q -y install git dnsutils arp-scan nmap

# node
wget -O - https://raw.githubusercontent.com/sdesalas/node-pi-zero/master/install-node-v.last.sh | bash

git clone https://github.com/jcsrb/dbot.git
cd dbot
npm install --production --no-progress
sudo npm install -g forever forever-service --production --no-progress
sudo /opt/nodejs/bin/forever-service install --foreverOptions " --sourceDir `pwd`  --workingDir `pwd`" dbot

sudo /opt/nodejs/bin/forever-service install dbot

get-oui -u https://linuxnet.ca/ieee/oui.txt  # update Ieee MAC list
cp .env.example .env

echo "Edit .env file and sudo service dbot start"