// AXION "If It Exists" campaign — single source of truth.
// All copy and brand tokens come from the Claude Design handoff
// (design/axion-if-it-exists-campaign). Edit here, then run `npm run build`.

export const brand = {
  navy: '#123F6E',
  blue: '#1C5A9E',
  orange: '#E58A2D',
  cream: '#F6F0EA',
  sand: '#E9E2DA',
  white: '#FFFFFF',
  whatsapp: '+20 111 849 6288',
  whatsappLink: 'https://wa.me/201118496288',
  site: 'https://www.axionegypt.com',
  siteLabel: 'axionegypt.com',
  tagline: 'Powering Industry. Delivery Trust.',
  address: '15 Naser St, El Arbain Sq, Suez, Egypt',
  descriptor: 'Egyptian industrial supply',
  dare: 'TRY TO STUMP US',
  dareAr: 'جرّب تغلبنا',
  seasonTag: '10 PROOFS · ONE SEASON',
};

// Tile palette cycle: [background, foreground] — tiles cycle through these three.
export const tilePalette = [
  ['#1C5A9E', '#F6F0EA'],
  ['#E58A2D', '#123F6E'],
  ['#123F6E', '#E58A2D'],
];

// Geometric mark shapes (index 0–7). A tile at list position i uses
// shape (i*5 + (small ? 3 : 0)) % 8 in the tile's foreground color.
export const markShapes = [
  { id: 'circle',   w: 44, h: 44 },
  { id: 'ring',     w: 44, h: 44 },
  { id: 'square',   w: 44, h: 44 },
  { id: 'diamond',  w: 48, h: 48 }, // 34×34 square rotated 45°, bounding box ≈48
  { id: 'pill',     w: 56, h: 22 },
  { id: 'triangle', w: 48, h: 42 },
  { id: 'arch',     w: 44, h: 44 },
  { id: 'bars',     w: 44, h: 36 }, // two 44×14 bars, 22px apart
];

export const markIndex = (i, small = false) => (i * 5 + (small ? 3 : 0)) % 8;
export const tileColors = (i) => tilePalette[i % 3];

