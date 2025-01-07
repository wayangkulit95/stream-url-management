const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const session = require("express-session");

const app = express();
const PORT = 8080;

// Session timeout (in milliseconds)
const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to ejs for rendering HTML
app.set("view engine", "ejs");

// Serve static files (like CSS)
app.use(express.static(path.join(__dirname, "public")));

// Path to the JSON file
const configFilePath = path.join(__dirname, "config.json");

// Helper function to read configuration from the JSON file
function readConfig() {
  try {
    const data = fs.readFileSync(configFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading config file:", err);
    return { dashUrl: "", hlsUrl: "" }; // Default values
  }
}

// Helper function to write configuration to the JSON file
function writeConfig(config) {
  try {
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to config file:", err);
  }
}

// Load initial configuration
const urlConfig = readConfig();

// Initialize session middleware for authentication
app.use(
  session({
    secret: "your-secret-key", // Secret key for session encryption
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: SESSION_TIMEOUT, // Session expiration time (15 minutes)
    },
  })
);

// Middleware to track last activity time for session timeout
function trackActivity(req, res, next) {
  if (req.session.isAuthenticated) {
    // Reset the session timer on each request if the user is authenticated
    req.session.lastActivity = Date.now();
  }
  next();
}

app.use(trackActivity);

// Authentication middleware
function isAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    // Check if the session is still active based on last activity
    if (Date.now() - req.session.lastActivity > SESSION_TIMEOUT) {
      // Session expired due to inactivity
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
        }
      });
      return res.redirect("/login");
    }
    return next();
  }
  res.redirect("/login");
}

// Login route
app.get("/login", (req, res) => {
  res.render("login");
});

// Login POST route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check credentials (modify these values based on your choice)
  if (username === "admin" && password === "password123") {
    req.session.isAuthenticated = true;
    req.session.lastActivity = Date.now(); // Track the time of login
    return res.redirect("/");
  } else {
    res.status(401).send("Invalid credentials.");
  }
});

// Web panel to manage URLs - Protected route
app.get("/", isAuthenticated, (req, res) => {
  res.render("index", { urlConfig });
});

// Update URLs via the web panel
app.post("/update", isAuthenticated, (req, res) => {
  const { dashUrl, hlsUrl } = req.body;

  if (dashUrl) urlConfig.dashUrl = dashUrl;
  if (hlsUrl) urlConfig.hlsUrl = hlsUrl;

  // Save the updated configuration to the JSON file
  writeConfig(urlConfig);

  res.redirect("/");
});

// Handle master.mpd and master.m3u8 requests
app.get("/:streamId/:type", async (req, res) => {
  const { streamId, type } = req.params;

  try {
    if (type === "master.mpd") {
      const dashUrl = await fetchManifestUrl(
        `${urlConfig.dashUrl}/${streamId}/live`,
        /(?<=dashManifestUrl":").+?(?=",)/g
      );
      return res.redirect(dashUrl);
    } else if (type === "master.m3u8") {
      const hlsUrl = await fetchManifestUrl(
        `${urlConfig.hlsUrl}/${streamId}/live`,
        /(?<=hlsManifestUrl":").*\.m3u8/g
      );
      return res.redirect(hlsUrl);
    } else {
      res.status(400).send("Invalid type. Use 'master.mpd' or 'master.m3u8'.");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
