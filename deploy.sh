#!/bin/bash

USER='arturszwagrzak'
HOST='arturszwagrzak.atthost24.pl'
REMOTE_DIR='/home/arturszwagrzak/websites/szwagrzak_pl/'

# Przesyłanie plików na serwer
rsync -avz --delete build/ $USER@$HOST:$REMOTE_DIR

ssh $USER@$HOST "cd $REMOTE_DIR && node backend/server.js"