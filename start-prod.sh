#!/bin/bash

# Get the current directory
DIR="$( cd "$( dirname "$0" )" && pwd )"

# Source the config file to load environment variables and ports
source scripts/config-prod.sh

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -i :"$port" > /dev/null; then
        return 0  # Port is in use
    else
        return 1  # Port is not in use
    fi
}

rm -rf build
npm run build

# Function to start the frontend server
start_frontend_server() {
    osascript -e 'tell application "Terminal" to do script "cd '$DIR'; serve -s dist -l '$FRONTEND_PORT'"'
}

# Function to start the backend API
start_backend_api() {
    osascript -e 'tell application "Terminal" to do script "cd '$DIR' && cd ..; sh prod.sh"'
}

# Main script logic
if check_port $FRONTEND_PORT; then
    echo "Frontend server already running on port $FRONTEND_PORT"
else
    echo "Starting frontend server..."
    start_frontend_server
fi

if check_port $BACKEND_PORT; then
    echo "Backend API already running on port $BACKEND_PORT"
else
    echo "Starting backend API..."
    start_backend_api
fi
