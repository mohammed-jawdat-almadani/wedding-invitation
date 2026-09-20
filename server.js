import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 5173;

// Serve static assets from dist with compression and cache headers
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.mp4') || filePath.endsWith('.mp3')) {
      res.setHeader('Accept-Ranges', 'bytes');
    }
  }
}));

// Prevent SPA fallback for missing assets in /assets/
app.use((req, res, next) => {
  if (req.path.startsWith('/assets/')) {
    return res.status(404).send('Asset not found');
  }
  next();
});

// SPA fallback for all HTML routes (Express 5 compatible)
app.use((req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`  Wedding invitation app listening on http://0.0.0.0:${port}`);
  console.log(`=======================================================`);
});
