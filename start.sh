#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if a process is running on port 3000
check_port() {
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Function to start the application
start_app() {
    echo -e "${GREEN}Starting News Crawler application...${NC}"
    npm run build && npm run start
}

# Function to stop the application
stop_app() {
    echo -e "${GREEN}Stopping News Crawler application...${NC}"
    if check_port; then
        pid=$(lsof -Pi :3000 -sTCP:LISTEN -t)
        kill $pid
        echo -e "${GREEN}Application stopped successfully${NC}"
    else
        echo -e "${RED}Application is not running${NC}"
    fi
}

# Function to restart the application
restart_app() {
    stop_app
    sleep 2
    start_app
}

# Function to show status
status_app() {
    if check_port; then
        pid=$(lsof -Pi :3000 -sTCP:LISTEN -t)
        echo -e "${GREEN}Application is running (PID: $pid)${NC}"
    else
        echo -e "${RED}Application is not running${NC}"
    fi
}

# Parse command line arguments
case "$1" in
    start)
        if check_port; then
            echo -e "${RED}Application is already running${NC}"
            exit 1
        fi
        start_app
        ;;
    stop)
        stop_app
        ;;
    restart)
        restart_app
        ;;
    status)
        status_app
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac

exit 0
