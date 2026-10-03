'use client';


import Link from 'next/link';
import React, { useState, useEffect, useRef, useCallback } from 'react';



const BRAND = {
  name: 'Knight Flame',
  tagline: 'Serving you since 2010',
  facebook: 'https://www.facebook.com/share/1EinrXcYBo/',
  instagram: 'https://www.instagram.com/knightflameindustries?igsh=MTJpYWVtcnlvOHVweQ==',

  phone: '+91 00000 00000',
  email: 'sales@knightflame.in',
  city: 'India',
};

const IMG = {
  logo: '/logo.jpeg',
  // Big photo in the Bahubali section.
  bahubali: '/images/gas stove7.png',
};

/* ────────────────────────────────────────────────────────────
   EDIT #2 — CATALOGUE
   Each product's `img` is its photo. Stoves also take `imgByVariant`,
   so the picture changes when the visitor taps 2 / 3 / 4 Burner.
   ──────────────────────────────────────────────────────────── */

const GROUPS = [
  {
    id: 'cooking',
    label: 'Cooking range',
    note: 'Stoves & hobtops',
    items: [
      {
        id: 'ss',
        name: 'Stainless Steel Gas Stoves',
        img: '/images/products/ss-gas-stove-3-burner.png',
        imgByVariant: {
          '2 Burner': '/images/gas stove5.png',
          '3 Burner': '/images/gas stove2.png',
          '4 Burner': '/images/gas stove7.png',
        },
        blurb: 'Full stainless body, brass burners, powder-coated pan supports. The workhorse of the range.',
        variants: ['2 Burner', '3 Burner', '4 Burner'],
        specs: [['Body', '304-grade steel'], ['Burner', 'Brass'], ['Finish', 'Matte / mirror']],
      },
      {
        id: 'glass',
        name: 'Glass Top Gas Stoves',
        img: '/images/products/glass-gas-stove-3-burner.png',
        imgByVariant: {
          '2 Burner': '/images/gas stove4.png',
          '3 Burner': '/images/gas stove3.png',
          '4 Burner': '/images/gas stove7.png',
        },
        blurb: '6 mm toughened glass over a steel frame. Wipes clean in a stroke, holds its gloss for years.',
        variants: ['2 Burner', '3 Burner', '4 Burner'],
        specs: [['Top', '6 mm toughened'], ['Frame', 'Powder-coated'], ['Knobs', 'Euro-style']],
      },
      {
        id: 'bahubali',
        name: 'Bahubali Gas Stoves',
        img: '/images/products/bahubali-gas-stove-4-burner.png',
        imgByVariant: {
          '2 Burner': '/images/gas stove4.png',
          '3 Burner': '/images/gas stove6.png',
          '4 Burner': '/images/gas stove7.png',
        },
        blurb: 'Our heavy-duty line. Thicker frame, wider pan supports, high-flow burners built for big vessels.',
        variants: ['2 Burner', '3 Burner', '4 Burner'],
        specs: [['Grade', 'Heavy duty'], ['Pan support', 'Extra wide'], ['Burner', 'High flow brass']],
      },
      {
        id: 'hob',
        name: 'Premium Hobtops',
        img: '/images/products/hobtop-4-burner.png',
        imgByVariant: {
          '3 Burner': '/images/gas stove6.png',
          '4 Burner': '/images/gas stove7.png',
        },
        blurb: 'Built-in hobs with auto-ignition and cast iron pan supports. Sits flush into the counter.',
        variants: ['3 Burner', '4 Burner'],
        specs: [['Mount', 'Built-in'], ['Ignition', 'Auto'], ['Support', 'Cast iron']],
      },
    ],
  },
  {
    id: 'cookers',
    label: 'Pressure cookers',
    note: 'Four metals, one seal',
    items: [
      {
        id: 'classy',
        name: 'Classy Aluminium',
        img: '/images/cooker.png',
        blurb: 'Light, fast, forgiving. The everyday cooker that heats quickly and costs least to run.',
        variants: ['3 L', '5 L', '7.5 L'],
        specs: [['Metal', 'Virgin aluminium'], ['Lid', 'Outer'], ['Base', 'Induction: no']],
      },
      {
        id: 'black',
        name: 'Black Elegance Hard Anodised',
        img: '/images/cooker2.png',
        blurb: 'Anodised to a surface harder than steel. Non-reactive with tamarind, tomato and curd.',
        variants: ['3 L', '5 L', '7.5 L'],
        specs: [['Metal', 'Hard anodised'], ['Lid', 'Inner'], ['Base', 'Induction: no']],
      },
      {
        id: 'inox',
        name: 'Inox Stainless Steel',
        img: '/images/cooker.png',
        blurb: 'Mirror-polished steel with a sandwich bottom. Goes from gas to induction without a thought.',
        variants: ['3 L', '5 L', '7.5 L'],
        specs: [['Metal', 'Stainless steel'], ['Lid', 'Inner'], ['Base', 'Induction: yes']],
      },
      {
        id: 'steelx',
        name: 'Steel-X Triply',
        img: '/images/cooker3.png',
        blurb: 'Steel, aluminium, steel — bonded. Even heat right to the rim, no scorching at the centre.',
        variants: ['3 L', '5 L', '6 L'],
        specs: [['Metal', 'Triply bonded'], ['Lid', 'Inner'], ['Base', 'Induction: yes']],
      },
    ],
  },
  {
    id: 'cookware',
    label: 'Cookware',
    note: 'Three surfaces',
    items: [
      {
        id: 'ha',
        name: 'Hard Anodised Cookware',
        img: '/images/tawa.png',
        blurb: 'Deep charcoal finish that will not react with acidic masala. Kadai, tawa, fry pan, sauce pan.',
        variants: ['Kadai', 'Tawa', 'Fry pan', 'Sauce pan'],
        specs: [['Surface', 'Anodised'], ['Heat', 'Even'], ['Care', 'Hand wash']],
      },
      {
        id: 'triply',
        name: 'Triply Cookware',
        img: '/images/kadhai3.png',
        blurb: 'Three bonded layers for restaurant-grade control. Induction and gas, both without adjustment.',
        variants: ['Kadai', 'Fry pan', 'Sauce pan', 'Casserole'],
        specs: [['Layers', 'Steel–Al–Steel'], ['Induction', 'Yes'], ['Care', 'Dishwasher safe']],
      },
      {
        id: 'honeycomb',
        name: 'Honeycomb Cookware',
        img: '/images/kadhai2.png',
        blurb: 'Laser-etched honeycomb texture lifts food off the surface — less oil, less sticking.',
        variants: ['Fry pan', 'Tawa', 'Kadai'],
        specs: [['Surface', 'Etched steel'], ['Oil', 'Low'], ['Metal spoon', 'Safe']],
      },
    ],
  },
  {
    id: 'appliances',
    label: 'Appliances & accessories',
    note: 'The rest of the counter',
    items: [
      {
        id: 'induction',
        name: 'Infrared / Induction Cooktops',
        img: '/images/induction2.png',
        blurb: 'Infrared for any vessel, induction for speed. Preset menus and a glass top that stays cool at the edge.',
        variants: ['Induction', 'Infrared'],
        specs: [['Power', '1200–2000 W'], ['Top', 'Ceramic glass'], ['Presets', 'Indian menu']],
      },
      {
        id: 'mixer',
        name: 'Mixer Grinders',
        img: '/images/mixer.png',
        blurb: 'Copper-wound motors and stainless jars sized for chutney, masala and daily wet grinding.',
        variants: ['3 jar', '4 jar'],
        specs: [['Motor', '750 W copper'], ['Jars', 'Stainless'], ['Speeds', '3 + pulse']],
      },
      {
        id: 'kettle',
        name: 'Electric Kettles',
        img: '/images/kettle.png',
        blurb: 'Steel interior, concealed element, auto cut-off. Boils and stops without being watched.',
        variants: ['1.2 L', '1.5 L', '1.8 L'],
        specs: [['Body', 'Stainless'], ['Cut-off', 'Auto + dry'], ['Base', '360° cordless']],
      },
      {
        id: 'iron',
        name: 'Electric Irons',
        img: '/images/iron.png',
        blurb: 'Non-stick and steam variants with a weighted sole plate that presses cotton flat in one pass.',
        variants: ['Dry', 'Steam'],
        specs: [['Sole', 'Non-stick'], ['Cord', '360° swivel'], ['Thermostat', 'Adjustable']],
      },
      {
        id: 'lighter',
        name: 'Kitchen Lighters',
        img: '/images/lighter.png',
        blurb: 'Refillable gas lighters with a long steel nozzle and a click that lasts thousands of sparks.',
        variants: ['Refillable', 'Electronic'],
        specs: [['Nozzle', 'Steel'], ['Refill', 'Butane'], ['Sparks', '20,000+']],
      },
      {
        id: 'hose',
        name: 'Kitchen Hose Pipe',
        img: '/images/hose-pipe.png',
        blurb: 'ISI-marked LPG hose, braided and flame-retardant. The cheapest part of the kitchen to get right.',
        variants: ['1.5 m', '2 m'],
        specs: [['Standard', 'ISI marked'], ['Build', 'Braided'], ['Life', '5 years']],
      },
    ],
  },
];

