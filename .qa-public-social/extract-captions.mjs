import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.qa-public-social/pdf-raw.json','utf8'));

const CAPTION_X_MIN = 260;
const CAPTION_X_MAX = 425;
const NUM_X_MIN = 70;
const NUM_X_MAX = 100;
const PARA_GAP = 20;

// Section boundaries
const sectionPages = { feed: null, carousels: null, stories: null };
for (const page of data) {
  for (const it of page.items) {
    const t = it.text.trim();
    if (t === 'STATIC POSTS' && sectionPages.feed === null) sectionPages.feed = { page: page.page, y: it.y };
    if (t === 'CAROUSEL POSTS' && sectionPages.carousels === null) sectionPages.carousels = { page: page.page, y: it.y };
    if (t === 'INSTAGRAM STORIES' && sectionPages.stories === null) sectionPages.stories = { page: page.page, y: it.y };
  }
}

function sectionOf(page, y) {
  const inSection = (s, other) => {
    if (!s) return false;
    if (page < s.page) return false;
    if (page === s.page && y > s.y) return false;
    if (other && page > other.page) return false;
    if (other && page === other.page && y <= other.y) return false;
    return true;
  };
  if (inSection(sectionPages.feed, sectionPages.carousels)) return 'feed';
  if (inSection(sectionPages.carousels, sectionPages.stories)) return 'carousels';
  if (inSection(sectionPages.stories, null)) return 'stories';
  return null;
}

// Extract feed + carousels
const anchors = [];
for (const page of data) {
  for (const it of page.items) {
    if (it.x >= NUM_X_MIN && it.x < NUM_X_MAX && /^\d+$/.test(it.text.trim())) {
      anchors.push({num: parseInt(it.text.trim()), page: page.page, y: it.y, section: sectionOf(page.page, it.y)});
    }
  }
}

const result = { feed: {}, carousels: {}, stories: {} };

