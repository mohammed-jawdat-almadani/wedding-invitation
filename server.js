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

// SPA fallback for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`  Wedding invitation app listening on http://0.0.0.0:${port}`);
  console.log(`=======================================================`);
});
