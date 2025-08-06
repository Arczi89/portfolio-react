#!/bin/bash

USER='arturszwagrzak'
HOST='arturszwagrzak.atthost24.pl'
REMOTE_DIR='/home/arturszwagrzak/websites/szwagrzak_pl/'
BACKEND_DIR='/home/arturszwagrzak/websites/server'
PORT=6022

echo "Uploading files to $USER@$HOST:$REMOTE_DIR"
whoami
rsync -az -e "ssh -p $PORT" --delete build/ $USER@$HOST:$REMOTE_DIR
ssh -p $PORT $USER@$HOST "cp $REMOTE_DIR/../.env-portfolio-react $REMOTE_DIR/.env"

echo "Uploading server and node_modules to $BACKEND_DIR"
# Kopiuj backend z plikami ukrytymi (w tym .htaccess)
rsync -az -e "ssh -p $PORT" --delete --include='.*' backend/ $USER@$HOST:$BACKEND_DIR
rsync -az -e "ssh -p $PORT" --delete node_modules/ $USER@$HOST:$BACKEND_DIR/node_modules/
ssh -p $PORT $USER@$HOST "cp $BACKEND_DIR/../.env-portfolio-react $BACKEND_DIR/.env"

echo "Restarting application..."
ssh -p $PORT $USER@$HOST "cd $BACKEND_DIR && touch tmp/restart.txt"

echo "Deployment completed! Checking application status..."
sleep 5
ssh -p $PORT $USER@$HOST "curl -k -I https://server.szwagrzak.pl/api/health"
