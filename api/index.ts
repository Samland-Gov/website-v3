import express from "express";
import path from "path";
import nunjucks from "nunjucks";

import { marked } from 'marked'
import govukMarkdown from 'govuk-markdown'
import { getContentEntries, fetchContent, handlePaginationIfRequested } from "./content";

marked.use(govukMarkdown())

const app = express();

const env = nunjucks.configure([
  "node_modules/govuk-frontend/dist", // For GOV.UK Frontend templates
  path.join(__dirname, 'views')
], {
  autoescape: true,
  express: app
});

env.addGlobal('getContentEntries', getContentEntries);

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

app.get('/:slug(*)', function (req, res) {
  const result = fetchContent(req);

  if (result === 404) {
    return res.status(404).send('Content not found');
  }

  const { data, html } = result;
  const pagination = handlePaginationIfRequested(req, data);

  res.render(
    `layouts/${data.template}.njk`,
    {
      ...data,
      content: html,
      pagination: pagination
    }
  );
});

module.exports = app;
