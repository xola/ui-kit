#!/usr/bin/env zx
/**
 * Smoke-builds the packed tarball the way a consumer app would: `npm run test:consumer -- --vite 8 --react 19`.
 * Packs ui-kit, installs it plus the given vite/react majors into a clean copy of tests/consumer, then runs
 * `vite build` and `tsc --noEmit`.
 *
 * The install has no legacy-peer-deps. vite is an optional peer, so npm installs a vite outside the range without
 * erroring; `npm ls vite` is what exits non-zero (ELSPROBLEMS) on that mismatch.
 */
import { fileURLToPath } from "node:url";
import { $, argv, chalk, fs, path } from "zx";

const VITE_MAJORS = [5, 8];
const REACT_MAJORS = [18, 19];
const WORK_DIR = "/tmp/ai-temp-data/ui-kit-consumer";

const { vite, react } = argv;
const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const isSupported = VITE_MAJORS.includes(vite) && REACT_MAJORS.includes(react);

if (!isSupported) {
    throw new Error(
        `Usage: --vite <${VITE_MAJORS.join("|")}> --react <${REACT_MAJORS.join("|")}>, got ${vite}, ${react}`,
    );
}

const appDir = path.join(WORK_DIR, "app");
const packDir = path.join(WORK_DIR, ".pack");

await fs.remove(WORK_DIR);
await fs.ensureDir(packDir);
await fs.copy(path.join(repoRoot, "tests/consumer"), appDir, { filter: (src) => !src.includes("node_modules") });

const { stdout } = await $({ cwd: repoRoot })`npm pack --pack-destination ${packDir}`;
const filename = stdout.trim().split("\n").at(-1);
const tarball = path.join(packDir, filename);
const { stdout: tarballFiles } = await $`tar -tzf ${tarball}`;

/**
 * `types` and the exports map point at build/index.d.ts, and `prepare` (run by pack and publish) must copy it in.
 * A tarball without it makes every consumer's `@xola/ui-kit` import untyped.
 */
if (!tarballFiles.split("\n").includes("package/build/index.d.ts")) {
    throw new Error(`${filename} is missing build/index.d.ts, which package.json "types" points at`);
}

const reactSpecs = ["react", "react-dom", "@types/react", "@types/react-dom"].map((name) => `${name}@${react}`);
const $app = $({ cwd: appDir, stdio: "inherit" });

await $app`npm install --no-fund --no-audit ${tarball} vite@${vite} ${reactSpecs}`;
await $app`npm ls vite`;
await $app`npx vite build`;
await $app`npx tsc --noEmit`;

console.log(chalk.green(`consumer ok: vite ${vite}, react ${react}`));
