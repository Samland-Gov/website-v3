import express from "express";
import path from "path";
import fs from "fs";
import nunjucks from "nunjucks";

import { marked } from 'marked'
import govukMarkdown from 'govuk-markdown'
import matter from "gray-matter";

marked.use(govukMarkdown())

const articlesDir = path.join(__dirname, 'content', 'articles');

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

app.get('/articles/:slug', function (req, res) {
  const fileName = req.params.slug + '.md'; // map slug → .md
  const filePath = path.join(articlesDir, fileName);

  // Security: ensure only files inside the markdownDir are accessible
  if (!filePath.startsWith(articlesDir)) {
    return res.status(400).send('Invalid file path');
  }

  fs.readFile(filePath, 'utf8', (err, body) => {
    if (err) return res.status(404).send('File not found');
    const { data, content } = matter(body);
    const html = marked(content);
    res.render(
      'samland_govuk/article_template.njk',
      {
        article: {
          ...data,
          content: html
        }
      }
    );
  });
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
