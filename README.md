
# YouTube Stream URL Management Panel

This project is a web-based panel to manage and configure YouTube stream URLs (DASH and HLS). It includes authentication, session management, and configuration persistence via a JSON file.

## Features

- User Authentication (with session timeout).
- Manage URLs for DASH and HLS streams.
- Configuration is stored persistently in a JSON file.
- EJS-based web panel for an easy-to-use interface.
- Session timeout for security purposes.

## Prerequisites

- Node.js (>= 14.x)
- NPM (>= 6.x)
- A VPS or server with SSH access.

## Installation

### 1. Clone the Repository

Clone the repository to your local machine or server.

```bash
git clone https://github.com/mts/stream-url-management.git
cd stream-url-management
```

### 2. Run the Setup Script

This project includes a `setup.sh` script that automates the installation and configuration process. The script will:

- Update your system packages.
- Install Node.js, npm, and required dependencies.
- Create the project directory (`/root/stream-url-management`).
- Install the project dependencies from the `package.json` file.
- Configure the firewall to allow HTTP traffic on port 8080.
- Start the server and ensure it continues running.

Run the following commands to set up the project:

```bash
chmod +x setup.sh
./setup.sh
```

### 3. Configuration

The project stores the stream URLs (DASH and HLS) in a `config.json` file. The file is created automatically during the setup process if it does not already exist. It has the following structure:

```json
{
  "dashUrl": "",
  "hlsUrl": ""
}
```

You can update these URLs manually in the `config.json` or through the web panel.

### 4. Starting the Application

The `setup.sh` script will automatically start the server. Once the setup is complete, you can access the web panel at:

```
http://<your-vps-ip>:8080
```

### 5. Logging In

When you first visit the web panel, you will be prompted to log in. Use the default credentials:

- **Username**: `admin`
- **Password**: `password123`

You can change the credentials later for security purposes.

### 6. Managing URLs

Once logged in, you can update the `DASH URL` and `HLS URL` from the web panel. The changes will be saved in the `config.json` file, and the URLs will be used for routing to the appropriate video streams.

### 7. Session Timeout

The session will automatically expire after 15 minutes of inactivity. If this happens, you will be redirected to the login page.

### 8. URL Requests

The web panel handles URLs for `master.mpd` and `master.m3u8` requests. You can access them through the following URL format:

```
http://localhost:8080/{streamId}/master.mpd
```

or

```
http://localhost:8080/{streamId}/master.m3u8
```

## Changelog

### v1.0.0 (2025-01-08)

- Initial release of the YouTube Stream URL Management Panel.
- Automated setup via `setup.sh` script for easier installation.
- Authentication with session timeout for security.
- Management of DASH and HLS stream URLs.
- Configuration persistence with `config.json` file.
- Web-based interface using EJS.
- Firewall configuration to allow traffic on port 8080.
- Default credentials for login: `admin` / `password123`.

## Installation
  ```
  curl -sL https://raw.githubusercontent.com/wayangkulit95/stream-url-management/main/setup.sh -o setup.sh && chmod +x setup.sh && ./setup.sh
  ```

## License

This project is licensed under the MIT License.
