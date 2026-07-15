// Generates build/theme.css: a flat `@theme` block of CSS custom properties
// from tailwind.config.js's colors, so Tailwind v4 consumers can
// `@import "@xola/ui-kit/build/theme.css";` instead of hand-copying hex
// values into their own theme (which drifts out of sync as this palette
// changes).
const fs = require("fs");
const path = require("path");
const tailwind = require("../tailwind.config");

// black/white are excluded: overriding them would silently reskin every
// bg-black/text-white a consumer already has in their own app, since those
// are Tailwind v4 defaults every project already relies on.
const SKIP_KEYS = ["transparent", "current", "black", "white"];

const lines = [];
for (const [name, value] of Object.entries(tailwind.theme.colors)) {
    if (SKIP_KEYS.includes(name)) continue;

    if (typeof value === "string") {
        lines.push(`    --color-${name}: ${value};`);
        continue;
    }

    for (const [shade, hex] of Object.entries(value)) {
        const varName = shade === "DEFAULT" ? `--color-${name}` : `--color-${name}-${shade}`;
        lines.push(`    ${varName}: ${hex};`);
    }
}

const output = `/* This file is auto-generated from tailwind.config.js. Do not change it manually! */
@theme {
${lines.join("\n")}
}
`;

// Written to public/, not build/, so it survives Vite's emptyOutDir clean
// (same trick public/favicon.ico already relies on) and gets copied into
// build/ as part of Vite's normal public-dir copy.
fs.writeFile(path.join(__dirname, "../public/theme.css"), output, (error) => {
    if (error) console.error(error);
});
