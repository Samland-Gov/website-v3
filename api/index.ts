import express from "express";
import path from "path";
import nunjucks from "nunjucks";

const app = express();

nunjucks.configure([
  "node_modules/govuk-frontend/dist", // For GOV.UK Frontend templates
  path.join(__dirname, 'views')
], {
  autoescape: true,
  express: app
});


// Serve static files from /public
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/public/govuk-frontend.min.js', (req, res) => {
  // Serve the GOV.UK Frontend JS file from node_modules
  res.sendFile(path.join(__dirname, '..', 'node_modules', 'govuk-frontend', 'dist', 'govuk', 'govuk-frontend.min.js'));
});

// Home route - HTML
app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/about', function (req, res) {
	res.render('about.html');
});

// Example API endpoint - JSON
app.get('/api-data', (req, res) => {
  res.json({
    message: 'Here is some sample API data',
    items: ['apple', 'banana', 'cherry']
  });
});

// Health check
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = app;
