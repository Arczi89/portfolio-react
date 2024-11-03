#!/bin/bash

USER='arturszwagrzak'
HOST='arturszwagrzak.atthost24.pl'
REMOTE_DIR='/home/arturszwagrzak/websites/szwagrzak_pl/'
PORT=6022

rsync -avz -e "ssh -p $PORT" --delete build/ $USER@$HOST:$REMOTE_DIR

ssh -p $PORT $USER@$HOST "cd $REMOTE_DIR && node backend/server.js"