const TICKER = [
  'Brass burners',
  'ISI-marked components',
  'Manufactured since 2010',
  '6 mm toughened glass',
  'Triply bonded bases',
  'Pan-India dealer network',
  'Spare parts stocked',
  '2-year product warranty',
];

const COMPARE = {
  head: ['', 'Stainless Steel', 'Glass Top', 'Bahubali'],
  rows: [
    ['Best for', 'Daily heavy use', 'Modular kitchens', 'Large vessels, joint families'],
    ['Top surface', 'Brushed 304 steel', '6 mm toughened glass', 'Reinforced steel'],
    ['Cleaning', 'Scrub-tolerant', 'Single wipe', 'Scrub-tolerant'],
    ['Pan support', 'Standard', 'Standard', 'Extra wide'],
    ['Burner flow', 'Standard brass', 'Standard brass', 'High flow brass'],
    ['Sizes', '2 / 3 / 4 burner', '2 / 3 / 4 burner', '2 / 3 / 4 burner'],
  ],
};

const REASONS = [
  { icon: 'flame', title: 'Brass, not alloy', body: 'Burners are machined brass. They take heat cycling for years without warping or losing port shape.' },
  { icon: 'shield', title: 'Tested before it ships', body: 'Every stove is gas-tested and flame-checked on the line. Nothing leaves on a sample basis.' },
  { icon: 'layers', title: 'Metal chosen per job', body: 'Aluminium where speed matters, anodised where acid does, triply where evenness does. Not one metal for everything.' },
  { icon: 'wrench', title: 'Parts stay available', body: 'Burners, knobs, gaskets and pan supports are stocked for models we stopped making years ago.' },
  { icon: 'truck', title: 'Dealers across India', body: 'Stock moves through a distributor network built over fifteen years, not a single warehouse.' },
  { icon: 'award', title: 'One brand, whole kitchen', body: 'Stove, cooker, cookware, mixer and hose from one manufacturer — one warranty desk to call.' },
];

const PROCESS = [
  { n: '01', title: 'Metal in', img: '/images/process1.png', body: 'Steel coil, aluminium ingot and brass rod arrive with mill certificates and are lot-tagged on receipt.' },
  { n: '02', title: 'Press & form', img: '/images/process2.png', body: 'Bodies are pressed, deep-drawn and trimmed. Cooker bodies are spun and their rims machined to seal.' },
  { n: '03', title: 'Burner machining', img: '/images/process3.png', body: 'Brass burners are cast, then ports are drilled and gauged so flame height matches across every head.' },
  { n: '04', title: 'Finish', img: '/images/process4.png', body: 'Powder coat, anodising or mirror polish, depending on the line. Glass tops are toughened and bonded.' },
  { n: '05', title: 'Flame test', img: '/images/process5.png', body: 'Each unit is gas-charged, leak-checked and burned. It is boxed only after the flame reads clean and blue.' },
];

const STATS = [
  { value: 2010, label: 'Manufacturing since', plain: true },
  { value: 14, suffix: '', label: 'Product lines' },
  { value: 40, suffix: '+', label: 'SKUs in production' },
  { value: 900, suffix: '+', label: 'Dealers stocked' },
];

const REVIEWS = [
  { quote: 'We switched our showroom to Knight Flame three years ago. The Bahubali 4-burner outsells everything else on the floor and we have never had a batch returned.', name: 'Ramesh Patel', role: 'Distributor, Ahmedabad', img: '/images/people/ramesh-patel.jpg' },
  { quote: 'Bought the glass top in 2019 and it still lights on the first click. The service boy came with the right burner in hand, not a week later.', name: 'Sunita Rao', role: 'Home customer, Pune', img: '/images/people/sunita-rao.jpg' },
  { quote: 'The triply cookers hold pressure evenly, which matters when we are running six of them at once. Sturdy handles, and the gaskets last.', name: 'Imran Sheikh', role: 'Cloud kitchen owner, Delhi', img: '/images/people/imran-sheikh.jpg' },
  { quote: 'Margins are fair and replacements are quick. That is really all a retailer wants from a brand.', name: 'Karthik Menon', role: 'Retailer, Kochi', img: '/images/people/karthik-menon.jpg' },
];

const FAQS = [
  { q: 'Are the burners brass or alloy?', a: 'Brass across the gas stove and hobtop range. Brass holds its port geometry through years of heat cycling, so the flame stays even instead of going yellow at the edges.' },
  { q: 'Which stove should I buy — steel or glass?', a: 'Glass top if your kitchen is modular and you want a single-wipe clean. Stainless steel if the stove takes heavy daily cooking and gets scrubbed hard. Bahubali if you regularly cook in large vessels.' },
  { q: 'Do your pressure cookers work on induction?', a: 'Inox Stainless Steel and Steel-X Triply do. Classy Aluminium and Black Elegance Hard Anodised are for gas only.' },
  { q: 'What is covered under warranty?', a: 'Manufacturing defects for two years from the date of invoice, with a five-year cover on brass burners. Glass breakage from impact and normal wear are not covered.' },
  { q: 'How do I become a Knight Flame dealer?', a: 'Send your firm name, city and current brand mix through the dealer form on this page. Our territory manager responds within two working days with pricing and margin structure.' },
  { q: 'Can I get spare parts for an older model?', a: 'Yes. Burners, knobs, pan supports and gaskets are stocked for discontinued models. Share the model number printed on the rating plate underneath the unit.' },
];

const NAV = [
  { label: 'Catalogue', href: '#catalogue' },
  { label: 'Bahubali', href: '#bahubali' },
  { label: 'Cookers', href: '#cookers' },
  { label: 'Cookware', href: '#cookware' },
  { label: 'Why us', href: '#why' },
  { label: 'Dealers', href: '#dealers' },
];

/* ────────────────────────────────────────────────────────────
   BRAND STYLESHEET
   Scoped under .kf so it can never leak into the rest of the app.
   ──────────────────────────────────────────────────────────── */

