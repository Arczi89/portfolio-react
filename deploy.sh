#!/bin/bash

USER='arturszwagrzak'
HOST='arturszwagrzak.atthost24.pl'
REMOTE_DIR='/home/arturszwagrzak/websites/szwagrzak_pl/'
BACKEND_DIR='/home/arturszwagrzak/websites/szwagrzak_pl/backend'
PORT=6022

echo "Przesyłanie plików do $USER@$HOST:$REMOTE_DIR"
whoami
rsync -avz -e "ssh -p $PORT" --delete build/ $USER@$HOST:$REMOTE_DIR

echo "Uruchamiam serwer w katalogu $REMOTE_DIR"
rsync -avz -e "ssh -p $PORT" backend/ $USER@$HOST:$BACKEND_DIR
ssh -p $PORT $USER@$HOST "cd $REMOTE_DIR && node backend/sync.js"
