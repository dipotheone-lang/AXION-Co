#!/usr/bin/env node
// Renders PNG assets with the pre-installed Chromium (via playwright-core):
//   assets/email/   logo-mark.png, funnel-orange.png, mark-<shape>-<color>.png (@2x)
//   exports/        key-visual.png (1200×628), linkedin-card-01..10.png (1080×1080)
// Run `npm run build` first so web/ pages exist.

import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
import { brand, markShapes, logoSvg } from '../data/episodes.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const emailAssets = join(root, 'assets', 'email');
const exportsDir = join(root, 'exports');
mkdirSync(emailAssets, { recursive: true });
mkdirSync(exportsDir, { recursive: true });

const markColors = { cream: brand.cream, navy: brand.navy, orange: brand.orange };

// CSS for each mark shape, matching the design's marks(fg) list.
const shapeCss = (id, fg) => ({
  circle: `width:44px;height:44px;border-radius:50%;background:${fg}`,
  ring: `width:44px;height:44px;border-radius:50%;border:9px solid ${fg};box-sizing:border-box`,
  square: `width:44px;height:44px;background:${fg}`,
  diamond: `width:34px;height:34px;background:${fg};transform:rotate(45deg)`,
  pill: `width:56px;height:22px;border-radius:11px;background:${fg}`,
  triangle: `width:0;height:0;border-left:24px solid transparent;border-right:24px solid transparent;border-bottom:42px solid ${fg}`,
  arch: `width:44px;height:44px;border-radius:22px 22px 0 0;background:${fg}`,
  bars: `width:44px;height:14px;background:${fg};box-shadow:0 22px 0 ${fg}`,
}[id]);

function marksPage() {
  let cells = '';
  for (const shape of markShapes) {
    for (const [cname, fg] of Object.entries(markColors)) {
      cells += `<div id="mark-${shape.id}-${cname}" style="width:${shape.w}px;height:${shape.h}px;display:flex;align-items:center;justify-content:center;overflow:visible">
        <div style="${shapeCss(shape.id, fg)}"></div></div>\n`;
    }
  }
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;background:transparent;display:flex;flex-wrap:wrap;gap:24px;padding:24px">
${cells}
<div id="funnel-orange" style="width:96px;height:34px;display:flex;align-items:flex-start;justify-content:center">
  <div style="width:0;height:0;border-left:48px solid transparent;border-right:48px solid transparent;border-top:34px solid ${brand.orange}"></div>
</div>
<div id="logo-mark" style="width:30px;height:30px">${logoSvg(30)}</div>
</body></html>`;
}

async function main() {
  const executablePath = process.env.CHROMIUM_PATH
    || (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
  const browser = await chromium.launch({
    executablePath,
    args: ['--allow-file-access-from-files', '--force-color-profile=srgb'],
  });

  // 1) Email marks + logo at 2x with transparency.
  const marksFile = join(emailAssets, '.marks.html');
  writeFileSync(marksFile, marksPage());
  const markPage = await browser.newPage({ deviceScaleFactor: 2 });
  await markPage.goto(pathToFileURL(marksFile).href);
  const ids = [
    ...markShapes.flatMap((s) => Object.keys(markColors).map((c) => `mark-${s.id}-${c}`)),
    'funnel-orange', 'logo-mark',
  ];
  for (const id of ids) {
    await markPage.locator(`#${id}`).screenshot({
      path: join(emailAssets, `${id}.png`),
      omitBackground: true,
    });
    console.log(`assets/email/${id}.png`);
  }
  await markPage.close();

  // 2) Campaign exports at 1x (final social/ad sizes).
  const shotPage = await browser.newPage({
    deviceScaleFactor: 1,
    viewport: { width: 1400, height: 1300 },
  });
  const shoot = async (url, selector, out) => {
    await shotPage.goto(url, { waitUntil: 'networkidle' });
    await shotPage.evaluate(() => document.fonts.ready);
    await shotPage.locator(selector).screenshot({ path: out });
    console.log(out.replace(root + '/', ''));
  };

  await shoot(
    pathToFileURL(join(root, 'web', 'key-visual.html')).href,
    '[data-export="key-visual"]',
    join(exportsDir, 'key-visual.png'),
  );
  for (let n = 1; n <= 10; n++) {
    await shoot(
      pathToFileURL(join(root, 'web', 'linkedin-card.html')).href + `?ep=${n}`,
      '[data-export="linkedin-card"]',
      join(exportsDir, `linkedin-card-${String(n).padStart(2, '0')}.png`),
    );
  }

  await browser.close();
}

main().catch((err) => { console.error(err); process.exit(1); });
