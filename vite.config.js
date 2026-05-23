import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function vercelApiDev() {
  return {
    name: 'vercel-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) return next();
        const pathname = req.url.split('?')[0];
        const route = pathname.replace(/^\/api\//, '');
        if (!route || route.startsWith('_')) return next();

        try {
          const mod = await server.ssrLoadModule(`/api/${route}.js`);
          const handler = mod.default;
          if (typeof handler !== 'function') {
            res.statusCode = 404;
            res.end('API route not found');
            return;
          }
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return res;
          };
          res.send = (data) => {
            if (data && typeof data === 'object') return res.json(data);
            res.end(String(data));
            return res;
          };
          await handler(req, res);
        } catch (err) {
          console.error(`[api/${route}] error:`, err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message || 'Server error' }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), vercelApiDev()],
});
