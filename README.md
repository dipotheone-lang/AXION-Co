# AXION · "IF IT EXISTS." campaign

> **IF IT EXISTS. WE CAN SUPPLY IT.** — Try to stump us · جرّب تغلبنا

Implementation of the *If It Exists* email season for AXION (Egyptian
industrial supply): 10 proof emails, the campaign key visual (1200×628) and a
LinkedIn episode-card template (1080×1080). Built from the Claude Design
handoff kept in [`design/`](design/).

Brand: deep blue `#123F6E` · steel blue `#1C5A9E` · orange `#E58A2D` ·
cream `#F6F0EA` · sand `#E9E2DA`. Type: Anton / Archivo / Tajawal (vendored,
OFL — see `assets/fonts/LICENSE.md`).

## What's here

| Path | What it is |
| --- | --- |
| `data/episodes.mjs` | **Single source of truth** — all episode copy, brand tokens, tile palette & mark logic. Edit here, then `npm run build`. |
| `emails/episode-01..10.html` | Production email HTML (600px, table-based, inline styles) — generated. |
| `web/key-visual.html` | Campaign key visual, 1200×628. |
| `web/linkedin-card.html` | LinkedIn card, 1080×1080 — takes `?ep=1..10` (default 3) — generated. |
| `web/index.html` | Overview page linking everything — generated. |
| `exports/` | Ready-to-post PNGs: `key-visual.png` + `linkedin-card-01..10.png` — generated. |
| `assets/email/` | PNG marks/logo the emails reference — generated. |
| `scripts/` | The generators (`build-web.mjs`, `build-emails.mjs`, `export-assets.mjs`). |
| `design/` | Original Claude Design prototype (reference only — open `axion-if-it-exists-season.dc.html` in a browser). |

## The season

| # | Episode | CTA stage |
| --- | --- | --- |
| 1 | THE DARE — Try to stump us | Reply |
| 2 | KEEP IT FLOWING — valves · pumps · piping | Reply |
| 3 | KEEP IT TURNING — bearings · belts · gearboxes | Reply |
| 4 | KEEP IT POWERED — cables · VFDs · PLCs | WhatsApp |
| 5 | BUILD IT — steel · insulation · epoxies | WhatsApp |
| 6 | PROTECT EVERYONE — PPE · fire safety | WhatsApp |
| 7 | RUN THE FACILITY — hygiene · consumables | Starter cart |
| 8 | EQUIP THE OFFICE — laptops · chairs · toner | Vendor registration |
| 9 | PACK & SHIP — film · strapping · pallets | Starter cart |
| 10 | ONE LIST. ONE INVOICE. — the finale | Full list |

## Build & preview

```bash
npm install          # playwright-core only (Chromium itself must be present)
npm run build        # regenerate web pages + emails from data/episodes.mjs
npm run export       # re-render assets/email PNGs + exports/ PNGs (needs Chromium)
npm run serve        # preview at http://localhost:8080 (open /web/)
```

`npm run export` looks for Chromium at `/opt/pw-browsers/chromium`; override
with `CHROMIUM_PATH=/path/to/chromium`.

## Before sending the emails

1. **Host the images.** Upload `assets/email/` somewhere public, then rebuild
   with the real base URL:
   `ASSET_BASE=https://www.axionegypt.com/campaign/assets/email npm run build:emails`
2. **Unsubscribe.** Every footer links `{{UNSUBSCRIBE_URL}}` — map it to your
   ESP's unsubscribe merge tag.
3. **CTA links.** Episodes 4–6 link to WhatsApp (`wa.me/201118496288`); the
   rest link to axionegypt.com. Point them at the final landing/cart/vendor
   pages in `scripts/build-emails.mjs` (or your ESP) when those URLs exist.
4. **Client support.** Layouts are table-based with inline styles. Web fonts
   render where supported (Apple Mail, iOS); Gmail/Outlook fall back to
   Impact/Helvetica stacks. Tile marks are PNGs so the geometry survives
   every client.

Cadence (from the campaign plan): 2×/week, Mon + Wed 09:30 Cairo,
Current-then-Potential stagger; repliers routed to Mohamed within 2 hours,
bounces/repliers excluded from subsequent sends.

## Sending recommendations

For the full 401-contact run, in order of preference:

1. **Use an ESP** (Brevo, Mailchimp, HubSpot, …). It provides what the
   campaign plan requires and plain Gmail does not: a one-click unsubscribe
   link mapped to `{{UNSUBSCRIBE_URL}}`, automatic bounce exclusion,
   scheduled Mon + Wed 09:30 Cairo sends, and open/click tracking per
   episode. Import the HTML from `emails/` as custom-code templates.
2. **If sending directly from Gmail** (axion426@gmail.com):
   - Rebuild with a working unsubscribe link:
     `UNSUBSCRIBE_URL='mailto:axion426@gmail.com?subject=Unsubscribe' npm run build:emails`
     and process those unsubscribe requests manually before every send.
   - Keep batches small — 50–80 recipients per day, always BCC, never one
     giant send. A 400-recipient blast from a plain Gmail address is the
     fastest way to get the account spam-flagged.
   - Warm up: start with the Current-clients segment (existing senders'
     reputation), then Potential.
   - Remove bounces and repliers from the list by hand after each episode;
     route every reply to Mohamed within 2 hours.
   - Expect Gmail's own ~500 recipients/day limit; the stagger plan stays
     well under it.
3. **Either way**: send each episode to yourself first and check rendering
   in Gmail, Outlook and a phone before the batch goes out; keep the
   episode order and the 2×/week rhythm — the escalating CTAs
   (reply → WhatsApp → cart/vendor → full list) assume it.
