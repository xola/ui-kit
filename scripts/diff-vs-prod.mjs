#!/usr/bin/env zx
// Pixel-diffs every story against the deployed Storybook to catch visual regressions that a
// console-error check cannot see. Tailwind class-order changes, for one, break rendering silently.
//
//   npm run dev                                   # in another shell
//   npx zx scripts/diff-vs-prod.mjs               # all stories
//   npx zx scripts/diff-vs-prod.mjs --threshold 0.002
//
// Requires ImageMagick (`brew install imagemagick`).
//
// Production runs whatever ui-kit version was last deployed, so a non-zero diff is a prompt to look,
// not proof of a regression: genuine component changes merged since that deploy show up here too.

$.verbose = false;

const REPO_ROOT = path.resolve(__dirname, "..");
const LOCAL = argv.local ?? "http://localhost:6006";
const PROD = argv.prod ?? "https://ui.xola.io";
const OUT = path.resolve(REPO_ROOT, argv.out ?? "storybook-diff");
const SESSION = argv.session ?? "uikit-diff";
// Normalised RMSE tolerated before a story is reported. Both sides render in the same browser at the
// same viewport, so genuinely identical output scores exactly 0 and this can sit very low. It has to:
// a missing 1px border on a select only moved 0.26% of the pixels and a 1% threshold hid it.
const THRESHOLD = Number(argv.threshold ?? 0.0005);

const ab = (...args) => $({ env: { ...process.env, AGENT_BROWSER_SESSION: SESSION } })`agent-browser ${args}`;

const capture = async (base, id, file) => {
    await ab("open", `${base}/iframe.html?id=${id}&viewMode=story`);
    await ab("set", "viewport", "1280", "720");
    await ab("wait", "--load", "networkidle");
    await ab("screenshot", file);
};

// Normalised RMSE over all channels, 0 (identical) to 1. `compare` reports it in parentheses on
// stderr and exits non-zero whenever the images differ, so failure is the expected path here.
const imageDistance = async (a, b) => {
    const result = await $({ nothrow: true, quiet: true })`compare -metric RMSE ${a} ${b} null:`;
    const normalised = /\(([\d.e+-]+)\)/.exec(result.stderr.trim());

    return normalised ? Number.parseFloat(normalised[1]) : null;
};

const index = await fetch(`${LOCAL}/index.json`).then((response) => response.json());
const ids = Object.values(index.entries ?? index.stories)
    .filter((entry) => entry.type !== "docs")
    .map((entry) => entry.id);

await fs.ensureDir(path.join(OUT, "local"));
await fs.ensureDir(path.join(OUT, "prod"));

const flagged = [];

for (const id of ids) {
    const localFile = path.join(OUT, "local", `${id}.png`);
    const prodFile = path.join(OUT, "prod", `${id}.png`);

    await capture(LOCAL, id, localFile);
    await capture(PROD, id, prodFile);

    const distance = await imageDistance(localFile, prodFile);

    if (distance === null) {
        console.log(`SKIP  ${id} (size mismatch or missing on prod)`);
        continue;
    }

    if (distance > THRESHOLD) {
        flagged.push({ id, distance });
        await $({ nothrow: true, quiet: true })`compare ${localFile} ${prodFile} ${path.join(OUT, `DIFF-${id}.png`)}`;
        console.log(`DIFF  ${id}  ${(distance * 100).toFixed(2)}% RMSE`);
    }
}

await ab("close");

console.log(`\n${ids.length - flagged.length}/${ids.length} stories match production within ${THRESHOLD * 100}%.`);
console.log(`Diff images: ${OUT}`);
process.exit(flagged.length > 0 ? 1 : 0);
