#!/usr/bin/env node
// Generates the 10 production email HTML files (emails/episode-NN.html)
// from data/episodes.mjs.
//
// Email HTML constraints honored here: table-based layout, inline styles,
// bgcolor attributes, no flex/grid. Geometric tile marks are PNG images
// (built by scripts/export-assets.mjs) so they survive every client.
//
// Image URLs: set ASSET_BASE to the public base URL that will host
// assets/email/ before sending, e.g.
//   ASSET_BASE=https://www.axionegypt.com/campaign/assets/email npm run build:emails
// The default ("../assets/email") is for local preview from the emails/ folder.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  brand, episodes, categories, tileColors, markIndex, markShapes, fontsHref,
} from '../data/episodes.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ASSET_BASE = process.env.ASSET_BASE || '../assets/email';

const colorName = { '#F6F0EA': 'cream', '#123F6E': 'navy', '#E58A2D': 'orange' };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Font stacks with graceful fallbacks for clients that block web fonts.
const ANTON = "'Anton', 'Arial Narrow', Impact, sans-serif";
const ARCHIVO = "'Archivo', Helvetica, Arial, sans-serif";
const TAJAWAL = "'Tajawal', Tahoma, Arial, sans-serif";

function markImg(i, fg, { small = false } = {}) {
  const idx = markIndex(i, small);
  const shape = markShapes[idx];
  const scale = small ? 0.55 : 1;
  const w = Math.round(shape.w * scale);
  const h = Math.round(shape.h * scale);
  const src = `${ASSET_BASE}/mark-${shape.id}-${colorName[fg]}.png`;
  return `<img src="${src}" width="${w}" height="${h}" alt="" style="display:block;border:0" />`;
}

function tileCell(name, i, { small = false } = {}) {
  const [bg, fg] = tileColors(i);
  const pad = small ? '10px 8px' : '16px 14px';
  const minH = small ? 84 : 120;
  const fontSize = small ? 10 : 14;
  const width = small ? '20%' : '33%';
  return `<td width="${width}" valign="top" bgcolor="${bg}" style="background:${bg};padding:${pad}">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="height:${minH}px">
      <tr><td valign="top" style="padding-bottom:${small ? 10 : 18}px">${markImg(i, fg, { small })}</td></tr>
      <tr><td valign="bottom" style="font:900 ${fontSize}px/1.15 ${ARCHIVO};color:${fg};text-transform:uppercase;letter-spacing:.02em">${esc(name)}</td></tr>
    </table>
  </td>`;
}

const gapCol = (w = 12) => `<td width="${w}" style="font-size:0;line-height:0">&nbsp;</td>`;
const gapRow = (h = 12, cols = 5) => `<tr><td colspan="${cols}" height="${h}" style="font-size:0;line-height:0">&nbsp;</td></tr>`;

