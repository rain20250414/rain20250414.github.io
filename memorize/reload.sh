#!/usr/bin/sh

git reset --hard origin/master
git pull origin master
rm -f /var/ruler/ruler-web/config.js
cp /home/guopanbo/bak/config.js /var/ruler/ruler-web/config.js
echo 'ok'