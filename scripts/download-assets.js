import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, '..', 'public', 'assets');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const assets = [
  {
    name: 'lacy_intro.mp4',
    url: 'https://in-vitely.com/themes/couple/lacy-deluxe/intro.mp4'
  },
  {
    name: 'lacy_intro-poster.jpg',
    url: 'https://in-vitely.com/themes/couple/lacy-deluxe/intro-poster.jpg'
  },
  {
    name: 'lacy_bg.webp',
    url: 'https://in-vitely.com/themes/couple/lacy-deluxe/bg.webp'
  },
  {
    name: 'map_window.png',
    url: 'https://in-vitely.com/themes/serene/bg.webp' // fallback/source
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`[Asset] Already exists: ${path.basename(dest)}`);
      return resolve();
    }
    console.log(`[Asset] Downloading ${path.basename(dest)}...`);
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        file.close();
        fs.unlink(dest, () => {});
        resolve(); // Continue even if remote is missing
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      resolve();
    });
  });
}

async function main() {
  console.log('Ensuring all assets exist in public/assets...');
  for (const a of assets) {
    const dest = path.join(assetsDir, a.name);
    await downloadFile(a.url, dest);
  }
  console.log('Asset check complete!');
}

main();
