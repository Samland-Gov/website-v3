import { Request } from "express";
import path from "path";
import fs from "fs";

import { marked } from 'marked'
import govukMarkdown from 'govuk-markdown'
import matter from "gray-matter";

marked.use(govukMarkdown())

export const contentDir = path.join(__dirname, 'content');

export function getContentEntries(subdir: string, page: number = 1, limit: number = 10) {
  const dirPath = path.join(contentDir, subdir);
  let files = fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.md'));

  // Pagination: page is 1-based, limit is items per page
  const startIndex = (page - 1) * limit;
  const pagedFiles = files.slice(startIndex, startIndex + limit);

  return pagedFiles.map(file => {
    const filePath = path.join(dirPath, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return { ...data, slug: subdir + "/" + file.replace(/\.md$/, '') } as { [key: string]: any };
  });
}

export function fetchContent(req: Request) {
  let slug = req.params.slug || '';
  let fileName = slug ? slug + '.md' : 'index.md';
  let filePath = path.join(contentDir, fileName);

  // If the file doesn't exist and slug is a directory, try index.md inside that directory
  if (!fs.existsSync(filePath) && slug) {
    filePath = path.join(contentDir, slug, 'index.md');
  }

  // Security: ensure only files inside the contentDir are accessible
  if (!filePath.startsWith(contentDir)) {
    return 404;
  }

  if (!fs.existsSync(filePath)) {
    return 404;
  }

  const body = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(body);
  const html = marked(content);

  return { data, html };
}

export function handlePaginationIfRequested(req: Request, data: { [key: string]: any }) {
  if (!data.pagination || !data.pagination.requestedCollection) {
    return null;
  }

  const ITEMS_PER_PAGE = 10;

  let pagination = {
    total: 0,
    totalPages: 0,
    currentPage: parseInt(req.query.page as string) || 1,
    items: [],
    values: {
      search: req.query.search as string || '',
      order: req.query.order as string || 'relevance',
      organisation: req.query.organisation || []
    }
  }
  
  const order = pagination.values.order;
  const search = pagination.values.search;

  const collection = getContentEntries(data.pagination.requestedCollection, pagination.currentPage, ITEMS_PER_PAGE);
  let flitteredCollection = collection.filter((item) => {
    if (item.collection == data.pagination.requestedCollection) {
      return item;
    }
  });

  function getUpdatedDate(item: any): Date {
    const updatedMeta = Array.isArray(item.metadata)
      ? item.metadata.find((meta: any) => meta.label === 'Updated' && meta.is_date && meta.machine_date)
      : null;
    return updatedMeta ? new Date(updatedMeta.machine_date) : new Date(0);
  }

  if (order === 'updated-newest') {
    flitteredCollection.sort((a, b) => {
      return getUpdatedDate(b).getTime() - getUpdatedDate(a).getTime();
    });
  } else if (order === 'updated-oldest') {
    flitteredCollection.sort((a, b) => {
      return getUpdatedDate(a).getTime() - getUpdatedDate(b).getTime();
    });
  } // else, default is 'relevance' which is the original order

  if (search) {
    const searchLower = (search as string).toLowerCase();
    flitteredCollection = flitteredCollection.filter((item) => {
      const nameMatch = item.name && item.name.toLowerCase().includes(searchLower);
      const descMatch = item.description && item.description.toLowerCase().includes(searchLower);
      return nameMatch || descMatch;
    });

    pagination.total = flitteredCollection.length;
    pagination.items = flitteredCollection;
  }

  return pagination;
}