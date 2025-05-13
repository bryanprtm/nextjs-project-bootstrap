#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting News Crawler installation...${NC}"

# Check if running on Ubuntu 20.04
if ! grep -q 'Ubuntu 20' /etc/os-release; then
    echo -e "${RED}This script is designed for Ubuntu 20.04. Please use the correct version.${NC}"
    exit 1
fi

# Update system packages
echo -e "${GREEN}Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
echo -e "${GREEN}Installing Node.js 18.x...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install build essentials
echo -e "${GREEN}Installing build essentials...${NC}"
sudo apt install -y build-essential

# Verify installations
echo -e "${GREEN}Verifying installations...${NC}"
node --version
npm --version

# Install project dependencies
echo -e "${GREEN}Installing project dependencies...${NC}"
npm install

# Initialize Prisma and create database
echo -e "${GREEN}Initializing database...${NC}"
npx prisma generate
npx prisma migrate deploy

# Build the application
echo -e "${GREEN}Building the application...${NC}"
npm run build

echo -e "${GREEN}Installation completed!${NC}"
echo -e "You can now start the application with: ${GREEN}npm run start${NC}"
