// ============================================================
// serve.mjs — 零依赖静态服务器（保证正确的 MIME，避免模块加载失败）
// 用法：node serve.mjs  或  PORT=8080 node serve.mjs
// ============================================================
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT) || 5173;
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon',
};

const server = http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent((req.url || '/').split('?')[0]);
    if (p === '/') p = '/index.html';
    const filePath = normalize(join(root, p));
    if (!filePath.startsWith(root)) { res.writeHead(403); res.end('Forbidden'); return; }
    const s = await stat(filePath).catch(() => null);
    if (!s || s.isDirectory()) { res.writeHead(404); res.end('Not found'); return; }
    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(500); res.end('Server error');
  }
});

server.listen(port, () => console.log(`\n  艺术作品集（Demo）运行中 →  http://localhost:${port}\n  按 Ctrl+C 停止。\n`));
