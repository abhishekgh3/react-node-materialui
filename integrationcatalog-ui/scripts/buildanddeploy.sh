#!/bin/bash

# Paths to your project folders
FOLDER1="../src/"
FOLDER2="../backend/"

# File to store the PIDs
PIDFILE="deploy_pids.txt"

start() {
  echo "Starting npm servers..."

  # Start the npm server in the first folder
  (
    cd "$FOLDER1" || exit
    npm install
    npm run dev &
    echo $! > "$FOLDER1/npm.pid"
  )

  # Start the npm server in the second folder
  (
    cd "$FOLDER2" || exit
    npm install
    npm start &
    echo $! > "$FOLDER2/npm.pid"
  )

  echo "Servers started."
}

stop() {
  echo "Stopping npm servers..."

  if [ -f "$FOLDER1/npm.pid" ]; then
    PID1=$(cat "$FOLDER1/npm.pid")
    kill "$PID1" && rm "$FOLDER1/npm.pid"
    echo "Stopped server in $FOLDER1"
  fi

  if [ -f "$FOLDER2/npm.pid" ]; then
    PID2=$(cat "$FOLDER2/npm.pid")
    kill "$PID2" && rm "$FOLDER2/npm.pid"
    echo "Stopped server in $FOLDER2"
  fi

  echo "Servers stopped."
}

case "$1" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  *)
    echo "Usage: $0 {start|stop}"
    exit 1
    ;;
esac