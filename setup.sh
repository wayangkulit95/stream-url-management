#!/bin/bash

# Script to set up the YouTube Stream URL Management Panel on a VPS

# 1. Update and upgrade the system
echo "Updating system packages..."
sudo apt update -y
sudo apt upgrade -y

# 2. Install Node.js (LTS version) and npm
echo "Installing Node.js and npm..."
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Verify Node.js and npm installation
echo "Verifying Node.js and npm installation..."
node -v
npm -v

# 4. Install git to clone the repository (optional step if you want to clone)
echo "Installing Git..."
sudo apt install -y git

# 5. Create the project directory if it doesn't exist
echo "Creating project directory /root/stream-url-management if it doesn't exist..."
mkdir -p /root/stream-url-management

# 6. Install project dependencies
echo "Installing project dependencies..."
cd /root/stream-url-management  # Change this to the path of your project directory
npm install

# 7. Set up the server
echo "Setting up the server..."

# Create the necessary directories and files if config.json does not exist
if [ ! -f "config.json" ]; then
  echo '{
    "dashUrl": "",
    "hlsUrl": ""
  }' > config.json
fi

# 8. Start the application
echo "Starting the application..."
nohup node server.js &

# 9. Setup firewall to allow HTTP traffic (if not already done)
echo "Setting up firewall to allow HTTP traffic..."
sudo ufw allow OpenSSH
sudo ufw allow 8080/tcp
sudo ufw enable

# 10. Display instructions to access the web panel
echo "Setup complete!"
echo "Your application is running at http://<your-vps-ip>:8080"
echo "You can access the web panel by navigating to the above URL."
echo "Login with the default credentials: username = admin, password = password123"
