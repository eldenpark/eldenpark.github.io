import chalk from 'chalk';
import crypto from 'crypto';
import fs from 'fs';
import { logger } from 'jege/server';
import path from 'path';
import showdown from 'showdown';

import { Blog, BlogData } from '@@data/BlogData';
import { ContentData } from '@@data/ContentData';

const log = logger('[eldeni.github.io]');

const converter = new showdown.Converter({ metadata: true });

function getData() {
  const dataPath = process.env.WEBSITE_DATA_PATH as string;
  const latestCommitHash = process.env.LATEST_COMMIT_HASH as string;
  const repositoryUrl = process.env.REPOSITORY_URL as string;
  const contentDataPath = path.resolve(dataPath, 'data.ts');

  const result: Result = {
    blogData: undefined,
    contentData: undefined,
    createdFiles: undefined,
    latestCommitHash,
    repositoryUrl,
  };

  try {
    log('getData(): load contentDataPath module, path: %s', contentDataPath);
    result.contentData = require(contentDataPath).default;
  } catch (err) {
    log(`getData(): ${chalk.yellow('warn')} process.env.CONTENT_DATA_PATH is not a valid path, err: %s`, err);
    throw new Error('dataFilePath is not a valid path');
  }

  try {
    log('getData(): load module, path: %s', dataPath);
    const blogData: BlogData = {
      music: {
        id: 'music',
        items: [],
        label: 'music',
      },
    };
    const createdFiles: CreatedFile[] = [];

    if (fs.existsSync(dataPath)) {
      const files = fs.readdirSync(dataPath);
      files.forEach((file1) => {
        const filePath1 = path.resolve(dataPath, file1);
        if (fs.lstatSync(filePath1).isDirectory()) {
          fs.readdirSync(filePath1).forEach((file2) => {
            const filePath2 = path.resolve(filePath1, file2);
            if (file2.endsWith('.md')) {
              log('getData(): found file (.md), path: %s', filePath2);
              if (file2.length !== 11) {
                throw new Error(`filename is in wrong format, filename: ${filePath2}`);
              }

              const createdAt = new Date(
                +(file2.substring(0, 4)),
                +(file2.substring(4, 6)) - 1,
                +(file2.substring(6, 8)),
              ).getTime();

              const content = fs.readFileSync(filePath2).toString();
              const html = converter.makeHtml(content).replace(/\r?\n|\r/g, '');
              const shasum = crypto.createHash('sha256');
              shasum.update(content);
              const hash = shasum.digest('hex');
              const meta = converter.getMetadata();

              if (meta.title === undefined) {
                throw new Error(`title is not defined, filename: ${file2}`);
              }

              const capitalizedTitle = toTitleCase(meta.title);

              const pageUrl = meta.title.replace(/\s+/g, '-')
                .toLowerCase()
                + '--'
                + hash.substring(0, 8)
                + '.html';

              log(
                'getData(): markdown file processed, path: %s, html: %s, hash: %s, meta: %j, pageUrl: %s',
                chalk.green(filePath2),
                html,
                hash,
                meta,
                pageUrl,
              );

              (blogData[file1] as Blog).items.push({
                capitalizedTitle,
                createdAt,
                hash,
                html,
                meta,
                pageUrl,
              });
              createdFiles.push({
                category: file1,
                fileName: pageUrl,
              });
            }
          });
        }
      });

      result.blogData = blogData;
      result.createdFiles = createdFiles;
    } else {
      throw new Error('dataPath does not exist');
    }
  } catch (err) {
    log('getData(): Error loading data, path: %s, err: %s', dataPath, err);
    throw err;
  }

  return result;
}

export default getData;

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

interface Result {
  blogData?: BlogData;
  contentData?: ContentData;
  createdFiles?: CreatedFile[];
  latestCommitHash?: string;
  repositoryUrl: string;
}

export interface CreatedFile {
  category: string;
  fileName: string;
}
