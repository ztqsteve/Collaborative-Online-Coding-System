#!/bin/bash
fuser -k 3000/tcp
fuser -k 5000/tcp

brew services start redis
cd ./server
npm install
nodemon server.js &
cd ../client
npm install
ng build --watch &
cd ../executor
pip3 install -r requirements.txt
python3 executor_server.py &

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

fuser -k 3000/tcp
fuser -k 5000/tcp
brew services stop redis
