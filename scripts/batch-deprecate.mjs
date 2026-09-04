#!/usr/bin/env npx zx

import { $, chalk } from "zx/core";
import minimist from "minimist";
import semver from "semver";

$.verbose = false;

const PKG = "@xola/ui-kit";
const argv = minimist(process.argv.slice(2));
const dryRun = argv["dry-run"] ?? false;
const MSG = "Deprecated: use a newer version. See https://www.npmjs.com/package/@xola/ui-kit";

async function main() {
    if (argv["list-deprecated"]) {
        await listDeprecated();
        return;
    }

    const to = argv.to;
    const from = argv.from;
    if (!from || !to) {
        throw new Error("Pass --from=<semver> --to=<semver> range to deprecate (inclusive)");
    }

    const { versions } = await fetchPackument();
    const targets = Object.keys(versions).filter((v) => semver.gte(v, from) && semver.lte(v, to));
    console.log(chalk.yellow(`Will deprecate ${targets.length} versions of ${PKG}:`));
    console.log(targets.join(", "));

    if (dryRun) {
        console.log(chalk.dim("[dry-run] no changes made"));
        return;
    }

    // npm deprecate reads and rewrites the whole packument, so concurrent calls race and
    // corrupt each other's write. Must stay sequential.
    const failures = [];
    for (const v of targets) {
        console.log(chalk.dim(`deprecating ${v}...`));
        try {
            await $`npm deprecate ${PKG}@${v} ${MSG}`;
        } catch (error) {
            failures.push({ version: v, error });
        }
    }

    if (failures.length) {
        console.error(chalk.red(`${failures.length}/${targets.length} failed:`));
        failures.forEach(({ version, error }) => console.error(chalk.red(`  ${version}: ${error.message}`)));
        process.exitCode = 1;
        return;
    }

    console.log(chalk.green(`Done. ${targets.length} versions deprecated.`));
}

// npm view's --json is abbreviated metadata (versions collapses to a plain array);
// per-version deprecated flags only live in the full packument from the registry API.
async function fetchPackument() {
    const { stdout } = await $`curl -s https://registry.npmjs.org/${encodeURIComponent(PKG)}`;
    return JSON.parse(stdout);
}

async function listDeprecated() {
    const { versions } = await fetchPackument();
    const deprecated = Object.entries(versions).filter(([, meta]) => meta.deprecated);
    if (!deprecated.length) {
        console.log(chalk.dim("No deprecated versions."));
        return;
    }

    console.log(chalk.yellow(`${deprecated.length} deprecated versions of ${PKG}:`));
    deprecated.forEach(([version, meta]) => console.log(`  ${version}: ${meta.deprecated}`));
}

main().catch((err) => {
    console.error(chalk.red(err.message));
    process.exit(1);
});
