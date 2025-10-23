#!/bin/bash

# Relative paths to your project folders
folder1="../src/"
folder2="../backend/"

# Path to store the PID files
pidPath="$HOME/Documents"

is_running() {
    local pidFile=$1
    if [ -f "$pidFile" ]; then
        local pid=$(cat "$pidFile")
        if ps -p "$pid" > /dev/null 2>&1; then
            return 0  # Server is running
        fi
    fi
    return 1  # Server is not running
}

# Function to start servers
start_servers() {
    echo "Starting npm servers..."

    local pidFile1="$pidPath/first-folder-npm.pid"
    # Start the npm server in the first folder
    if is_running "$pidFile1"; then
        echo "Server in $folder1 is already running with PID $(cat "$pidFile1")"
    else
        cd "$folder1" || exit
        npm install
        nohup npm run dev > /dev/null 2>&1 &  # Start in background and detach from terminal
        echo $! > "$pidPath/first-folder-npm.pid"
        echo "Started server in $folder1 with PID $(cat "$pidPath/first-folder-npm.pid")"
    fi

    # Start the npm server in the second folder
    local pidFile2="$pidPath/second-folder-npm.pid"
    if is_running "$pidFile2"; then
        echo "Server in $folder2 is already running with PID $(cat "$pidFile2")"
    else 
        cd "$folder2" || exit
        npm install
        nohup npm start > /dev/null 2>&1 &  # Start in background and detach from terminal
        echo $! > "$pidPath/second-folder-npm.pid"
        echo "Started server in $folder2 with PID $(cat "$pidPath/second-folder-npm.pid")"
    fi

    echo "Servers started."
}

# Function to stop servers
stop_servers() {
    echo "Stopping npm servers..."

    # Stop the server in the first folder
    if [ -f "$pidPath/first-folder-npm.pid" ]; then
        pid1=$(cat "$pidPath/first-folder-npm.pid")
        if kill "$pid1" > /dev/null 2>&1; then
            echo "Stopped server in $folder1 (PID: $pid1)"
        else
            echo "Failed to stop server in $folder1 (PID: $pid1). PID might be invalid or already stopped."
            exit 1
        fi
        rm -f "$pidPath/first-folder-npm.pid"
    else
        echo "No PID file found for server in $folder1"
    fi

    # Stop the server in the second folder
    if [ -f "$pidPath/second-folder-npm.pid" ]; then
        pid2=$(cat "$pidPath/second-folder-npm.pid")
        if kill "$pid2" > /dev/null 2>&1; then
            echo "Stopped server in $folder2 (PID: $pid2)"
        else
            echo "Failed to stop server in $folder2 (PID: $pid2). PID might be invalid or already stopped."
            exit 1
        fi
        rm -f "$pidPath/second-folder-npm.pid"
    else
        echo "No PID file found for server in $folder2"
    fi

    echo "Servers stopped."
}

# Function to restart servers
restart_servers() {
    stop_servers
    start_servers
}

# Main script logic
case "$1" in
    start)
        start_servers
        ;;
    stop)
        stop_servers
        ;;
    restart)
        restart_servers
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
        ;;
esac
