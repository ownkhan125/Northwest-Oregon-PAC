import fs from 'node:fs';
import path from 'node:path';

// Set up pdfjs-dist
const pdfjsPath = 'C:/Users/General/AppData/Local/Temp/node_modules/pdfjs-dist/legacy/build/pdf.mjs';
const pdfjs = await import('file:///' + pdfjsPath);

const pdfPath = 'C:/Users/General/Downloads/NW - SM Calendar (3).pdf';
const data = new Uint8Array(fs.readFileSync(pdfPath));
const pdf = await pdfjs.getDocument({ data }).promise;

console.log('Pages:', pdf.numPages);

const allPages = [];
for (let i = 1; i <= pdf.numPages; i++) {
  const page = await pdf.getPage(i);
  const viewport = page.getViewport({ scale: 1.0 });
  const textContent = await page.getTextContent();

  const items = textContent.items.map(item => ({
    text: item.str,
    x: item.transform[4],
    y: item.transform[5],
    w: item.width,
    h: item.height,
    fontName: item.fontName
  }));

  allPages.push({ page: i, width: viewport.width, height: viewport.height, items });
}

fs.writeFileSync('C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.qa-public-social/pdf-raw.json', JSON.stringify(allPages, null, 2));
console.log('Wrote pdf-raw.json');
