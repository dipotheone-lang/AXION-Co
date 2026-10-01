#!/usr/bin/env node
// Generates web/linkedin-card.html and web/index.html from data/episodes.mjs.
// The LinkedIn card embeds the episode data inline so it works over file://
// and takes ?ep=1..10 (default 3).

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  brand, episodes, defaultLinkedInItems, logoSvg,
} from '../data/episodes.mjs';

// Web pages use the vendored fonts so they render identically offline
// (and inside the export container, where Chromium can't reach Google Fonts).
const fontsHref = '../assets/fonts/fonts.css';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const webDir = join(root, 'web');
mkdirSync(webDir, { recursive: true });

const liData = episodes.map((e) => ({
  n: e.n, kicker: e.kicker, h1: e.h1, h2: e.h2,
  items: e.items || defaultLinkedInItems,
}));

const linkedinHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AXION · If It Exists · LinkedIn episode card 1080×1080</title>
<link href="${fontsHref}" rel="stylesheet">
<style>
  body{margin:0;background:${brand.sand};font-family:'Archivo',sans-serif;color:${brand.navy};padding:56px}
</style>
</head>
<body>
<div data-export="linkedin-card" style="width:1080px;height:1080px;background:${brand.blue};display:flex;flex-direction:column;padding:64px;box-sizing:border-box;overflow:hidden;position:relative">
  <div style="display:flex;justify-content:space-between;align-items:center">
    <div style="display:flex;align-items:center;gap:16px">
      <div style="display:flex;align-items:center;gap:10px">${logoSvg(52)}<div style="font:400 40px 'Anton';color:${brand.cream};letter-spacing:.04em">AXION</div></div>
      <div style="width:2px;height:30px;background:${brand.orange}"></div>
      <div style="font:400 30px 'Anton';color:${brand.orange}">IF IT EXISTS.</div>
    </div>
    <div style="background:${brand.orange};color:${brand.navy};font:400 26px 'Anton';padding:10px 20px;letter-spacing:.06em">PROOF <span id="ep-n">3</span>/10</div>
  </div>
  <div style="margin-top:auto">
    <div id="ep-kicker" style="font:700 18px 'Archivo';letter-spacing:.18em;text-transform:uppercase;color:${brand.cream};margin-bottom:24px"></div>
    <div style="font:400 180px/0.86 'Anton';color:${brand.cream}"><span id="ep-h1"></span><br><span id="ep-h2" style="color:${brand.orange}"></span></div>
  </div>
  <div id="ep-items" style="display:flex;flex-wrap:wrap;gap:12px;margin-top:40px"></div>
  <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end">
    <div style="font:400 34px/1 'Anton';color:${brand.cream}">${brand.dare}. <span style="font:800 34px 'Tajawal'">${brand.dareAr}</span></div>
    <div style="font:700 20px 'Archivo';color:${brand.cream}">WhatsApp <span style="color:${brand.orange}">${brand.whatsapp}</span></div>
  </div>
</div>
<script>
const EPISODES = ${JSON.stringify(liData)};
const n = Math.min(10, Math.max(1, parseInt(new URLSearchParams(location.search).get('ep') || '3', 10) || 3));
const ep = EPISODES[n - 1];
document.getElementById('ep-n').textContent = ep.n;
document.getElementById('ep-kicker').textContent = 'Episode ' + ep.n + ' · ' + ep.kicker;
document.getElementById('ep-h1').textContent = ep.h1;
document.getElementById('ep-h2').textContent = ep.h2;
document.getElementById('ep-items').innerHTML = ep.items.map(function (name) {
  return '<div style="background:${brand.navy};color:${brand.cream};font:900 20px \\'Archivo\\';text-transform:uppercase;padding:14px 20px;letter-spacing:.02em">' + name + '</div>';
}).join('');
</script>
</body>
</html>
`;

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AXION · "If It Exists" campaign</title>
<link href="${fontsHref}" rel="stylesheet">
<style>
  body{margin:0;background:${brand.sand};font-family:'Archivo',sans-serif;color:${brand.navy};padding:56px;max-width:960px}
  h1{font:400 64px/0.95 'Anton',sans-serif;margin:0 0 6px;color:${brand.navy}}
  h1 span{color:${brand.orange}}
  .sub{font:700 13px 'Archivo';letter-spacing:.14em;text-transform:uppercase;margin-bottom:40px}
  h2{font:700 13px 'Archivo';letter-spacing:.14em;text-transform:uppercase;border-top:3px solid ${brand.navy};padding-top:14px;margin:36px 0 12px}
  a{color:${brand.blue};font-weight:700;text-decoration:none}
  a:hover{color:${brand.orange}}
  ul{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px}
  .chips{display:flex;flex-wrap:wrap;gap:8px}
  .chips a{background:${brand.navy};color:${brand.cream};padding:10px 14px;font:900 13px 'Archivo';text-transform:uppercase}
  .chips a:hover{background:${brand.orange};color:${brand.navy}}
  p{font:400 15px/1.5 'Archivo';max-width:620px}
  code{background:#fff;padding:1px 5px}
</style>
</head>
<body>
<h1>IF IT EXISTS.<br><span>WE CAN SUPPLY IT.</span></h1>
<div class="sub">AXION · 10 proofs · one season · ${brand.dareAr}</div>

<h2>01 · Campaign key visual · 1200×628</h2>
<ul><li><a href="key-visual.html">key-visual.html</a> &nbsp;·&nbsp; PNG export in <code>exports/key-visual.png</code></li></ul>

<h2>02–11 · Email season · 10 episodes · 600px</h2>
<div class="chips">
${episodes.map((e) => `  <a href="../emails/episode-${String(e.n).padStart(2, '0')}.html">Ep ${e.n} · ${e.kicker}</a>`).join('\n')}
</div>
<p>Production table-based email HTML, generated from <code>data/episodes.mjs</code> by <code>npm run build:emails</code>. Before sending, rebuild with <code>ASSET_BASE</code> pointing at the hosted image base URL and let the ESP replace <code>{{UNSUBSCRIBE_URL}}</code>.</p>

<h2>12 · LinkedIn episode card · 1080×1080</h2>
<div class="chips">
${episodes.map((e) => `  <a href="linkedin-card.html?ep=${e.n}">Card ${e.n}</a>`).join('\n')}
</div>
<p>PNG exports for all ten episodes live in <code>exports/</code>.</p>
</body>
</html>
`;

writeFileSync(join(webDir, 'linkedin-card.html'), linkedinHtml);
writeFileSync(join(webDir, 'index.html'), indexHtml);
console.log('wrote web/linkedin-card.html, web/index.html');
