#!/bin/bash

USER='dm77338'
HOST='dm77338.domenomania.eu'
REMOTE_DIR='/home/dm77338/szwagrzak.pl/'
BACKEND_DIR='/home/dm77338/server.szwagrzak.pl/'
PORT=22

# Użyj agenta SSH jeśli jest dostępny
SSH_OPTS="-p $PORT"
if [ -n "$SSH_AUTH_SOCK" ]; then
    SSH_OPTS="-p $PORT -o ForwardAgent=yes"
fi

echo "Uploading files to $USER@$HOST:$REMOTE_DIR"
whoami
rsync -az -e "ssh $SSH_OPTS" --delete build/ $USER@$HOST:$REMOTE_DIR
ssh $SSH_OPTS $USER@$HOST "cp $REMOTE_DIR/../.env-portfolio-react $REMOTE_DIR/.env"

echo "Uploading server and node_modules to $BACKEND_DIR"
# Kopiuj backend z plikami ukrytymi (w tym .htaccess)
rsync -az -e "ssh $SSH_OPTS" --delete --include='.*' backend/ $USER@$HOST:$BACKEND_DIR
rsync -az -e "ssh $SSH_OPTS" --delete node_modules/ $USER@$HOST:$BACKEND_DIR/node_modules/
ssh $SSH_OPTS $USER@$HOST "cp $BACKEND_DIR/../.env-portfolio-react $BACKEND_DIR/.env"

echo "Restarting application..."
ssh $SSH_OPTS $USER@$HOST "cd $BACKEND_DIR && touch tmp/restart.txt"

echo "Deployment completed! Checking application status..."
sleep 5
ssh $SSH_OPTS $USER@$HOST "curl -k -I https://server.szwagrzak.pl/api/health"
