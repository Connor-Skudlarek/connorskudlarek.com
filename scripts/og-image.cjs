/**
 * Generates public/og.png, the preview card shown when the site is linked.
 * Run with `npm run og` after changing the wording or palette.
 *
 * CommonJS because sharp's ESM entry point uses import attributes, which the
 * Node version on this machine does not parse.
 */
/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS on purpose; see header comment. */
const { writeFileSync } = require("node:fs");
const { join } = require("node:path");
const sharp = require("sharp");

const root = join(__dirname, "..");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f7f9fc"/>
      <stop offset="100%" stop-color="#e4ecfa"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.55">
      <stop offset="0%" stop-color="#a9c8ff" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#a9c8ff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="10" fill="#1355c7"/>

  <text x="90" y="196" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="30" fill="#55637a" letter-spacing="4">PORTLAND, OREGON</text>

  <text x="90" y="306" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="92" font-weight="600" fill="#0f1b2d">Connor Skudlarek</text>

  <text x="90" y="388" font-family="Helvetica, Arial, sans-serif" font-size="40" fill="#1355c7">Semiconductor equipment engineer who builds software</text>

  <text x="90" y="464" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#55637a">Manufacturing and hardware context, plus full-stack</text>
  <text x="90" y="506" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#55637a">TypeScript, React, Next.js, and PostgreSQL.</text>

  <text x="90" y="572" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#6b7a92">connorskudlarek.com</text>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toBuffer()
  .then((png) => {
    const out = join(root, "public", "og.png");
    writeFileSync(out, png);
    console.log(`Wrote ${out} (${(png.length / 1024).toFixed(0)} KB)`);
  });
