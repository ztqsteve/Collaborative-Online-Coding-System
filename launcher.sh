#!/bin/bash
fuser -k 3000/tcp

brew services start redis
cd ./server
npm install
nodemon server.js &
cd ../client
npm install
ng build --watch

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

fuser -k 3000/tcp
brew services stop redis
