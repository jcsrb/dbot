sudo service dbot stop
git reset --hard
git pull
npm install --production --no-progress
get-oui -u https://linuxnet.ca/ieee/oui.txt
sudo service dbot start