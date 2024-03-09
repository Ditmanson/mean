// Import necessary modules and components
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';

// Function to create and configure the Express app
export function app(): express.Express {
  const server = express();
  // Get the directory of the server file
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  // Resolve the path to the browser distribution folder
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  // Set the path to the index HTML file
  const indexHtml = join(serverDistFolder, 'index.server.html');

  // Create a new instance of CommonEngine for SSR
  const commonEngine = new CommonEngine();

  // Set the view engine and views directory for Express
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express REST API endpoints (commented out)
  // server.get('/api/**', (req, res) => { });

  // Serve static files from the browser distribution folder
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // Use the Angular engine for all other routes
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    // Render the Angular app using CommonEngine
    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  // Return the configured Express server
  return server;
}

// Function to start the server
function run(): void {
  // Set the port to listen on
  const port = process.env['PORT'] || 4000;

  // Start the Express server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Run the server
run();
