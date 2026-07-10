const fs = require('node:fs');
const http = require('node:http');
const { generateProfile, outputPath } = require('./index');
const { getTheme } = require('./theme');

const defaultPort = 4173;

function previewPage(theme) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Profile SVG Preview</title>
  <style>
    body { margin: 0; padding: 32px; background: ${theme.colors.background}; font-family: system-ui, sans-serif; }
    main { max-width: 860px; margin: 0 auto; }
    img { display: block; width: 100%; height: auto; }
  </style>
</head>
<body>
  <main><img src="/assets/profile.svg" alt="Profile SVG preview"></main>
</body>
</html>`;
}

function createPreviewServer() {
  return http.createServer((request, response) => {
    let result;

    try {
      result = generateProfile();
    } catch (error) {
      response.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(`<!doctype html><meta charset="utf-8"><pre>${error.message}</pre>`);
      return;
    }

    if (request.url === '/assets/profile.svg') {
      response.writeHead(200, { 'Content-Type': 'image/svg+xml; charset=utf-8' });
      fs.createReadStream(outputPath).pipe(response);
      return;
    }

    if (request.url === '/' || request.url === '/index.html') {
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(previewPage(getTheme(result.config.theme.preset)));
      return;
    }

    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  });
}

function startPreview(port = defaultPort) {
  const server = createPreviewServer();

  server.listen(port, '127.0.0.1', () => {
    console.log(`预览已启动：http://127.0.0.1:${port}`);
  });

  return server;
}

if (require.main === module) {
  const argument = process.argv[2];

  if (argument === '--help' || argument === '-h') {
    console.log('用法：node generator/preview.js [端口]');
  } else {
    const port = argument ? Number(argument) : defaultPort;

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error('端口必须是 1 到 65535 的整数。');
    }

    startPreview(port);
  }
}

module.exports = { createPreviewServer, previewPage, startPreview };
