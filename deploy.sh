#!/bin/bash

USER='dm77338'
HOST='dm77338.domenomania.eu'
REMOTE_DIR='/home/dm77338/szwagrzak.pl/'
BACKEND_DIR='/home/dm77338/server.szwagrzak.pl/'
PORT=22

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