function itemsGrid(items) {
  const row = (slice, offset) =>
    `<tr>${slice.map((name, j) => tileCell(name, offset + j)).join(gapCol())}</tr>`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    ${row(items.slice(0, 3), 0)}
    ${gapRow(12, 5)}
    ${row(items.slice(3, 6), 3)}
  </table>`;
}

function finaleBlock() {
  const row = (slice, offset) =>
    `<tr>${slice.map((name, j) => tileCell(name, offset + j, { small: true })).join(gapCol(8))}</tr>`;
  const bar = (color, pct) => `<tr><td>
      <table role="presentation" width="${pct}%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td height="10" bgcolor="${color}" style="background:${color};font-size:0;line-height:0">&nbsp;</td>
      </tr></table>
    </td></tr>
    <tr><td height="8" style="font-size:0;line-height:0">&nbsp;</td></tr>`;
  return `
  <!-- Finale: ten categories, one invoice -->
  <tr><td style="padding:26px 32px 8px">
    <div style="font:700 12px ${ARCHIVO};letter-spacing:.16em;text-transform:uppercase;color:${brand.navy};margin-bottom:14px">Ten episodes. Ten categories.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${row(categories.slice(0, 5), 0)}
      ${gapRow(8, 9)}
      ${row(categories.slice(5, 10), 5)}
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td align="center" style="padding:14px 0 10px">
        <img src="${ASSET_BASE}/funnel-orange.png" width="96" height="34" alt="" style="display:block;border:0" />
      </td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${brand.white}" style="background:${brand.white};border:3px solid ${brand.navy}">
      <tr><td style="padding:22px 26px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="font:400 34px ${ANTON};color:${brand.navy}">ONE INVOICE</td>
            <td align="right" style="font:700 12px ${ARCHIVO};color:${brand.blue};letter-spacing:.1em">AXION · INV-2026-0001</td>
          </tr>
        </table>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:12px">
          ${bar(brand.blue, 88)}
          ${bar(brand.blue, 72)}
          ${bar(brand.orange, 94)}
          ${bar(brand.blue, 60)}
          ${bar(brand.blue, 80)}
          ${bar(brand.orange, 50)}
        </table>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:2px solid ${brand.navy};margin-top:4px">
          <tr>
            <td style="padding-top:12px;font:700 13px ${ARCHIVO};color:${brand.navy};letter-spacing:.06em">214 LINES · 1 SUPPLIER · 1 DELIVERY</td>
            <td align="right" style="padding-top:12px;font:400 22px ${ANTON};color:${brand.orange}">PAID</td>
          </tr>
        </table>
      </td></tr>
    </table>
  </td></tr>`;
}

function emailHtml(ep) {
  const gridSection = ep.finale
    ? finaleBlock()
    : `
  <!-- Category grid -->
  <tr><td style="padding:26px 32px 8px">
    <div style="font:700 12px ${ARCHIVO};letter-spacing:.16em;text-transform:uppercase;color:${brand.navy};margin-bottom:14px">${esc(ep.gridLabel)}</div>
    ${itemsGrid(ep.items)}
  </td></tr>`;

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>AXION · If It Exists · Proof ${ep.n}/10</title>
<link href="${fontsHref}" rel="stylesheet" />
<style>
  body { margin: 0; padding: 0; background: ${brand.sand}; -webkit-text-size-adjust: 100%; }
  table { border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0; }
  img { border: 0; outline: none; }
  a { text-decoration: none; }
</style>
</head>
<body bgcolor="${brand.sand}" style="margin:0;padding:0;background:${brand.sand}">
<!-- Preheader (hidden) -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all">${esc(ep.sub)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${brand.sand}" style="background:${brand.sand}">
<tr><td align="center" style="padding:24px 0">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="${brand.cream}" style="width:600px;background:${brand.cream}">

  <!-- Masthead -->
  <tr><td bgcolor="${brand.navy}" style="background:${brand.navy};padding:14px 28px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td valign="middle">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td valign="middle"><img src="${ASSET_BASE}/logo-mark.png" width="30" height="30" alt="AXION" style="display:block;border:0" /></td>
              <td width="6"></td>
              <td valign="middle" style="font:400 24px ${ANTON};color:${brand.cream};letter-spacing:.04em">AXION</td>
              <td width="12"></td>
              <td width="1" bgcolor="${brand.orange}" style="background:${brand.orange};font-size:0;line-height:0" height="18">&nbsp;</td>
              <td width="12"></td>
              <td valign="middle" style="font:400 20px ${ANTON};color:${brand.orange};letter-spacing:.02em">IF IT EXISTS.</td>
            </tr>
          </table>
        </td>
        <td align="right" valign="middle">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="right"><tr>
            <td bgcolor="${brand.orange}" style="background:${brand.orange};color:${brand.navy};font:400 15px ${ANTON};padding:6px 12px;letter-spacing:.06em">PROOF&nbsp;${ep.n}/10</td>
          </tr></table>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Hero -->
  <tr><td bgcolor="${brand.blue}" style="background:${brand.blue};padding:36px 32px 34px">
    <div style="font:700 12px ${ARCHIVO};letter-spacing:.16em;text-transform:uppercase;color:${brand.cream};margin-bottom:18px">Episode ${ep.n} · ${esc(ep.kicker)}</div>
    <div style="font:400 92px/0.88 ${ANTON};color:${brand.cream}">${esc(ep.h1)}<br /><span style="color:${brand.orange}">${esc(ep.h2)}</span></div>
    <div style="font:400 17px/1.45 ${ARCHIVO};color:${brand.cream};margin-top:22px;max-width:500px">${esc(ep.sub)}</div>
  </td></tr>
${gridSection}

  <!-- Proof strip -->
  <tr><td style="padding:18px 32px 0">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${brand.navy}" style="background:${brand.navy}">
      <tr>
        <td valign="top" style="padding:18px 0 18px 22px;width:70px">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
            <td bgcolor="${brand.orange}" style="background:${brand.orange};color:${brand.navy};font:400 14px ${ANTON};padding:4px 10px;letter-spacing:.08em">PROOF</td>
          </tr></table>
        </td>
        <td valign="top" style="padding:18px 22px 18px 16px;font:700 17px/1.35 ${ARCHIVO};color:${brand.cream}">${esc(ep.proof)}</td>
      </tr>
    </table>
  </td></tr>

  <!-- CTA -->
  <tr><td style="padding:22px 32px 0">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td align="center" bgcolor="${brand.orange}" height="76" style="background:${brand.orange};height:76px">
        <a href="${ep.n >= 4 && ep.n <= 6 ? brand.whatsappLink : brand.site}" target="_blank" style="display:block;padding:0 20px;font:400 26px/76px ${ANTON};color:${brand.navy};letter-spacing:.02em;text-decoration:none;text-align:center">${esc(ep.cta.toUpperCase())}</a>
      </td></tr>
    </table>
    <div style="font:400 13px/1.4 ${ARCHIVO};color:${brand.navy};margin-top:12px;text-align:center">${esc(ep.ctaNote)}</div>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:22px 0 0">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${brand.navy}" style="background:${brand.navy}">
      <tr>
        <td style="padding:20px 32px">
          <div style="font:700 15px ${ARCHIVO};color:${brand.cream}">WhatsApp <a href="${brand.whatsappLink}" style="color:${brand.orange};text-decoration:underline">${brand.whatsapp}</a></div>
          <div style="font:400 12px ${ARCHIVO};color:${brand.cream};margin-top:4px">${brand.tagline} · <a href="${brand.site}" style="color:${brand.cream};text-decoration:underline">${brand.siteLabel}</a></div>
          <div style="font:400 12px ${ARCHIVO};color:${brand.cream};margin-top:4px">${brand.address}</div>
        </td>
        <td align="right" valign="middle" style="padding:20px 32px 20px 0">
          <a href="{{UNSUBSCRIBE_URL}}" style="font:400 12px ${ARCHIVO};color:${brand.cream};text-decoration:underline">Unsubscribe</a>
        </td>
      </tr>
    </table>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>
`;
}

const outDir = join(root, 'emails');
mkdirSync(outDir, { recursive: true });
for (const ep of episodes) {
  const file = join(outDir, `episode-${String(ep.n).padStart(2, '0')}.html`);
  writeFileSync(file, emailHtml(ep));
  console.log(`wrote ${file}`);
}
console.log(`asset base: ${ASSET_BASE}`);