export const episodes = [
  {
    n: 1, stage: 'Reply', kicker: 'The dare', h1: 'TRY TO', h2: 'STUMP US.',
    sub: 'Ten emails. Ten categories. One promise: if it exists, we can supply it. Every episode ends with a real request a client threw at us and how fast we answered. Send us yours.',
    gridLabel: 'Things clients asked us for this year',
    items: ['Water chiller', 'MV cable drum', 'Fire hose reel', 'Ergonomic chairs', 'Rockwool slabs', 'Toner, 400 units'],
    proof: 'This year a client asked us for a water chiller. Quoted in 48h.',
    cta: 'Reply with the hardest item on your list',
    ctaNote: 'Reply to this email. A human answers within one working day.',
  },
  {
    n: 2, stage: 'Reply', kicker: 'Flow', h1: 'KEEP IT', h2: 'FLOWING.',
    sub: 'Valves, pumps, pipes, flanges and gaskets for water, steam, oil and gas lines. Brand-matched or spec-matched, your call.',
    gridLabel: 'In this episode',
    items: ['Gate & ball valves', 'Centrifugal pumps', 'Carbon steel pipe', 'Flanges DIN / ANSI', 'Gaskets & packing', 'Strainers'],
    proof: 'A textile mill needed 120 DN150 gate valves before a shutdown. Delivered in six days.',
    cta: 'Reply with your flow-line list',
    ctaNote: 'Part numbers, drawings or a photo of the nameplate all work.',
  },
  {
    n: 3, stage: 'Reply', kicker: 'Rotation', h1: 'KEEP IT', h2: 'TURNING.',
    sub: 'Bearings from SKF, FAG, Timken and NSK. Belts, gearboxes and seals to match. Original stock, traceable.',
    gridLabel: 'In this episode',
    items: ['SKF · FAG bearings', 'Timken · NSK bearings', 'V-belts & timing belts', 'Gearboxes', 'Oil seals & O-rings', 'Couplings'],
    proof: 'Cement plant, 22 FAG spherical roller bearings, urgent. Sourced in 72h.',
    cta: 'Reply with the part number',
    ctaNote: 'No part number? Send the bearing dimensions and we will identify it.',
  },
  {
    n: 4, stage: 'WhatsApp', kicker: 'Power', h1: 'KEEP IT', h2: 'POWERED.',
    sub: 'LV and MV cables, breakers, contactors, VFDs, PLCs and sensors. Panel-ready, from one supplier.',
    gridLabel: 'In this episode',
    items: ['LV / MV cables', 'Circuit breakers', 'Contactors & relays', 'VFDs', 'PLCs & HMIs', 'Sensors & switches'],
    proof: 'Food factory asked for three VFDs and 800 m of MV cable. One quote, one truck.',
    cta: 'WhatsApp your electrical BOQ',
    ctaNote: '+20 111 849 6288 · PDF, Excel or a photo of the list.',
  },
  {
    n: 5, stage: 'WhatsApp', kicker: 'Construction', h1: 'BUILD', h2: 'IT.',
    sub: 'Structural steel, insulation, waterproofing and epoxies. Delivered to site, on the day you pour.',
    gridLabel: 'In this episode',
    items: ['H-beams IPE / HEA', 'Channels & angles', 'Rockwool insulation', 'Waterproofing membranes', 'Epoxy flooring', 'Anchors & fasteners'],
    proof: 'A contractor needed 40 tons of H-beams plus rockwool for a cold store. Same PO, same week.',
    cta: 'WhatsApp your site list',
    ctaNote: 'Tonnage, grades and delivery date. We handle the rest.',
  },
  {
    n: 6, stage: 'WhatsApp', kicker: 'Safety', h1: 'PROTECT', h2: 'EVERYONE.',
    sub: 'Certified PPE and fire safety for every headcount, in every size. EN and ANSI rated.',
    gridLabel: 'In this episode',
    items: ['Safety helmets', 'Work gloves', 'Safety shoes', 'Coveralls', 'Fall harnesses', 'Fire extinguishers'],
    proof: 'A hotel group ordered 600 pairs of safety shoes in four sizes. Quoted overnight.',
    cta: 'WhatsApp your PPE headcount',
    ctaNote: 'Tell us the roles and the numbers. We size the order.',
  },
  {
    n: 7, stage: 'Starter cart', kicker: 'Facilities', h1: 'RUN THE', h2: 'FACILITY.',
    sub: 'Cleaning and consumables for factories, hotels and offices. Monthly, on schedule, one invoice.',
    gridLabel: 'In this episode',
    items: ['Industrial degreasers', 'Floor scrubbers', 'Paper rolls & tissue', 'Garbage bags', 'Disinfectants', 'Mops & trolleys'],
    proof: 'A hospital asked for degreasers and garbage bags on one order. We said yes.',
    cta: 'Start a facility starter cart',
    ctaNote: 'A pre-built monthly cart. Edit quantities, approve, done.',
  },
  {
    n: 8, stage: 'Vendor registration', kicker: 'Office', h1: 'EQUIP THE', h2: 'OFFICE.',
    sub: 'Laptops, printers, toner, ergonomic chairs and desks. Yes, the same supplier as your bearings.',
    gridLabel: 'In this episode',
    items: ['Business laptops', 'Printers & MFPs', 'Toner & ink', 'Ergonomic chairs', 'Desks & workstations', 'Monitors'],
    proof: 'A startup moved offices: 45 laptops, 45 chairs, 3 printers. One invoice.',
    cta: 'Register AXION as your vendor',
    ctaNote: 'Commercial register, tax card and bank letter sent on request.',
  },
  {
    n: 9, stage: 'Starter cart', kicker: 'Logistics', h1: 'PACK &', h2: 'SHIP.',
    sub: 'Everything between the finished product and the truck. Export-grade, ISPM-15 where it matters.',
    gridLabel: 'In this episode',
    items: ['Stretch film', 'PP / PET strapping', 'Packing tapes', 'Wooden pallets', 'Export crates', 'Corner boards'],
    proof: 'An exporter needed 2,000 heat-treated pallets. Quoted in 24h.',
    cta: 'Build your packing starter cart',
    ctaNote: 'Pick a monthly volume. We quote per pallet, per roll, per case.',
  },
  {
    n: 10, stage: 'Full list', kicker: 'The finale', h1: 'ONE LIST.', h2: 'ONE INVOICE.',
    sub: 'Nine episodes, nine categories, zero misses. Now send the whole list. Every line, every brand, one quote back.',
    finale: true,
    proof: 'Last quarter one client sent us a 214-line list. We quoted every line.',
    cta: 'Send your entire list',
    ctaNote: 'Reply, WhatsApp +20 111 849 6288, or attach the Excel. Any format.',
  },
];

// Finale 5×2 category recap grid.
export const categories = ['Flow', 'Rotation', 'Power', 'Build', 'Safety', 'Facility', 'Office', 'Pack & ship', 'The dare', 'Your list'];

// Fallback chips for LinkedIn cards when an episode has no item list (episode 10).
export const defaultLinkedInItems = ['Valves', 'Bearings', 'Cables', 'Steel', 'PPE', 'Consumables', 'Office', 'Packing'];

export const logoSvg = (size, { block = true } = {}) =>
  `<svg viewBox="0 0 100 100" style="width:${size}px;height:${size}px;${block ? 'display:block' : ''}"><path d="M30 78 L48 22 L52 22 L70 78 L61 78 L50 40 L39 78 Z" fill="#F6F0EA"></path><path d="M80 24 L56 52 L64 52 L54 76 L82 44 L73 44 Z" fill="#E58A2D"></path></svg>`;

export const fontsHref = 'https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;700;900&family=Tajawal:wght@700;800&display=swap';
