#!/bin/bash

# Source the config file to load environment variables and ports
source scripts/config-local.sh

# Function to stop a process running on a specific port
stop_process_on_port() {
    local port=$1
    lsof -ti :"$port" | xargs kill -9 2>/dev/null
}

# Stop frontend server
if lsof -i :"$FRONTEND_PORT" > /dev/null; then
    echo "Stopping frontend server running on port $FRONTEND_PORT..."
    stop_process_on_port $FRONTEND_PORT
    echo "Frontend server stopped."
else
    echo "No frontend server running on port $FRONTEND_PORT."
fi

# Stop backend API
if lsof -i :"$BACKEND_PORT" > /dev/null; then
    echo "Stopping backend API running on port $BACKEND_PORT..."
    stop_process_on_port $BACKEND_PORT
    echo "Backend API stopped."
else
    echo "No backend API running on port $BACKEND_PORT."
fi
