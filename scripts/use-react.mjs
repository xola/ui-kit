#!/usr/bin/env zx
/**
 * Swaps the installed React to one CI matrix leg: `npm run react:18` or `npm run react:19`. Installs with
 * --no-save, so package.json and package-lock.json keep React 18.
 *
 * The 18 leg installs the exact versions in package-lock.json, so swapping back from 19 leaves `npm ls` clean.
 */
import { fileURLToPath } from "node:url";
import { $, argv, fs, path } from "zx";

const PACKAGES = ["react", "react-dom", "@types/react", "@types/react-dom"];

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const { packages: lockedPackages } = await fs.readJson(path.join(repoRoot, "package-lock.json"));

const getLockedVersion = (name) => lockedPackages[`node_modules/${name}`].version;

const VERSION_GETTERS = { 18: getLockedVersion, 19: () => "19" };

const [major] = argv._;
const getVersion = VERSION_GETTERS[major];
if (!getVersion) {
    throw new Error(`Usage: zx scripts/use-react.mjs <${Object.keys(VERSION_GETTERS).join("|")}>, got ${major}`);
}

const packageSpecs = PACKAGES.map((name) => `${name}@${getVersion(name)}`);
await $({ cwd: repoRoot, stdio: "inherit" })`npm i --no-save --no-fund --no-audit ${packageSpecs}`;

/**
 * Vite hashes package-lock.json to decide when to prebundle again, and --no-save leaves it untouched, so the
 * Storybook Vitest prebundle in this cache would keep serving the previous React.
 */
await fs.remove(path.join(repoRoot, "node_modules/.cache/storybook"));

const { version: installedVersion } = await fs.readJson(path.join(repoRoot, "node_modules/react/package.json"));
console.log(`React ${installedVersion}`);
