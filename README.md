# dbot
NodeJS based Discord Bot that runs on my Raspberry Pi ZW

## About
a small bot to run and check on my local network remotely using discord bot
only tested Raspberry Pi Zero W running Raspbian GNU/Linux 9 (stretch)


<span style="color:red">**USE AT YOUR OWN RISK** </span>

no promises of correctness, security, user access levels or safety are given

## Features

* TBD

## Install
1) create a discord bot & getting a token [these steps](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
2) ssh into to your pi and run
```bash
curl -o- https://raw.githubusercontent.com/jcsrb/dbot/master/install.sh | bash
```
this will install dependecies, clone repo, setup autostarts

3) edit `.env` file to add token from step 1
4) start to bot for the first time (tbd how)
5) check your discord channel for a hello message

## Acknowledgments
* standing on the shoulders of giants [discord.js](https://github.com/discordjs/discord.js/)
* based on this great [example bot](
https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3) by [@eslachance](https://github.com/eslachance)