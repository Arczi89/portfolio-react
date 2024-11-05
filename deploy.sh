#!/bin/bash

USER='arturszwagrzak'
HOST='arturszwagrzak.atthost24.pl'
REMOTE_DIR='/home/arturszwagrzak/websites/szwagrzak_pl/'
# BACKEND_DIR='/home/arturszwagrzak/websites/server'
PORT=6022

echo "Przesyłanie plików do $USER@$HOST:$REMOTE_DIR"
whoami
rsync -az -e "ssh -p $PORT" --delete build/ $USER@$HOST:$REMOTE_DIR
ssh -p $PORT $USER@$HOST "cp $REMOTE_DIR/../.env $REMOTE_DIR"

# echo "Przesyłanie server oraz node_modules do $REMOTE_DIR"
# rsync -az -e "ssh -p $PORT" --delete backend/ $USER@$HOST:$BACKEND_DIR
# rsync -az -e "ssh -p $PORT" --delete node_modules/ $USER@$HOST:$BACKEND_DIR/node_modules/
# ssh -p $PORT $USER@$HOST "cp $BACKEND_DIR/../.env $BACKEND_DIR"
# ssh -p $PORT $USER@$HOST "cp $BACKEND_DIR/app.mjs $BACKEND_DIR/app.js"
