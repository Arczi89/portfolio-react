#!/bin/bash

USER='arturszwagrzak'
HOST='arturszwagrzak.atthost24.pl'
REMOTE_DIR='/home/arturszwagrzak/websites/szwagrzak_pl/'

# Budowanie aplikacji
npm install

# Budowanie CSS
npm run build:css

# Budowanie aplikacji React
npm run build

# Przesyłanie plików na serwer
rsync -avz --delete build/ $USER@$HOST:$REMOTE_DIR

ssh $USER@$HOST "cd $REMOTE_DIR && node backend/server.js"