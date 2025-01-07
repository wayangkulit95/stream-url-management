
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

## Installation

### 1. Clone the Repository

Clone the repository to your local machine or server.

```bash
git clone https://github.com/MTS/stream-url-management.git
cd stream-url-management
```

### 2. Install Dependencies

Run the following command to install required dependencies.

```bash
npm install
```

### 3. Configuration

Make sure the `config.json` file is present in the root directory. This file is used to store the URLs for the DASH and HLS streams.

```json
{
  "dashUrl": "",
  "hlsUrl": ""
}
```

### 4. Start the Server

Run the following command to start the server:

```bash
node server.js
```

The server will start on port `8080` by default. You can access the web panel via your browser at:

```
http://localhost:8080/login
```

## Usage

### Logging In

When you first visit the web panel, you will be prompted to log in. Use the default credentials:

- **Username**: `admin`
- **Password**: `password123`

You can change the credentials later for security purposes.

### Managing URLs

Once logged in, you can update the `DASH URL` and `HLS URL` from the web panel. The changes will be saved in the `config.json` file, and the URLs will be used for routing to the appropriate video streams.

### Session Timeout

The session will automatically expire after 15 minutes of inactivity. If this happens, you will be redirected to the login page.

### URL Requests

The web panel handles URLs for `master.mpd` and `master.m3u8` requests. You can access them through the following URL format:

```
http://localhost:8080/{streamId}/master.mpd
```

or

```
http://localhost:8080/{streamId}/master.m3u8
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