function BrandStyles() {
  return (
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=Saira:wght@400;500;600;700;800&family=Saira+Condensed:wght@500;600;700&family=Inter+Tight:wght@400;500;600&display=swap');

.kf{
  --ink:#0B0B0C; --panel:#121316; --panel2:#17191D; --steel:#2B2F36;
  --gold:#D3A75F; --gold-hi:#F0D7A4; --gold-lo:#9A6F2C;
  --flame:#2E7DD1; --cream:#F2EDE4; --mute:#8B8F97;
  background:var(--ink); color:var(--cream);
  font-family:'Inter Tight',ui-sans-serif,system-ui,sans-serif;
  -webkit-font-smoothing:antialiased; overflow-x:hidden;
}
.kf ::selection{background:var(--gold);color:#0B0B0C}
.kf-display{font-family:'Saira',ui-sans-serif,system-ui,sans-serif;letter-spacing:-.02em;line-height:.95}
.kf-util{font-family:'Saira Condensed',ui-sans-serif,sans-serif;text-transform:uppercase;letter-spacing:.2em;font-weight:600}
.kf-mute{color:var(--mute)}
.kf-gold{color:var(--gold)}
/* fallbacks so caption sizes hold even if Tailwind's JIT isn't running */
.kf .text-\[9px\]{font-size:9px;line-height:1.5}
.kf .text-\[10px\]{font-size:10px;line-height:1.5}
.kf .text-\[11px\]{font-size:11px;line-height:1.5}
.kf-metal{
  background-image:linear-gradient(100deg,var(--gold-lo) 0%,var(--gold) 20%,var(--gold-hi) 42%,var(--gold) 60%,var(--gold-lo) 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
}

/* ── IMAGES ──────────────────────────────────────────────────
   Every photo sits in one of these frames. .kf-img keeps the box
   from collapsing before the file loads, so nothing jumps. */
.kf-img{position:relative;display:block;overflow:hidden;width:100%;background:radial-gradient(circle at 50% 45%,rgba(211,167,95,.09),transparent 62%),#0E1013}
.kf-img>img{display:block;width:100%;height:100%}
.kf-img-pad>img{padding:var(--kf-imgpad,8%)}
.kf-pad-tight{--kf-imgpad:3%}
.kf-pad-none{--kf-imgpad:0}
.kf-zoom>img{transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.kf-zoom:hover>img{transform:scale(1.05)}
/* placeholder shown until the real file exists */
.kf-img-wait{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.55rem;
  padding:1rem;text-align:center;color:#565B63;border:1px dashed var(--steel)}
.kf-img-path{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;line-height:1.5;color:#454A52;word-break:break-all;max-width:100%}

.kf-panel{background:var(--panel);border:1px solid var(--steel)}
.kf-hair{border-color:var(--steel)}

/* riveted rating-plate treatment — the signature surface for product tiles */
.kf-plate{position:relative;background:linear-gradient(158deg,#1A1D22 0%,#0E1013 62%,#121418 100%);border:1px solid var(--steel);isolation:isolate}
.kf-plate::after{
  content:"";position:absolute;inset:0;pointer-events:none;z-index:3;
  background-image:
    radial-gradient(circle,#5C626B 38%,rgba(0,0,0,.6) 42%,transparent 62%),
    radial-gradient(circle,#5C626B 38%,rgba(0,0,0,.6) 42%,transparent 62%),
    radial-gradient(circle,#5C626B 38%,rgba(0,0,0,.6) 42%,transparent 62%),
    radial-gradient(circle,#5C626B 38%,rgba(0,0,0,.6) 42%,transparent 62%);
  background-size:6px 6px;background-repeat:no-repeat;
  background-position:8px 8px,calc(100% - 8px) 8px,8px calc(100% - 8px),calc(100% - 8px) calc(100% - 8px);
}
.kf-plate:hover{border-color:#3E434C}
.kf-plate-in{position:absolute;inset:6px;border:1px solid rgba(211,167,95,.10);pointer-events:none;z-index:2}

/* brushed-gold hairline border */
.kf-edge{
  border:1px solid transparent;border-radius:2px;
  background-image:linear-gradient(var(--panel),var(--panel)),linear-gradient(140deg,var(--gold-hi),var(--gold-lo) 55%,var(--gold-hi));
  background-origin:border-box;background-clip:padding-box,border-box;
}

/* buttons */
.kf-btn{display:inline-flex;align-items:center;justify-content:center;gap:.6rem;font-family:'Saira Condensed',sans-serif;text-transform:uppercase;letter-spacing:.16em;font-weight:700;font-size:.82rem;padding:.95rem 1.6rem;border:1px solid transparent;transition:.22s ease;cursor:pointer}
.kf-btn-gold{background-image:linear-gradient(140deg,var(--gold-hi),var(--gold) 45%,var(--gold-lo));color:#0B0B0C}
.kf-btn-gold:hover{background-image:linear-gradient(140deg,var(--gold-hi),var(--gold-hi) 45%,var(--gold));transform:translateY(-2px)}
.kf-btn-ghost{border-color:var(--steel);color:var(--cream);background:transparent}
.kf-btn-ghost:hover{border-color:var(--gold);color:var(--gold)}
.kf-btn-sq{padding:.85rem}
/* .kf-btn declares display, so it beats Tailwind's .hidden — this sheet loads last.
   Responsive show/hide for buttons therefore lives here, not in utilities. */
.kf-cta-desk{display:none}
@media (min-width:640px){.kf-cta-desk{display:inline-flex}}
.kf a:focus-visible,.kf button:focus-visible,.kf input:focus-visible,.kf textarea:focus-visible,.kf select:focus-visible{outline:2px solid var(--gold);outline-offset:3px}

/* variant chips that swap the product photo */
.kf-chip{font-family:'Saira Condensed',sans-serif;text-transform:uppercase;letter-spacing:.16em;font-weight:600;font-size:10px;
  padding:.4rem .8rem;border:1px solid var(--steel);color:var(--mute);background:transparent;cursor:pointer;transition:.2s ease}
.kf-chip:hover{border-color:#4A505A;color:var(--cream)}
.kf-chip[aria-pressed="true"]{border-color:var(--gold);color:var(--gold);background:rgba(211,167,95,.07)}

/* inputs */
.kf-field{width:100%;background:#0E1013;border:1px solid var(--steel);color:var(--cream);padding:.85rem 1rem;font-size:.95rem;transition:border-color .2s}
.kf-field::placeholder{color:#5D626B}
.kf-field:focus{border-color:var(--gold);outline:none}

/* burner-port rule: the section divider, drawn as a strip of burner ports */
.kf-ports{height:9px;width:100%;background-image:repeating-linear-gradient(90deg,var(--steel) 0 1px,transparent 1px 9px);opacity:.6;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 18%,#000 82%,transparent);mask-image:linear-gradient(90deg,transparent,#000 18%,#000 82%,transparent)}

/* scroll reveal */
.kf-rv{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}
.kf-rv.is-in{opacity:1;transform:none}

/* hero burner */
@keyframes kf-spin{to{transform:rotate(360deg)}}
@keyframes kf-spin-r{to{transform:rotate(-360deg)}}
@keyframes kf-flick{0%,100%{opacity:.25}45%{opacity:1}70%{opacity:.5}}
@keyframes kf-breathe{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:.62;transform:scale(1.06)}}
.kf-spin{transform-origin:center;animation:kf-spin 34s linear infinite}
.kf-spin-r{transform-origin:center;animation:kf-spin-r 22s linear infinite}
.kf-flick{animation:kf-flick 1.6s ease-in-out infinite}
.kf-breathe{transform-origin:center;animation:kf-breathe 4.5s ease-in-out infinite}
@keyframes kf-fade{from{opacity:0}to{opacity:1}}
.kf-fade{animation:kf-fade .45s ease}

/* marquee */
@keyframes kf-run{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.kf-run{display:flex;width:max-content;animation:kf-run 32s linear infinite}
.kf-marquee:hover .kf-run{animation-play-state:paused}

/* accordion */
.kf-acc{overflow:hidden;transition:height .34s cubic-bezier(.2,.7,.2,1)}

@media (prefers-reduced-motion:reduce){
  .kf *,.kf *::before,.kf *::after{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.001ms !important}
  .kf-rv{opacity:1;transform:none}
}
    `}</style>
  );
}

/* ────────────────────────────────────────────────────────────
   ICONS — interface only (arrows, phone, social). Product visuals
   are photographs, handled by <ProductImage/> below.
   ──────────────────────────────────────────────────────────── */

function Ico({ name, className = 'w-5 h-5', style }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    flame: <path {...p} d="M12 3s4.5 4.2 4.5 8.2A4.5 4.5 0 0 1 12 16a4.5 4.5 0 0 1-4.5-4.8C7.5 8.6 9 7.4 9 7.4s.4 1.7 1.6 2.2c0-2.6 1.4-5.2 1.4-6.6ZM12 16v5" />,
    shield: <path {...p} d="M12 3 5 6v6c0 4 3 7.3 7 9 4-1.7 7-5 7-9V6l-7-3Zm-2.6 8.6 1.9 2 3.4-3.6" />,
    layers: <path {...p} d="m12 3 8 4.2-8 4.2-8-4.2L12 3Zm8 8-8 4.2L4 11m16 5-8 4.2L4 16" />,
    wrench: <path {...p} d="M15.4 4.3a5 5 0 0 0-6.2 6.4L4 15.9 8.1 20l5.2-5.2a5 5 0 0 0 6.4-6.2l-2.9 2.9-2.6-.7-.7-2.6 2.9-2.9Z" />,
    truck: <path {...p} d="M3 6h10v10H3V6Zm10 4h4l3 3v3h-7m-6 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
    award: <path {...p} d="M12 3a5.2 5.2 0 1 1 0 10.4A5.2 5.2 0 0 1 12 3Zm-3.4 9.4L7 21l5-2.4L17 21l-1.6-8.6" />,
    check: <path {...p} d="m4.5 12.5 4.6 4.6L19.5 6.8" />,
    arrow: <path {...p} d="M5 12h13m-5-6 6 6-6 6" />,
    plus: <path {...p} d="M12 5v14M5 12h14" />,
    menu: <path {...p} d="M4 7h16M4 12h16M4 17h16" />,
    close: <path {...p} d="M6 6l12 12M18 6 6 18" />,
    phone: <path {...p} d="M6 3h3l1.8 4.2-2.1 1.5a12 12 0 0 0 5.6 5.6l1.5-2.1L20 16v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3 6.2 2 2 0 0 1 5 4h1Z" />,
    mail: <path {...p} d="M3 6h18v12H3V6Zm0 .6 9 6.4 9-6.4" />,
    pin: <path {...p} d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Zm0-8.2a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z" />,
    image: <g><rect {...p} x="3" y="5" width="18" height="14" rx="2" /><circle {...p} cx="8.6" cy="10" r="1.6" /><path {...p} d="m4 17 5-4.6 4.4 3.8 3-2.4L20 17" /></g>,
    fb: <path fill="currentColor" d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.5V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />,
    ig: <g><rect {...p} x="3.2" y="3.2" width="17.6" height="17.6" rx="5" /><circle {...p} cx="12" cy="12" r="4.1" /><circle fill="currentColor" cx="17" cy="7" r="1.2" /></g>,
    quote: <path fill="currentColor" d="M9.2 6C6.3 7.4 4.6 9.9 4.6 13v5h6.2v-6.2H7.7c.1-1.6 1-2.9 2.6-3.9L9.2 6Zm9.6 0c-2.9 1.4-4.6 3.9-4.6 7v5h6.2v-6.2h-3.1c.1-1.6 1-2.9 2.6-3.9L18.8 6Z" />,
  };
  return <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">{paths[name] || paths.flame}</svg>;
}



function ProductImage({
  src,
  alt,
  ratio = '4 / 3',
  fit = 'contain',
  zoom = false,
  pad = true,
  priority = false,
  className = '',
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [src]);
  const ok = src && !failed;

  return (
    <div
      className={`kf-img ${zoom ? 'kf-zoom' : ''} ${ok && fit === 'contain' && pad ? 'kf-img-pad' : ''} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {ok ? (
        <img
          key={src}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="kf-fade"
          style={{ objectFit: fit }}
        />
      ) : (
        <div className="kf-img-wait">
          <Ico name="image" className="w-6 h-6" />
          <p className="kf-util text-[9px]">Photo goes here</p>
          <p className="kf-img-path">{src || 'set an img path in GROUPS'}</p>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   PRIMITIVES
   ──────────────────────────────────────────────────────────── */

function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return (
    <Tag ref={ref} className={`kf-rv ${seen ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

function Eyebrow({ children, className = '' }) {
  return (
    <p className={`kf-util flex items-center gap-3 text-xs ${className}`} style={{ color: 'var(--gold)' }}>
      <span className="inline-block w-8" style={{ height: 1, background: 'var(--gold)' }} />
      {children}
    </p>
  );
}

function SectionHead({ eyebrow, title, lead, align = 'left', accent }) {
  const center = align === 'center';
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <div className={center ? 'flex justify-center' : ''}><Eyebrow>{eyebrow}</Eyebrow></div>
      <h2 className="kf-display mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold">
        {title} {accent && <span className="kf-metal">{accent}</span>}
      </h2>
      {lead && <p className="kf-mute mt-5 text-base sm:text-lg leading-relaxed">{lead}</p>}
    </div>
  );
}

function PortRule() {
  return (
    <div className="relative flex items-center justify-center py-1" aria-hidden="true">
      <div className="kf-ports" />
      <span className="absolute rounded-full" style={{ width: 13, height: 13, border: '1px solid var(--gold)', background: 'var(--ink)' }} />
      <span className="absolute rounded-full" style={{ width: 4, height: 4, background: 'var(--gold)' }} />
    </div>
  );
}

function Counter({ to, suffix = '', plain = false }) {
  const ref = useRef(null);
  const [n, setN] = useState(plain ? to : 0);
  useEffect(() => {
    if (plain) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(to); return; }
    let raf, started = false;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started) return;
      started = true;
      const t0 = performance.now(), dur = 1400;
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, plain]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* Logo — your image file. Falls back to the wordmark in type if the file is missing,
   so the header never renders empty while you are still uploading. */
function Logo({ className = '', height = 48, maxWidth = 200 }) {
  const [failed, setFailed] = useState(false);
  return (
    <a href="#top" className={`inline-flex items-center ${className}`} aria-label={`${BRAND.name} — home`}>
      {!failed ? (
        <img
          src={IMG.logo}
          alt={`${BRAND.name} — ${BRAND.tagline}`}
          onError={() => setFailed(true)}
          style={{ height, width: 'auto', maxWidth, objectFit: 'contain', display: 'block' }}
        />
      ) : (
        <span className="kf-display text-xl font-extrabold tracking-tight">
          KNIGHT<span className="kf-gold">FLAME</span>
        </span>
      )}
    </a>
  );
}

function Social({ size = 'w-5 h-5' }) {
  return (
    <div className="flex items-center gap-4">
      <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer" aria-label="Knight Flame on Facebook"
         className="kf-mute transition-colors hover:text-white"><Ico name="fb" className={size} /></a>
      <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="Knight Flame on Instagram"
         className="kf-mute transition-colors hover:text-white"><Ico name="ig" className={size} /></a>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   1 · NAVIGATION
   ──────────────────────────────────────────────────────────── */

function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden md:block" style={{ background: '#08080A', borderBottom: '1px solid var(--steel)' }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <p className="kf-util text-[10px]" style={{ color: 'var(--gold)' }}>{BRAND.tagline}</p>
          <div className="flex items-center gap-6">
            <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="kf-util kf-mute flex items-center gap-2 text-[10px] hover:text-white">
              <Ico name="phone" className="w-3.5 h-3.5" />{BRAND.phone}
            </a>
            <Social size="w-4 h-4" />
          </div>
        </div>
      </div>

      <nav
        className="transition-all duration-300"
        style={{
          background: solid ? 'rgba(11,11,12,.88)' : 'transparent',
          backdropFilter: solid ? 'blur(14px)' : 'none',
          borderBottom: `1px solid ${solid ? 'var(--steel)' : 'transparent'}`,
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <Logo height={52} maxWidth={200} />
          <ul className="hidden lg:flex items-center gap-8">
            {NAV.map(i => (
              <li key={i.href}>
                <a href={i.href} className="kf-util text-[11px] transition-colors hover:text-white" style={{ color: 'var(--mute)' }}>
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href="#contact" className="kf-btn kf-btn-gold kf-cta-desk">Get a quote</a>
            <button onClick={() => setOpen(true)} className="lg:hidden p-2" style={{ border: '1px solid var(--steel)' }} aria-label="Open menu">
              <Ico name="menu" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-y-auto" style={{ background: 'var(--ink)' }}>
          <div className="flex items-center justify-between px-6 py-3" style={{ borderBottom: '1px solid var(--steel)' }}>
            <Logo height={44} maxWidth={170} />
            <button onClick={() => setOpen(false)} className="p-2" style={{ border: '1px solid var(--steel)' }} aria-label="Close menu">
              <Ico name="close" className="w-5 h-5" />
            </button>
          </div>
          <ul className="px-6 py-4">
            {NAV.map((i, k) => (
              <li key={i.href} style={{ borderBottom: '1px solid var(--steel)' }}>
                <a href={i.href} onClick={() => setOpen(false)} className="kf-display flex items-center justify-between py-5 text-3xl font-semibold">
                  {i.label}
                  <span className="kf-util text-[10px]" style={{ color: 'var(--gold)' }}>{String(k + 1).padStart(2, '0')}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="px-6 pt-4 pb-10">
            <a href="#contact" onClick={() => setOpen(false)} className="kf-btn kf-btn-gold w-full">Get a quote</a>
            <div className="mt-8 flex items-center justify-between">
              <p className="kf-util text-[10px]" style={{ color: 'var(--mute)' }}>{BRAND.tagline}</p>
              <Social />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ────────────────────────────────────────────────────────────
   2 · HERO — the one illustrated element: a live brass burner
   ──────────────────────────────────────────────────────────── */

function BurnerHead() {
  const PORTS = 30;
  const ports = Array.from({ length: PORTS }, (_, i) => ({ a: (i / PORTS) * 360, d: (i % 7) * 0.21 }));
  return (
    <svg viewBox="0 0 520 520" className="w-full h-auto" role="img" aria-label="Knight Flame brass burner, illustrated">
      <defs>
        <radialGradient id="kfGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#D3A75F" stopOpacity=".38" />
          <stop offset="45%" stopColor="#9A6F2C" stopOpacity=".14" />
          <stop offset="100%" stopColor="#0B0B0C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="kfCap" cx="38%" cy="32%">
          <stop offset="0%" stopColor="#F0D7A4" />
          <stop offset="55%" stopColor="#C79A50" />
          <stop offset="100%" stopColor="#6E4E1B" />
        </radialGradient>
        <linearGradient id="kfFlame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#2E7DD1" />
          <stop offset="38%" stopColor="#5C9FDF" />
          <stop offset="78%" stopColor="#D3A75F" />
          <stop offset="100%" stopColor="#F0D7A4" />
        </linearGradient>
        <filter id="kfSoft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      <circle cx="260" cy="260" r="250" fill="url(#kfGlow)" className="kf-breathe" />

      {/* trivet / pan support — a ring on four arms, as on the real stove */}
      <g stroke="#3A3F47" strokeWidth="10" strokeLinecap="round" opacity=".9">
        {[0, 90, 180, 270].map(a => (
          <line key={a} x1="260" y1="52" x2="260" y2="132" transform={`rotate(${a} 260 260)`} />
        ))}
      </g>
      <circle cx="260" cy="260" r="188" fill="none" stroke="#3A3F47" strokeWidth="10" opacity=".9" />

      {/* machined rings */}
      <circle cx="260" cy="260" r="238" fill="none" stroke="#D3A75F" strokeWidth="1" strokeDasharray="2 14" opacity=".55" className="kf-spin" />
      <circle cx="260" cy="260" r="222" fill="none" stroke="#D3A75F" strokeWidth="1" strokeDasharray="46 22" opacity=".28" className="kf-spin-r" />

      {/* flames */}
      <g filter="url(#kfSoft)" opacity=".92">
        {ports.map((p, i) => (
          <path
            key={`f${i}`}
            d="M260 116c6 14 10 23 10 31a10 10 0 0 1-20 0c0-8 4-17 10-31Z"
            fill="url(#kfFlame)"
            transform={`rotate(${p.a} 260 260)`}
            className="kf-flick"
            style={{ animationDelay: `${p.d}s` }}
          />
        ))}
      </g>

      {/* burner head */}
      <circle cx="260" cy="260" r="118" fill="#141619" stroke="#C79A50" strokeWidth="2" />
      <circle cx="260" cy="260" r="104" fill="none" stroke="#D3A75F" strokeWidth="1.4" opacity=".7" />
      <g>
        {ports.map((p, i) => (
          <rect key={`p${i}`} x="257.5" y="146" width="5" height="16" rx="2.5" fill="#D3A75F"
                transform={`rotate(${p.a} 260 260)`} className="kf-flick" style={{ animationDelay: `${p.d}s` }} />
        ))}
      </g>
      <circle cx="260" cy="260" r="82" fill="#101216" stroke="#8E6C2E" strokeWidth="1.2" />
      <circle cx="260" cy="260" r="54" fill="url(#kfCap)" />
      <circle cx="260" cy="260" r="54" fill="none" stroke="#6E4E1B" strokeWidth="1.5" />
      <circle cx="260" cy="260" r="16" fill="#3A2B10" opacity=".7" />
      <path d="M226 232a46 46 0 0 1 26-20" stroke="#FFF3DA" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".55" />
    </svg>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
           style={{ backgroundImage: 'radial-gradient(circle at 78% 34%, rgba(46,125,209,.10), transparent 46%)' }} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-20">
        <div className="lg:col-span-6 xl:col-span-7">
          <Reveal><Eyebrow>Est. 2010 · Gas stoves · Cookers · Cookware</Eyebrow></Reveal>

          <Reveal delay={80}>
            <h1 className="kf-display mt-7 text-5xl font-extrabold sm:text-6xl lg:text-7xl xl:text-8xl">
              Built around<br />the <span className="kf-metal">burner</span>.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="kf-mute mt-7 max-w-xl text-lg leading-relaxed">
              Fifteen years of making the parts of an Indian kitchen that take real heat — brass-burner
              gas stoves, toughened glass tops, pressure cookers in four metals, and the cookware that
              sits on them.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#catalogue" className="kf-btn kf-btn-gold">See the catalogue<Ico name="arrow" className="w-4 h-4" /></a>
              <a href="#dealers" className="kf-btn kf-btn-ghost">Become a dealer</a>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6">
              {[['2010', 'Year one'], ['14', 'Product lines'], ['3', 'Cookware metals']].map(([v, l]) => (
                <div key={l} style={{ borderLeft: '1px solid var(--steel)' }} className="pl-4">
                  <dt className="kf-display text-3xl font-bold kf-gold">{v}</dt>
                  <dd className="kf-util mt-2 text-[10px]" style={{ color: 'var(--mute)' }}>{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-6 xl:col-span-5">
          <Reveal delay={120}>
            <figure className="relative mx-auto m-0" style={{ maxWidth: 520 }}>
              <BurnerHead />
              <figcaption className="kf-util mt-4 flex items-center justify-center gap-3 text-[10px]" style={{ color: 'var(--mute)' }}>
                <span className="inline-block w-6" style={{ height: 1, background: 'var(--steel)' }} />
                <span className="kf-gold">30</span> ports · machined brass
                <span className="inline-block w-6" style={{ height: 1, background: 'var(--steel)' }} />
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   3 · PROMISE TICKER
   ──────────────────────────────────────────────────────────── */

function Ticker() {
  const row = [...TICKER, ...TICKER];
  return (
    <section className="kf-marquee overflow-hidden py-5"
             style={{ background: '#0E1013', borderTop: '1px solid var(--steel)', borderBottom: '1px solid var(--steel)' }}
             aria-label="What every Knight Flame product ships with">
      <div className="kf-run">
        {row.map((t, i) => (
          <span key={i} className="kf-util flex items-center gap-6 whitespace-nowrap px-6 text-[11px]"
                style={{ color: i % 2 ? 'var(--mute)' : 'var(--cream)' }}>
            {t}
            <span className="inline-block rounded-full" style={{ width: 4, height: 4, background: 'var(--gold)' }} />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   4 · COOKING RANGE — tabbed catalogue. Tapping a burner count
   swaps the photograph, so shoot 2 / 3 / 4 burner separately.
   ──────────────────────────────────────────────────────────── */

/* "2 Burner","3 Burner","4 Burner" → "2 · 3 · 4 Burner" so the tab label stays on one line */
function sizeSummary(variants) {
  const unit = variants[0].split(' ').slice(1).join(' ');
  return `${variants.map(v => v.split(' ')[0]).join(' · ')} ${unit}`.trim();
}

function CookingRange() {
  const items = GROUPS[0].items;
  const [active, setActive] = useState(0);
  const [vIndex, setVIndex] = useState(0);
  const item = items[active];
  const variant = item.variants[vIndex] || item.variants[0];
  const photo = (item.imgByVariant && item.imgByVariant[variant]) || item.img;

  const pick = (i) => { setActive(i); setVIndex(0); };

  return (
    <section id="catalogue" className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <Reveal>
        <SectionHead
          eyebrow="Four ranges · 2, 3 and 4 burner"
          title="The cooking"
          accent="range"
          lead="Every stove we make starts with the same brass burner and then changes what surrounds it — steel for punishment, glass for looks, Bahubali for weight, a hobtop for a built-in kitchen."
        />
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-12">
        {/* selector */}
        <div className="min-w-0 lg:col-span-3">
          <div className="flex w-full gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {items.map((it, i) => {
              const on = i === active;
              return (
                <button
                  key={it.id}
                  onClick={() => pick(i)}
                  className="group flex min-w-max items-center justify-between gap-3 px-4 py-4 text-left transition-all lg:min-w-0 lg:w-full"
                  style={{ background: on ? 'var(--panel2)' : 'transparent', borderLeft: `2px solid ${on ? 'var(--gold)' : 'var(--steel)'}` }}
                  aria-pressed={on}
                >
                  <span>
                    <span className="kf-display block text-lg font-semibold" style={{ color: on ? 'var(--cream)' : 'var(--mute)' }}>
                      {it.name}
                    </span>
                    <span className="kf-util mt-1.5 block text-[10px]" style={{ color: on ? 'var(--gold)' : '#5D626B' }}>
                      {sizeSummary(it.variants)}
                    </span>
                  </span>
                  <Ico name="arrow" className={`w-4 h-4 shrink-0 transition-opacity ${on ? 'opacity-100 kf-gold' : 'opacity-0'}`} />
                </button>
              );
            })}
          </div>

          <div className="mt-8 hidden lg:block" style={{ borderTop: '1px solid var(--steel)', paddingTop: '1.5rem' }}>
            <p className="kf-mute text-sm leading-relaxed">
              Not sure which top suits your kitchen? The comparison below puts all three side by side.
            </p>
            <a href="#compare" className="kf-util mt-4 inline-flex items-center gap-2 text-[11px] kf-gold">
              Compare tops <Ico name="arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* detail */}
        <div className="min-w-0 lg:col-span-9">
          <div className="kf-plate p-5 sm:p-7">
            <span className="kf-plate-in" />
            <div className="relative grid gap-6 sm:grid-cols-12 sm:items-center lg:gap-8">
              {/* The frame's ratio should match your photo's ratio. object-fit is
                  `contain`, so a landscape photo in a portrait frame gets letterboxed
                  and looks smaller. Landscape shots → "4 / 3". Portrait → "3 / 4". */}
              <ProductImage
                src={photo}
                alt={`${item.name} — ${variant}`}
                ratio="4 / 3"
                className="kf-pad-tight sm:col-span-7"
                priority
              />
              <div className="sm:col-span-5">
                <h3 className="kf-display text-3xl font-bold">{item.name}</h3>
                <p className="kf-mute mt-4 text-sm leading-relaxed">{item.blurb}</p>

                <p className="kf-util mt-7 text-[10px]" style={{ color: 'var(--mute)' }}>Choose size</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.variants.map((v, i) => (
                    <button key={v} className="kf-chip" aria-pressed={i === vIndex} onClick={() => setVIndex(i)}>
                      {v}
                    </button>
                  ))}
                </div>

                <dl className="mt-8">
                  {item.specs.map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between py-2.5" style={{ borderTop: '1px solid var(--steel)' }}>
                      <dt className="kf-util text-[10px]" style={{ color: 'var(--mute)' }}>{k}</dt>
                      <dd className="text-sm">{v}</dd>
                    </div>
                  ))}
                </dl>

                <a href="#contact" className="kf-btn kf-btn-ghost mt-8 w-full sm:w-auto">Ask for pricing</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   5 · BAHUBALI SPOTLIGHT
   ──────────────────────────────────────────────────────────── */

function Bahubali() {
  const points = [
    ['Extra-wide pan supports', 'Sized for a 14-inch kadai and a full pressure cooker without tipping.'],
    ['High-flow brass burners', 'More ports, larger orifice — water boils faster in big vessels.'],
    ['Reinforced frame', 'Thicker gauge steel under the top so the stove does not flex under load.'],
  ];
  return (
    <section id="bahubali" className="relative overflow-hidden"
             style={{ background: '#0E1013', borderTop: '1px solid var(--steel)', borderBottom: '1px solid var(--steel)' }}>
      <div className="pointer-events-none absolute inset-0"
           style={{ backgroundImage: 'radial-gradient(circle at 22% 50%, rgba(211,167,95,.10), transparent 55%)' }} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:py-32">
        <Reveal>
          <ProductImage
            src={IMG.bahubali}
            alt="Knight Flame Bahubali four burner heavy-duty gas stove"
            ratio="4 / 3"
            pad={false}
          />
        </Reveal>

        <Reveal delay={100}>
          <Eyebrow>The heavy-duty line</Eyebrow>
          <h2 className="kf-display mt-5 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Bahubali. <span className="kf-metal">Made for the big vessel.</span>
          </h2>
          <p className="kf-mute mt-6 text-lg leading-relaxed">
            Most stoves are built for a two-litre pan. Bahubali is built for the pot that feeds
            fourteen people — a wider support, a stronger frame, and a burner that keeps a rolling
            boil instead of stalling under weight.
          </p>

          <dl className="mt-10">
            {points.map(([t, b], i) => (
              <div key={t} className="flex gap-5 py-5" style={{ borderTop: '1px solid var(--steel)' }}>
                <span className="kf-util shrink-0 text-[11px] kf-gold" style={{ paddingTop: 2 }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <dt className="kf-display text-lg font-semibold">{t}</dt>
                  <dd className="kf-mute mt-1.5 text-sm leading-relaxed">{b}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            {['2 Burner', '3 Burner', '4 Burner'].map(v => (
              <span key={v} className="kf-util px-4 py-2 text-[10px]" style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}>{v}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   6 · COMPARISON
   ──────────────────────────────────────────────────────────── */

function Compare() {
  return (
    <section id="compare" className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <Reveal>
        <SectionHead
          align="center"
          eyebrow="Steel · Glass · Bahubali"
          title="Which top belongs in"
          accent="your kitchen?"
          lead="The burner is the same across all three. What changes is the surface it sits in — and that is entirely a question of how you cook."
        />
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-max border-collapse text-left">
            <thead>
              <tr>
                {COMPARE.head.map((h, i) => (
                  <th key={h || i}
                      className={`kf-util px-5 py-5 text-[11px] ${i === 0 ? '' : 'kf-gold'}`}
                      style={{ borderBottom: '1px solid var(--gold)', color: i === 0 ? 'var(--mute)' : undefined, minWidth: i === 0 ? 130 : 190 }}>
                    {h || 'Specification'}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.rows.map((r, ri) => (
                <tr key={r[0]} style={{ background: ri % 2 ? 'transparent' : '#0F1114' }}>
                  {r.map((c, ci) => (
                    <td key={ci}
                        className={ci === 0 ? 'kf-util px-5 py-5 text-[10px]' : 'px-5 py-5 text-sm'}
                        style={{ borderBottom: '1px solid var(--steel)', color: ci === 0 ? 'var(--mute)' : 'var(--cream)' }}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   7 · PRESSURE COOKERS
   ──────────────────────────────────────────────────────────── */

function Cookers() {
  const [inductionOnly, setInductionOnly] = useState(false);
  const all = GROUPS[1].items;
  const isInduction = (it) => it.specs.some(([k, v]) => k === 'Base' && v.includes('yes'));
  const list = inductionOnly ? all.filter(isInduction) : all;

  return (
    <section id="cookers" className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Reveal className="flex-1">
          <SectionHead
            eyebrow="Four metals · 3 L to 7.5 L"
            title="Pressure cookers, one"
            accent="metal at a time"
            lead="Aluminium heats fastest. Hard anodised will not react with tamarind. Stainless and triply go on induction. We build all four rather than pretending one metal does every job."
          />
        </Reveal>

        <Reveal delay={80}>
          <button
            onClick={() => setInductionOnly(v => !v)}
            className="kf-util flex items-center gap-3 px-5 py-3 text-[10px] transition-colors"
            style={{ border: `1px solid ${inductionOnly ? 'var(--gold)' : 'var(--steel)'}`, color: inductionOnly ? 'var(--gold)' : 'var(--mute)' }}
            aria-pressed={inductionOnly}
          >
            <span className="inline-flex items-center rounded-full p-0.5 transition-colors"
                  style={{ width: 34, height: 18, background: inductionOnly ? 'var(--gold)' : 'var(--steel)' }}>
              <span className="rounded-full transition-transform"
                    style={{ width: 14, height: 14, background: inductionOnly ? '#0B0B0C' : '#8B8F97', transform: `translateX(${inductionOnly ? 16 : 0}px)` }} />
            </span>
            Induction-ready only
          </button>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((it, i) => (
          <Reveal key={it.id} delay={i * 70}>
            <article className="kf-plate flex h-full flex-col">
              <span className="kf-plate-in" />
              <ProductImage src={it.img} alt={it.name} ratio="1 / 1" zoom />
              <div className="relative flex flex-1 flex-col px-6 pb-6 pt-5">
                <span className="kf-util text-[9px]" style={{ color: isInduction(it) ? 'var(--gold)' : '#4E535B' }}>
                  {isInduction(it) ? 'Gas + induction' : 'Gas only'}
                </span>
                <h3 className="kf-display mt-2 text-xl font-semibold leading-tight">{it.name}</h3>
                <p className="kf-mute mt-3 flex-1 text-sm leading-relaxed">{it.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {it.variants.map(v => (
                    <span key={v} className="kf-util px-2.5 py-1 text-[9px]" style={{ border: '1px solid var(--steel)', color: 'var(--mute)' }}>{v}</span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   8 · COOKWARE
   ──────────────────────────────────────────────────────────── */

function Cookware() {
  return (
    <section id="cookware" style={{ background: '#0E1013', borderTop: '1px solid var(--steel)', borderBottom: '1px solid var(--steel)' }}>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <Reveal>
          <SectionHead
            eyebrow="Three surfaces"
            title="Cookware that matches"
            accent="the flame below it"
            lead="Anodised, triply and honeycomb — chosen by what you cook, not by what looks best on a shelf."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {GROUPS[2].items.map((it, i) => (
            <Reveal key={it.id} delay={i * 90}>
              <article className="kf-plate flex h-full flex-col">
                <span className="kf-plate-in" />
                <ProductImage src={it.img} alt={it.name} ratio="4 / 3" zoom />
                <div className="relative flex flex-1 flex-col px-7 pb-7 pt-6">
                  <h3 className="kf-display text-2xl font-bold">{it.name}</h3>
                  <p className="kf-mute mt-3 flex-1 text-sm leading-relaxed">{it.blurb}</p>

                  <ul className="mt-6">
                    {it.specs.map(([k, v]) => (
                      <li key={k} className="flex items-center justify-between py-2.5 text-sm" style={{ borderTop: '1px solid var(--steel)' }}>
                        <span className="kf-util text-[10px]" style={{ color: 'var(--mute)' }}>{k}</span>
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {it.variants.map(v => (
                      <span key={v} className="kf-util px-2.5 py-1 text-[9px]" style={{ border: '1px solid var(--steel)', color: 'var(--cream)' }}>{v}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   9 · APPLIANCES & ACCESSORIES
   ──────────────────────────────────────────────────────────── */

function Appliances() {
  return (
    <section id="appliances" className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <Reveal>
        <SectionHead
          eyebrow="Six more lines"
          title="The rest of"
          accent="the counter"
          lead="Cooktops, grinders, kettles, irons and the two small things every kitchen replaces most often — lighters and hose pipe."
        />
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {GROUPS[3].items.map((it, i) => (
          <Reveal key={it.id} delay={(i % 3) * 70}>
            <article className="kf-plate flex h-full flex-col">
              <span className="kf-plate-in" />
              <ProductImage src={it.img} alt={it.name} ratio="4 / 3" zoom />
              <div className="relative flex flex-1 flex-col px-6 pb-6 pt-5">
                <h3 className="kf-display text-xl font-semibold">{it.name}</h3>
                <p className="kf-mute mt-3 flex-1 text-sm leading-relaxed">{it.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {it.variants.map(v => (
                    <span key={v} className="kf-util px-2.5 py-1 text-[9px]" style={{ border: '1px solid var(--steel)', color: 'var(--mute)' }}>{v}</span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   10 · WHY KNIGHT FLAME
   ──────────────────────────────────────────────────────────── */

function Why() {
  return (
    <section id="why" style={{ background: '#0E1013', borderTop: '1px solid var(--steel)', borderBottom: '1px solid var(--steel)' }}>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <Reveal>
          <SectionHead
            eyebrow="What fifteen years bought us"
            title="Why kitchens keep"
            accent="the brand"
            lead="Not slogans — the six things dealers and customers actually tell us keep them with Knight Flame."
          />
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 80}>
              <div className="flex gap-5" style={{ borderTop: '1px solid var(--steel)', paddingTop: '1.75rem' }}>
                <span className="kf-edge flex shrink-0 items-center justify-center" style={{ width: 46, height: 46, color: 'var(--gold)' }}>
                  <Ico name={r.icon} className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="kf-display text-xl font-semibold">{r.title}</h3>
                  <p className="kf-mute mt-2.5 text-sm leading-relaxed">{r.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   11 · HOW IT IS MADE — a real sequence, so it is numbered.
   Each stage takes a photograph from the factory floor.
   ──────────────────────────────────────────────────────────── */

function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <Reveal>
        <SectionHead
          eyebrow="Metal in, flame out"
          title="Five stages between"
          accent="coil and carton"
          lead="Nothing here is outsourced to a name we cannot visit. This is the order a Knight Flame stove moves through the floor."
        />
      </Reveal>

      <ol className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
        {PROCESS.map((s, i) => (
          <Reveal key={s.n} delay={i * 90} as="li">
            <div className="relative">
              <ProductImage src={s.img} alt={`Knight Flame factory — ${s.title}`} ratio="4 / 3" fit="cover" pad={false} zoom />
              <span
                className="kf-display absolute flex items-center justify-center text-sm font-bold"
                style={{ left: 12, top: 12, zIndex: 2, width: 40, height: 40, borderRadius: '50%', background: 'rgba(11,11,12,.82)', border: '1px solid var(--gold)', color: 'var(--gold)' }}
              >
                {s.n}
              </span>
            </div>
            <h3 className="kf-display mt-5 text-xl font-semibold">{s.title}</h3>
            <p className="kf-mute mt-2.5 text-sm leading-relaxed">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   12 · STATS
   ──────────────────────────────────────────────────────────── */

function Stats() {
  return (
    <section aria-label="Knight Flame in numbers"
             style={{ background: '#0E1013', borderTop: '1px solid var(--steel)', borderBottom: '1px solid var(--steel)' }}>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 py-16 lg:grid-cols-4 lg:py-20">
        {/* TODO: confirm SKU and dealer figures with the sales team before launch */}
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="px-2 text-center lg:px-6">
              <p className="kf-display text-5xl font-extrabold lg:text-6xl">
                <span className="kf-metal"><Counter to={s.value} suffix={s.suffix} plain={s.plain} /></span>
              </p>
              <p className="kf-util mt-3 text-[10px]" style={{ color: 'var(--mute)' }}>{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   13 · WHAT PEOPLE SAY — photo per person, initials if none yet
   ──────────────────────────────────────────────────────────── */

function Avatar({ src, name, size = 48 }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [src]);
  const initials = name.split(' ').map(w => w[0]).join('');
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden"
      style={{ width: size, height: size, borderRadius: '50%', background: 'var(--panel2)', border: '1px solid var(--steel)' }}
    >
      {src && !failed ? (
        <img src={src} alt={name} loading="lazy" decoding="async" onError={() => setFailed(true)}
             style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <span className="kf-display text-sm font-bold" style={{ color: 'var(--gold)' }}>{initials}</span>
      )}
    </span>
  );
}

function Reviews() {
  const [i, setI] = useState(0);
  const go = useCallback((d) => setI(p => (p + d + REVIEWS.length) % REVIEWS.length), []);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [go]);
  const r = REVIEWS[i];

  return (
    <section id="reviews" className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow>Dealers & kitchens</Eyebrow>
            <h2 className="kf-display mt-5 text-4xl font-bold">
              Fifteen years of <span className="kf-metal">repeat orders</span>.
            </h2>
            <p className="kf-mute mt-6 text-base leading-relaxed">
              The people who judge us hardest are the retailers who handle returns and the families
              who use the stove twice a day.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <button onClick={() => go(-1)} className="kf-btn kf-btn-ghost kf-btn-sq" aria-label="Previous review">
                <Ico name="arrow" className="w-4 h-4" style={{ transform: 'rotate(180deg)' }} />
              </button>
              <button onClick={() => go(1)} className="kf-btn kf-btn-ghost kf-btn-sq" aria-label="Next review">
                <Ico name="arrow" className="w-4 h-4" />
              </button>
              <span className="kf-util ml-2 text-[11px]" style={{ color: 'var(--mute)' }}>
                <span className="kf-gold">{String(i + 1).padStart(2, '0')}</span> / {String(REVIEWS.length).padStart(2, '0')}
              </span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal delay={100}>
            <blockquote className="kf-plate p-8 sm:p-12" aria-live="polite">
              <span className="kf-plate-in" />
              <div className="relative">
                <span className="kf-gold inline-block" style={{ opacity: .45 }}><Ico name="quote" className="w-10 h-10" /></span>
                <p className="kf-display mt-6 text-2xl font-medium sm:text-3xl" style={{ lineHeight: 1.28 }}>{r.quote}</p>
                <footer className="mt-8 flex items-center gap-4" style={{ borderTop: '1px solid var(--steel)', paddingTop: '1.5rem' }}>
                  <Avatar src={r.img} name={r.name} />
                  <span>
                    <cite className="kf-display block not-italic text-base font-semibold">{r.name}</cite>
                    <span className="kf-util mt-1 block text-[10px]" style={{ color: 'var(--mute)' }}>{r.role}</span>
                  </span>
                </footer>
              </div>
            </blockquote>
          </Reveal>

          <div className="mt-6 flex gap-2">
            {REVIEWS.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Show review ${k + 1}`}
                      className="flex-1 transition-colors"
                      style={{ height: 2, background: k === i ? 'var(--gold)' : 'var(--steel)' }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   14 · DEALER PROGRAMME
   ──────────────────────────────────────────────────────────── */

function Dealers() {
  const [form, setForm] = useState({ name: '', firm: '', city: '', phone: '', brands: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.city.trim()) {
      setError('Add your name, city and phone number so our territory manager can call back.');
      return;
    }
    setError('');
    // TODO: POST to /api/dealer-enquiry (or your CRM webhook) here.
    setSent(true);
  };

  const perks = [
    ['Protected territory', 'One appointed dealer per pin-code band, not five fighting on price.'],
    ['Fourteen lines, one invoice', 'Stoves, cookers, cookware and appliances ship together.'],
    ['Replacements inside 7 days', 'Defective pieces are swapped, not argued over.'],
    ['Display and branding support', 'Shelf units, standees and product photography, at our cost.'],
  ];

  return (
    <section id="dealers" className="relative overflow-hidden"
             style={{ background: '#0E1013', borderTop: '1px solid var(--steel)', borderBottom: '1px solid var(--steel)' }}>
      <div className="pointer-events-none absolute inset-0"
           style={{ backgroundImage: 'radial-gradient(circle at 85% 20%, rgba(211,167,95,.09), transparent 50%)' }} />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
        <Reveal>
          <Eyebrow>Distribution</Eyebrow>
          <h2 className="kf-display mt-5 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Stock a brand that <span className="kf-metal">moves off the shelf</span>.
          </h2>
          <p className="kf-mute mt-6 text-lg leading-relaxed">
            We are appointing dealers and distributors across India for the 2026 season. If you already
            sell kitchen appliances, this fits beside what you carry.
          </p>
          <dl className="mt-10">
            {perks.map(([t, b]) => (
              <div key={t} className="flex gap-4 py-4" style={{ borderTop: '1px solid var(--steel)' }}>
                <span className="kf-gold shrink-0" style={{ paddingTop: 2 }}><Ico name="check" className="w-5 h-5" /></span>
                <div>
                  <dt className="font-semibold">{t}</dt>
                  <dd className="kf-mute mt-1 text-sm leading-relaxed">{b}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <div className="kf-plate p-8 sm:p-10">
            <span className="kf-plate-in" />
            <div className="relative">
              {sent ? (
                <div className="py-10 text-center">
                  <span className="kf-gold mx-auto flex items-center justify-center" style={{ width: 56, height: 56, borderRadius: '50%', border: '1px solid var(--gold)' }}>
                    <Ico name="check" className="w-7 h-7" />
                  </span>
                  <h3 className="kf-display mt-6 text-2xl font-bold">Enquiry received</h3>
                  <p className="kf-mute mt-3 text-sm leading-relaxed">
                    Our territory manager for {form.city || 'your region'} will call {form.phone} within two working days
                    with the price list and margin structure.
                  </p>
                  <button onClick={() => { setSent(false); setForm({ name: '', firm: '', city: '', phone: '', brands: '' }); }}
                          className="kf-btn kf-btn-ghost mt-8">
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="kf-display text-2xl font-bold">Apply for a dealership</h3>
                  <p className="kf-mute mt-2 text-sm">Takes a minute. No documents needed yet.</p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <label className="block sm:col-span-2">
                      <span className="kf-util text-[10px]" style={{ color: 'var(--mute)' }}>Your name</span>
                      <input className="kf-field mt-2" value={form.name} onChange={set('name')} placeholder="Ramesh Patel" autoComplete="name" />
                    </label>
                    <label className="block">
                      <span className="kf-util text-[10px]" style={{ color: 'var(--mute)' }}>Firm name</span>
                      <input className="kf-field mt-2" value={form.firm} onChange={set('firm')} placeholder="Patel Home Appliances" autoComplete="organization" />
                    </label>
                    <label className="block">
                      <span className="kf-util text-[10px]" style={{ color: 'var(--mute)' }}>City</span>
                      <input className="kf-field mt-2" value={form.city} onChange={set('city')} placeholder="Ahmedabad" autoComplete="address-level2" />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="kf-util text-[10px]" style={{ color: 'var(--mute)' }}>Phone</span>
                      <input className="kf-field mt-2" value={form.phone} onChange={set('phone')} placeholder="+91 00000 00000" inputMode="tel" autoComplete="tel" />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="kf-util text-[10px]" style={{ color: 'var(--mute)' }}>Brands you currently stock</span>
                      <textarea className="kf-field mt-2" rows={3} value={form.brands} onChange={set('brands')} placeholder="Helps us pitch the right range and margin." />
                    </label>
                  </div>

                  {error && <p className="mt-4 text-sm" style={{ color: '#E4894F' }}>{error}</p>}

                  <button onClick={submit} className="kf-btn kf-btn-gold mt-7 w-full">
                    Send enquiry <Ico name="arrow" className="w-4 h-4" />
                  </button>
                  <p className="kf-mute mt-4 text-xs leading-relaxed">
                    We use these details only to contact you about a Knight Flame dealership.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   15 · FAQ
   ──────────────────────────────────────────────────────────── */

function AccordionRow({ item, open, onToggle, index }) {
  const bodyRef = useRef(null);
  const [h, setH] = useState(0);
  useEffect(() => { setH(open && bodyRef.current ? bodyRef.current.scrollHeight : 0); }, [open]);
  return (
    <div style={{ borderTop: '1px solid var(--steel)' }}>
      <button onClick={onToggle} className="flex w-full items-start gap-5 py-6 text-left" aria-expanded={open}>
        <span className="kf-util shrink-0 text-[11px]" style={{ color: open ? 'var(--gold)' : '#5D626B', paddingTop: 6 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="kf-display flex-1 text-lg font-semibold sm:text-xl">{item.q}</span>
        <span className="shrink-0 transition-transform"
              style={{ color: open ? 'var(--gold)' : 'var(--mute)', transform: open ? 'rotate(45deg)' : 'none' }}>
          <Ico name="plus" className="w-5 h-5" />
        </span>
      </button>
      <div className="kf-acc" style={{ height: h }}>
        <div ref={bodyRef} className="pb-7 pl-11 pr-11">
          <p className="kf-mute text-sm leading-relaxed sm:text-base">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow>Before you buy</Eyebrow>
            <h2 className="kf-display mt-5 text-4xl font-bold">
              Questions we <span className="kf-metal">get weekly</span>.
            </h2>
            <p className="kf-mute mt-6 text-base leading-relaxed">
              Anything not covered here, ask us directly — the same people who answer the phone build the products.
            </p>
            <a href="#contact" className="kf-util mt-6 inline-flex items-center gap-2 text-[11px] kf-gold">
              Talk to us <Ico name="arrow" className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal delay={80}>
            <div style={{ borderBottom: '1px solid var(--steel)' }}>
              {FAQS.map((f, i) => (
                <AccordionRow key={f.q} item={f} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   16 · CONTACT
   ──────────────────────────────────────────────────────────── */

function Contact() {
  const rows = [
    { icon: 'phone', label: 'Sales & dealership', value: BRAND.phone, href: `tel:${BRAND.phone.replace(/\s/g, '')}` },
    { icon: 'mail', label: 'Enquiries', value: BRAND.email, href: `mailto:${BRAND.email}` },
    { icon: 'pin', label: 'Works & office', value: BRAND.city, href: null },
  ];
  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: '#0E1013', borderTop: '1px solid var(--steel)' }}>
      <div className="pointer-events-none absolute inset-0"
           style={{ backgroundImage: 'radial-gradient(circle at 50% 110%, rgba(211,167,95,.16), transparent 55%)' }} />
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <Reveal>
          <SectionHead
            align="center"
            eyebrow="Talk to the manufacturer"
            title="Ready when"
            accent="you are"
            lead="Retail order, bulk enquiry or a dealership — one number, one inbox, answered by people on the factory floor."
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-px sm:grid-cols-3" style={{ background: 'var(--steel)', border: '1px solid var(--steel)' }}>
          {rows.map((r, i) => {
            const Inner = (
              <>
                <span className="kf-gold"><Ico name={r.icon} className="w-6 h-6" /></span>
                <span className="kf-util mt-5 block text-[10px]" style={{ color: 'var(--mute)' }}>{r.label}</span>
                <span className="kf-display mt-2 block text-lg font-semibold">{r.value}</span>
              </>
            );
            return (
              <Reveal key={r.label} delay={i * 80}>
                {r.href
                  ? <a href={r.href} className="block h-full p-8 text-center transition-colors" style={{ background: 'var(--ink)' }}>{Inner}</a>
                  : <div className="h-full p-8 text-center" style={{ background: 'var(--ink)' }}>{Inner}</div>}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-5 sm:flex-row sm:justify-center">
            <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer" className="kf-btn kf-btn-ghost w-full sm:w-auto">
              <Ico name="fb" className="w-4 h-4" /> Follow on Facebook
            </a>
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="kf-btn kf-btn-gold w-full sm:w-auto">
              <Ico name="ig" className="w-4 h-4" /> See it on Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   FOOTER
   ──────────────────────────────────────────────────────────── */

function Footer() {
  const cols = GROUPS.map(g => ({
    title: g.label,
    links: g.items.map(i => i.name),
    href: `#${g.id === 'cooking' ? 'catalogue' : g.id}`,
  }));

  return (
    <footer style={{ background: '#08080A', borderTop: '1px solid var(--steel)' }}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo height={72} maxWidth={280} />
            <p className="kf-mute mt-6 max-w-sm text-sm leading-relaxed">
              Knight Flame manufactures gas stoves, hobtops, pressure cookers, cookware and kitchen
              appliances in India. Serving you since 2010.
            </p>
            <div className="mt-8"><Social /></div>
          </div>

          {cols.map(c => (
            <div key={c.title} className="lg:col-span-2">
              <h3 className="kf-util text-[10px]" style={{ color: 'var(--gold)' }}>{c.title}</h3>
              <ul className="mt-5">
                {c.links.map(l => (
                  <li key={l} className="mt-2.5 first:mt-0">
                    <a href={c.href} className="kf-mute text-sm transition-colors hover:text-white">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between"
             style={{ borderTop: '1px solid var(--steel)' }}>
          <p className="kf-mute text-xs">© {new Date().getFullYear()} {BRAND.name}. All rights reserved | Powered By <Link href="https://www.cybertricksmedia.com/" className="text-[#D3A75F]">Cybertricksmedia Pvt Ltd</Link></p>
          <p className="kf-util text-[10px]" style={{ color: '#4E535B' }}>Serving you since 2010</p>
        </div>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────────────────────── */

export default function KnightFlameLanding() {
  return (
    <div className="kf min-h-screen">
      <BrandStyles />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <CookingRange />
        <Bahubali />
        <Compare />
        <PortRule />
        <Cookers />
        <Cookware />
        <Appliances />
        <Why />
        <Process />
        <Stats />
        <Reviews />
        <Dealers />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}