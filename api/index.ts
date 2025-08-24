import express from "express";
import path from "path";
import fs from "fs";
import nunjucks from "nunjucks";

import { marked } from 'marked'
import govukMarkdown from 'govuk-markdown'
import matter from "gray-matter";

marked.use(govukMarkdown())

const contentDir = path.join(__dirname, 'content');

function getContentEntries(subdir: string) {
  const dirPath = path.join(contentDir, subdir);
  return fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(dirPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      return { ...data, slug: subdir+"/"+file.replace(/\.md$/, '') };
    });
}

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
  const fileName = req.params.slug + '.md'; // map slug → .md
  const filePath = path.join(contentDir, fileName);

  // Security: ensure only files inside the contentDir are accessible
  if (!filePath.startsWith(contentDir)) {
    return res.status(400).send('Invalid file path');
  }

  fs.readFile(filePath, 'utf8', (err, body) => {
    if (err) return res.status(404).send('File not found');
    const { data, content } = matter(body);
    const html = marked(content);
    res.render(
      `layouts/${data.template}.njk`,
      {
        ...data,
        content: html
      }
    );
  });
});

module.exports = app;