function extractCaptionForRow(cur, next) {
  const HEADER_TERMS = new Set(['Caption', 'Visual idea', 'Image text', 'STATIC POSTS', 'CAROUSEL POSTS', 'INSTAGRAM STORIES']);
  const chosenItems = [];
  for (const page of data) {
    for (const it of page.items) {
      if (!it.text.trim()) continue;
      if (it.x < CAPTION_X_MIN || it.x >= CAPTION_X_MAX) continue;
      if (HEADER_TERMS.has(it.text.trim())) continue;

      if (page.page < cur.page) continue;
      if (page.page === cur.page && it.y > cur.y) continue;
      if (next) {
        if (page.page > next.page) continue;
        if (page.page === next.page && it.y <= next.y) continue;
      }
      chosenItems.push({...it, page: page.page});
    }
  }

  chosenItems.sort((a,b) => a.page - b.page || b.y - a.y);

  const lines = [];
  const yTol = 3;
  let currentLine = null;
  for (const it of chosenItems) {
    if (!currentLine || currentLine.page !== it.page || Math.abs(currentLine.y - it.y) > yTol) {
      currentLine = { page: it.page, y: it.y, items: [] };
      lines.push(currentLine);
    }
    currentLine.items.push(it);
  }
  for (const line of lines) line.items.sort((a,b) => a.x - b.x);

  const paragraphs = [];
  let currentPara = null;
  let lastKnownGap = null;
  for (let k = 0; k < lines.length; k++) {
    const line = lines[k];
    let lineText = '';
    for (let j = 0; j < line.items.length; j++) {
      const it = line.items[j];
      if (j === 0) { lineText = it.text; continue; }
      const prev = line.items[j-1];
      const prevRight = prev.x + prev.w;
      const gap = it.x - prevRight;
      const needsSpace = gap > 0.5 && !/\s$/.test(lineText) && !/^\s/.test(it.text);
      lineText += (needsSpace ? ' ' : '') + it.text;
    }
    lineText = lineText.trim();
    if (!lineText) continue;

    if (currentPara === null) {
      currentPara = { lines: [line], texts: [lineText] };
      paragraphs.push(currentPara);
      continue;
    }
    const prevLine = currentPara.lines[currentPara.lines.length - 1];
    let breakPara = false;
    if (prevLine.page !== line.page) {
      // Cross-page: check if previous line ends with sentence-ending punctuation
      const prevText = currentPara.texts[currentPara.texts.length - 1];
      const endsSentence = /[.!?…]$|["']$/.test(prevText.trim());
      if (endsSentence && lastKnownGap !== null && lastKnownGap > PARA_GAP) breakPara = true;
    } else {
      const gap = prevLine.y - line.y;
      lastKnownGap = gap;
      if (gap > PARA_GAP) breakPara = true;
    }
    // Force paragraph break if line starts with a bullet marker
    if (/^[-•●○◦✔✓✗]\s/.test(lineText) || /^[-•●○◦✔✓✗]$/.test(lineText)) breakPara = true;
    // Also force paragraph break if previous line was a single bullet marker
    const prevText = currentPara ? currentPara.texts[currentPara.texts.length - 1] : '';
    if (/^[-•●○◦✔✓✗]$/.test(prevText.trim())) breakPara = true;

    if (breakPara) {
      currentPara = { lines: [line], texts: [lineText] };
      paragraphs.push(currentPara);
    } else {
      currentPara.lines.push(line);
      currentPara.texts.push(lineText);
    }
  }

  return paragraphs.map(p => joinParagraphLines(p.texts)).join('\n\n');
}

function joinParagraphLines(texts) {
  let out = texts[0];
  for (let i = 1; i < texts.length; i++) {
    const prev = out;
    const next = texts[i];
    // If previous ends with a partial hashtag (starts with # last word, no space) and next starts with a letter (not #), join without space
    const lastWord = prev.split(/\s+/).pop();
    const nextFirst = next[0];
    if (lastWord && lastWord.startsWith('#') && /[A-Za-z]/.test(nextFirst)) {
      // Determine: is the next word a hashtag continuation?
      // Check if the "first word" of next is short and starts with uppercase (likely camelcase continuation)
      const nextWords = next.split(/\s+/);
      const nextWord = nextWords[0];
      // If nextWord has no # but is likely a continuation (e.g., all-letters), join without space
      if (/^[A-Za-z]+$/.test(nextWord)) {
        // Join first word to prev without space, then rest with space
        out = prev + nextWord + (nextWords.length > 1 ? ' ' + nextWords.slice(1).join(' ') : '');
        continue;
      }
    }
    out += ' ' + next;
  }
  return out;
}

for (let i = 0; i < anchors.length; i++) {
  const cur = anchors[i];
  const next = anchors[i+1] || null;
  const caption = extractCaptionForRow(cur, next);
  result[cur.section][cur.num] = caption;
}

// STORIES: find "STORY N" markers on stories pages
// A story spans from its STORY marker until the next STORY marker.
// The caption is everything after the "Text" label, excluding "NOTE:" lines and the "STORY N" line itself.

// Collect story markers
const storyMarkers = [];
const storyPages = data.filter(p => sectionOf(p.page, 700) === 'stories' || sectionOf(p.page, 100) === 'stories');
for (const page of data) {
  for (const it of page.items) {
    const t = it.text.trim();
    const m = t.match(/^STORY (\d+)(?:\s*\(.*\))?$/);
    if (m && sectionOf(page.page, it.y) === 'stories') {
      storyMarkers.push({ num: parseInt(m[1]), page: page.page, y: it.y });
    }
  }
}

storyMarkers.sort((a,b) => a.page - b.page || b.y - a.y);
console.log('Story markers count:', storyMarkers.length);

// For each story marker, collect all items between this marker and next marker
// The x column for stories seems to be x=72 (main text) and x=90/108 (bullet items)
// Include only x >= 70 and skip: STORY marker line, "Text" label, NOTE lines
for (let i = 0; i < storyMarkers.length; i++) {
  const cur = storyMarkers[i];
  const next = storyMarkers[i+1] || null;

  const chosenItems = [];
  for (const page of data) {
    for (const it of page.items) {
      if (!it.text.trim()) continue;
      if (it.x < 70) continue;

      if (page.page < cur.page) continue;
      if (page.page === cur.page && it.y >= cur.y) continue; // strictly after
      if (next) {
        if (page.page > next.page) continue;
        if (page.page === next.page && it.y <= next.y) continue;
      }
      chosenItems.push({...it, page: page.page});
    }
  }

  chosenItems.sort((a,b) => a.page - b.page || b.y - a.y);

  // Filter out: 'Text' label, NOTE lines
  const filtered = chosenItems.filter(it => {
    const t = it.text.trim();
    if (t === 'Text') return false;
    if (t.startsWith('NOTE:')) return false;
    return true;
  });

  // Group into lines
  const lines = [];
  const yTol = 3;
  let currentLine = null;
  for (const it of filtered) {
    if (!currentLine || currentLine.page !== it.page || Math.abs(currentLine.y - it.y) > yTol) {
      currentLine = { page: it.page, y: it.y, items: [] };
      lines.push(currentLine);
    }
    currentLine.items.push(it);
  }
  for (const line of lines) line.items.sort((a,b) => a.x - b.x);

  // Same paragraph logic
  const paragraphs = [];
  let currentPara = null;
  let lastKnownGap = null;
  const STORY_PARA_GAP = 20;
  for (let k = 0; k < lines.length; k++) {
    const line = lines[k];
    let lineText = '';
    for (let j = 0; j < line.items.length; j++) {
      const it = line.items[j];
      if (j === 0) { lineText = it.text; continue; }
      const prev = line.items[j-1];
      const prevRight = prev.x + prev.w;
      const gap = it.x - prevRight;
      const needsSpace = gap > 0.5 && !/\s$/.test(lineText) && !/^\s/.test(it.text);
      lineText += (needsSpace ? ' ' : '') + it.text;
    }
    lineText = lineText.trim();
    if (!lineText) continue;

    if (currentPara === null) {
      currentPara = { lines: [line], texts: [lineText] };
      paragraphs.push(currentPara);
      continue;
    }
    const prevLine = currentPara.lines[currentPara.lines.length - 1];
    let breakPara = false;
    if (prevLine.page !== line.page) {
      if (lastKnownGap !== null && lastKnownGap > STORY_PARA_GAP) breakPara = true;
    } else {
      const gap = prevLine.y - line.y;
      lastKnownGap = gap;
      if (gap > STORY_PARA_GAP) breakPara = true;
    }
    // Force paragraph break on bullet lines
    if (/^[-•●○◦✔✓✗]\s/.test(lineText) || /^[-•●○◦✔✓✗]$/.test(lineText)) breakPara = true;
    const prevText = currentPara.texts[currentPara.texts.length - 1];
    if (/^[-•●○◦✔✓✗]$/.test(prevText.trim())) breakPara = true;

    if (breakPara) {
      currentPara = { lines: [line], texts: [lineText] };
      paragraphs.push(currentPara);
    } else {
      currentPara.lines.push(line);
      currentPara.texts.push(lineText);
    }
  }

  const caption = paragraphs.map(p => p.texts.join(' ')).join('\n\n');
  result.stories[cur.num] = caption;
}

fs.writeFileSync('C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.qa-public-social/pdf-captions.json', JSON.stringify(result, null, 2));

// Print all stories
console.log('\n=== ALL STORIES ===');
for (let i = 1; i <= 30; i++) {
  console.log(`\n--- Story ${i} ---`);
  console.log(result.stories[i]);
}
