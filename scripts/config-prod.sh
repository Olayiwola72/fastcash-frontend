# Get the current directory
DIR="$( cd "$( dirname "$0" )" && pwd )"

cd $DIR

# Load Environment Variables
export $(cat .env.production | grep -v '#' | awk '/=/ {print $1}')

# Define ports
FRONTEND_PORT=$VITE_PORT
BACKEND_PORT=$BACKEND_PORT