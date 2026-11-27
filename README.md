## Xola UI Kit

Xola's React component library with Tailwind CSS for the next generation of Xola apps.

This repository is published as two pieces:

1. [@xola/ui-kit](https://www.npmjs.com/package/@xola/ui-kit)
2. [@xola/icons](https://www.npmjs.com/package/@xola/icons)

Its Storybook is published at [ui.xola.io](https://ui.xola.io), where you can also preview the icons.

### Requirements

-   Node.js 20 or newer (CI runs Node.js 24)
-   npm 7 or newer
-   React and React DOM 18.3.1 or newer, or React 19
-   Vite 5, 6, 7 or 8
-   Tailwind CSS v3 or v4 (see the setup for each below)

### Usage

#### Install with an AI agent

Paste the following prompt into your coding agent (Claude Code, Cursor, etc.) to have it install
and wire up the UI kit for you:

```text
Install and configure the @xola/ui-kit React component library in this project.

1. Install the package: npm install @xola/ui-kit@next
2. Install its peer dependencies: react react-dom autoprefixer postcss tailwindcss vite
   @types/react @types/react-dom (React 18.3.1+ or 19, Vite 5 to 8)
3. @xola/ui-kit is ESM only ("type": "module") with no CommonJS build. Import it, never
   require() it.
4. Detect the project's Tailwind CSS major version and configure accordingly:
   - Tailwind v3: create tailwind.config.mjs and postcss.config.mjs that re-export the ui-kit
     configs:
       export { default } from "@xola/ui-kit/tailwind.config.js";
       export { default } from "@xola/ui-kit/postcss.config.js";
     Then import both "@xola/ui-kit/index.css" and "@xola/ui-kit/build/style.css".
   - Tailwind v4: do NOT import "@xola/ui-kit/index.css" (it uses @tailwind/@apply and will
     error). Import only "@xola/ui-kit/build/style.css". In the CSS entry that has
     @import "tailwindcss";, add:
       @source "../node_modules/@xola/ui-kit/build/**/*.js";
       @import "@xola/ui-kit/build/theme.css";  /* after any of your own theme tokens */
5. This project uses legacy-peer-deps; run installs with --legacy-peer-deps (or copy ui-kit's
   .npmrc).
6. Verify by importing and rendering a component: import { Button } from "@xola/ui-kit";

Read the @xola/ui-kit README for the full details before making changes.
```

Prefer manual setup? Follow the steps below.

Install the UI kit:

```bash
npm install @xola/ui-kit@next --legacy-peer-deps
```

Install peer dependencies:

```bash
npm install react react-dom autoprefixer postcss tailwindcss vite @types/react @types/react-dom --legacy-peer-deps
```

UI kit expects you already have a working React dev environment with PostCSS support.

> **ESM only.** `@xola/ui-kit` ships as ESM (`"type": "module"`) with no CommonJS build. Consume it
> from an ESM context; `require("@xola/ui-kit")` is not supported.

Import and use the components:

```js
import { Button } from "@xola/ui-kit";
```

#### Tailwind v3 projects

Re-export ui-kit's PostCSS and Tailwind config. Use the `.mjs` extension (or set `"type": "module"`
in your `package.json`) so the ESM re-export loads regardless of your project's module type:

```bash
echo 'export { default } from "@xola/ui-kit/tailwind.config.js";' > tailwind.config.mjs
echo 'export { default } from "@xola/ui-kit/postcss.config.js";' > postcss.config.mjs
```

Import main CSS files in your project:

```js
import "@xola/ui-kit/index.css";
import "@xola/ui-kit/build/style.css";
```

`index.css` is raw source (`@tailwind base/components/utilities`) that your own
Tailwind v3 pipeline compiles, using `tailwind.config.js` above to pick up
ui-kit's theme and scan its components for classes.

#### Tailwind v4 projects

UI kit is still built on Tailwind v3, so there's no native way for it to hand
its config to a v4 project (v3's JS config format and v4's CSS-first `@theme`
aren't directly compatible). Two things bridge the gap:

1. **Don't import `@xola/ui-kit/index.css`.** It uses `@tailwind` directives
    and `@apply`, which v4's compiler doesn't understand and will error on.
    Only import the prebuilt CSS:

    ```js
    import "@xola/ui-kit/build/style.css";
    ```

2. **Scan ui-kit's bundle and import its color palette**, in your app's main
    CSS entry point (the file with `@import "tailwindcss";`):

    ```css
    @import "tailwindcss";

    /* v4 excludes node_modules from class scanning by default, so ui-kit's
       own utility classes (px-4.5, disabled:bg-gray-lighter, etc.) won't be
       generated unless something in your own source happens to use the same
       class string. Opt ui-kit's bundle back in explicitly. */
    @source "../node_modules/@xola/ui-kit/build/**/*.js";

    /* ui-kit's color palette (primary, gray, success, warning, ...),
       auto-generated from its tailwind.config.js. Import this instead of
       hand-copying hex values, otherwise names like "primary" will
       silently resolve to your own theme's colors instead of Xola's. */
    @import "@xola/ui-kit/build/theme.css";
    ```

If your app defines its own `primary`/`secondary`/`success`/etc. tokens (e.g.
via shadcn/ui), those will collide with ui-kit's, so `build/theme.css` must be
imported after your own theme so ui-kit's classNames resolve to ui-kit's
colors, not yours.

### Agent skills

Agent skills ship in the package under `node_modules/@xola/ui-kit/skills/`, version-matched to the
installed ui-kit. See [`skills/README.md`](skills/README.md) for the list and how to point your
coding agent at one.

### Upgrading

Each upgrade guide is an agent skill that ships in the package. To upgrade an app:

1. Install the new version: `npm install @xola/ui-kit@next --legacy-peer-deps`.
2. Tell your coding agent which guide to follow:
    - From 3.7 to 3.8: "Follow node_modules/@xola/ui-kit/skills/migrate-to-3.8/SKILL.md to upgrade this repo to ui-kit 3.8."
    - From 2.6 to 3.7: "Follow node_modules/@xola/ui-kit/skills/migrate-2.6-to-3.7/SKILL.md to upgrade this repo to ui-kit 3.7."
3. Run your type check, linter and tests. Each guide ends with a Verify section listing the checks that must pass.

3.8 moves `Tooltip`, `Popover` and `Sidebar.Menu` from Tippy to Radix, `RangeSlider` from noUiSlider to Radix Slider, and removes ui-kit's Headless UI dependency. Dialogs and `Switch` use Radix, while transitions use local staged classes or Radix Collapsible. Removed props log one warning in development builds and do nothing.

## Development

### Installation

Install all required dependencies:

```bash
$ nvm use # .nvmrc pins Node.js 20; any newer version works too
$ npm install
```

Start the Storybook development server:

```bash
$ npm start
```

### Testing

Tests run on [Vitest](https://vitest.dev). Pure helpers in `src/utils` and `src/helpers` have unit tests. Component behavior is tested by Storybook interaction (`play`) tests that run in Chromium through `@storybook/addon-vitest` and Playwright. A Storybook test fails if the story logs a React deprecation warning.

```bash
npm test               # Unit tests (Vitest, node environment)
npm run test:storybook # Storybook interaction tests (Playwright/Chromium)
npm run test:all       # Both projects
```

The Storybook tests need Playwright's Chromium browser the first time:

```bash
npx playwright install chromium
```

ui-kit supports React 18 and 19, and CI runs every check on both. The checkout installs React 18 from the lockfile. To run the Storybook tests on React 19:

1. Install React 19 without saving it: `npm run react:19`
2. Run the tests against it: `VITE_REACT_MAJOR=19 npm run test:storybook`
3. Go back to the lockfile's React 18: `npm run react:18`

Two more checks run in CI and are worth running before you open a release PR:

```bash
npm run build
npm run test:ssr                                  # Imports build/index.js in Node
npm run test:consumer -- --vite 8 --react 19      # Packs ui-kit, installs it in a Vite 8 app, then type-checks and builds
```

## Advanced
### Integrate your app with a locally installed UI Kit

In order for this to work you will have to set up an NPM workspace. That means, `ui-kit` and `your-project` has to be in the same directory.

Start by creating a `package.json` file in your "workspace" directory with the following content:

```json
{
    "workspaces": ["ui-kit", "your-project"]
}
```

Your workspace directory should also contain `.npmrc` and `.nvmrc` files. Copy them from this project:

```bash
$ cd workspace
$ cp ui-kit/.npmrc .
$ cp ui-kit/.nvmrc .
```

Now we're ready to install the dependencies for both projects:

```bash
$ cd workspace
$ npm install
```

If all went well, NPM will use locally installed `ui-kit` in `your-project`.

Next, start the build command from `ui-kit`:

```bash
$ cd ui-kit
$ npm run build -- --watch
```

This will build and watch for changes the `ui-kit` project. Any change made in the `ui-kit` should be visible in `your-project`.

If you don't see any changes in your project, that probably means that NPM installed a separate package in your `your-project/node_modules` directory. To fix this, just remove the whole package with the following command:

```bash
$ cd your-project
$ rm -rf node_modules/@xola
```

### Troubleshooting

If you encounter some package related issues, try removing the following directories and running the install command again:

```bash
$ cd workspace
$ rm -rf package-lock.json node_modules ui-kit/node_modules your-project/node_modules
$ npm install
```

### Lint & Auto-fix

```bash
npm run lint        # Lint `src` and auto-fix whatever can be fixed
npm run lint:ci     # Lint `src` without fixing (used in CI)
npm run lint:report # Write a JSON report to eslint_report.json
```

## Notes

This repo's `.npmrc` sets `legacy-peer-deps`. ui-kit depends on `react-day-picker` 7, whose `react` peer range stops at 17, so a strict npm install fails with `ERESOLVE` on React 18 or 19.

In order to avoid issues in your projects that are using this UI Kit, use the same `.npmrc` file or always run installs with `--legacy-peer-deps` flag.

For example:

```bash
$ npm install --legacy-peer-deps
```

Or:

```bash
$ npm install some-package --legacy-peer-deps
```

## Publishing the Package

The *Publish @xola/ui-kit* GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and publishes the package. Run it from the Actions tab and enter the npm dist-tag (`next` for 3.x prereleases, `latest` for stable). *Publish @xola/icons* does the same for the icons package.

To publish from your machine instead, install [np](https://github.com/sindresorhus/np#readme):

```bash
npm -g install np
```

Once you're ready, run this command to publish your package

```bash
npm run build
np <your-new-version> --tag=next --yolo
```

Then make sure to push all the tags upstream to `xola/ui-kit` repo:
```
git push <upstream-remote> master --tags
```
