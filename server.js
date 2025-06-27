const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080;

// Read configuration from environment variables, with defaults
const appTitle = process.env.APP_TITLE || 'Default Title';
const themeColor = process.env.THEME_COLOR || '#333';
const apiKey = process.env.API_KEY;

// Check if the API Key from the environment matches our expected secret value
let apiKeyStatus = 'Not Set or Incorrect!';
if (apiKey && apiKey === 'my-super-secret-key-12345') {
  apiKeyStatus = 'Successfully Loaded!';
}

app.get('/', function(req, res) {
  // Read the HTML template from the file
  fs.readFile(path.join(__dirname, '/index.html'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send("Error reading HTML file");
      return;
    }
    // Replace placeholders in the HTML with our config values
    const finalHtml = data
      .replace(/{{APP_TITLE}}/g, appTitle)
      .replace(/{{API_KEY_STATUS}}/g, apiKeyStatus)
      .replace(/{{THEME_COLOR}}/g, themeColor);
      
    res.send(finalHtml);
  });
});

app.listen(port, () => {
  console.log(`Stylish web app listening on port ${port}`);
});
