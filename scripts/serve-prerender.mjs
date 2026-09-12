import { createReadStream } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDirectory = path.join(rootDirectory, 'dist');
const portArgument = Number.parseInt(process.argv[2] || '', 10);
const port = Number.isInteger(portArgument) && portArgument > 0 ? portArgument : 4173;

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.mp4', 'video/mp4'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.webm', 'video/webm'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

function safePathname(rawPathname) {
  let pathname;
  try {
    pathname = decodeURIComponent(rawPathname);
  } catch {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);
  if (segments.some((segment) => segment === '.' || segment === '..' || segment.includes('\\'))) {
    return null;
  }
  return segments;
}

async function isFile(filePath) {
  try {
    await access(filePath);
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function resolveRequest(pathname) {
  const segments = safePathname(pathname);
  if (!segments) return null;
  if (segments.length === 0) return path.join(distDirectory, 'index.html');

  const directPath = path.join(distDirectory, ...segments);
  if (await isFile(directPath)) return directPath;

  if (!path.extname(segments.at(-1))) {
    const cleanUrlPath = `${directPath}.html`;
    if (await isFile(cleanUrlPath)) return cleanUrlPath;
  }

  return null;
}

function sendFile(request, response, filePath, statusCode = 200) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', contentTypes.get(path.extname(filePath).toLowerCase()) || 'application/octet-stream');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  if (request.method === 'HEAD') {
    response.end();
    return;
  }
  createReadStream(filePath).pipe(response);
}

await access(path.join(distDirectory, 'index.html'));
const notFoundPath = path.join(distDirectory, '404.html');
const server = createServer(async (request, response) => {
  try {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      response.end('Method Not Allowed');
      return;
    }

    const url = new URL(request.url || '/', `http://${request.headers.host || '127.0.0.1'}`);
    if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
      response.writeHead(308, { Location: `${url.pathname.slice(0, -1)}${url.search}` });
      response.end();
      return;
    }

    const filePath = await resolveRequest(url.pathname);
    if (filePath) {
      sendFile(request, response, filePath);
      return;
    }

    if (await isFile(notFoundPath)) {
      sendFile(request, response, notFoundPath, 404);
      return;
    }

    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not Found');
  } catch {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Internal Server Error');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Serving prerendered output at http://127.0.0.1:${port}`);
});
