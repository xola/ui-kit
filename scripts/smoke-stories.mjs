#!/usr/bin/env zx
// Smoke-tests Storybook stories in a real browser: renders each story in isolation via iframe.html,
// then fails on any page error or console error. Screenshots land in --out for visual diffing
// between branches.
//
//   npm run dev                                     # in another shell
//   npx zx scripts/smoke-stories.mjs                # the default component set
//   npx zx scripts/smoke-stories.mjs --all          # every story in the index
//   npx zx scripts/smoke-stories.mjs --out shots    # screenshot dir, relative to the repo root

$.verbose = false;

const REPO_ROOT = path.resolve(__dirname, "..");
const BASE = argv.base ?? "http://localhost:6006";
const OUT = path.resolve(REPO_ROOT, argv.out ?? "storybook-smoke");
const SESSION = argv.session ?? "uikit-smoke";

// Storybook's manager and react-select each bundle emotion; the duplicate-instance warning is
// pre-existing upstream noise, not a regression in this library.
const IGNORED_CONSOLE = [/@emotion\/react when it is already loaded/i, /\[vite\] (connecting|connected)/i];

// The stories a reviewer should eyeball on every dependency bump: one per component family, biased
// toward the ones with real interaction or third-party widgets behind them.
const DEFAULT_STORIES = [
    "configuration-colors--colors",
    "configuration-ui-kit-raw-config--ui-kit-raw-config",
    "data-display-badges--default",
    "data-display-badges--colors",
    "forms-fields-buttons-button--default",
    "forms-fields-buttons-button--states",
    "data-display-date-time-date-picker--default",
    "data-display-date-time-date-picker--picker-with-input",
    "data-display-phone--default",
    "forms-fields-rangeslider--default",
    "forms-fields-rangeslider--multiple-input",
    "navigation-sidebar--default",
    "overlay-drawers--drawers",
    "overlay-modal--default",
    "overlay-bottomsheet--default",
    "overlay-tooltip--default",
    "popover--default",
    "popoverlist--default",
    "data-display-flash--default",
    "data-display-flash--all-styles",
    "screens-login--default",
];

const ab = (...args) => $({ env: { ...process.env, AGENT_BROWSER_SESSION: SESSION } })`agent-browser ${args}`;

const isNoise = (line) => IGNORED_CONSOLE.some((pattern) => pattern.test(line));

const storyIds = async () => {
    if (!argv.all) {
        return DEFAULT_STORIES;
    }

    const index = await fetch(`${BASE}/index.json`).then((response) => response.json());

    return Object.values(index.entries ?? index.stories)
        .filter((entry) => entry.type !== "docs")
        .map((entry) => entry.id);
};

const checkStory = async (id) => {
    await ab("open", `${BASE}/iframe.html?id=${id}&viewMode=story`);
    await ab("wait", "--load", "networkidle");

    const errors = (await ab("errors")).stdout.trim();
    const console_ = (await ab("console")).stdout.trim();
    await ab("screenshot", path.join(OUT, `${id}.png`));

    const consoleErrors = console_
        .split("\n")
        .filter((line) => /^\[(error|warning)]/i.test(line) && !isNoise(line));

    // Clearing per story keeps the next story's report free of this one's output.
    await ab("console", "--clear");
    await ab("errors", "--clear");

    return { id, errors, consoleErrors };
};

await fs.ensureDir(OUT);

const results = [];

for (const id of await storyIds()) {
    const result = await checkStory(id);
    const failed = result.errors || result.consoleErrors.length > 0;
    results.push({ ...result, failed });
    console.log(`${failed ? "FAIL" : "pass"}  ${id}`);

    if (result.errors) {
        console.log(`      page errors: ${result.errors.replaceAll("\n", "\n      ")}`);
    }

    for (const line of result.consoleErrors) {
        console.log(`      console: ${line}`);
    }
}

await ab("close");

const failures = results.filter((result) => result.failed);
console.log(`\n${results.length - failures.length}/${results.length} stories clean. Screenshots: ${OUT}`);
process.exit(failures.length > 0 ? 1 : 0);
