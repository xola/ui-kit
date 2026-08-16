## @xola/icons

Xola's icon set. Each icon is a typed React component, written in TypeScript.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Development](#development)
- [Publish](#publish)

## Installation

Run this command in your project.

```bash
npm install @xola/icons
```

The package requires these versions.

- Node.js v16 or higher
- NPM v7 or higher
- React 17, 18, or 19 (peer dependency)

## Usage

Import an icon and render it like any other component.

```tsx
import { AccountIcon } from "@xola/icons";

const Example = () => <AccountIcon className="text-primary" />;
```

Each icon accepts standard SVG props (`className`, `fill`, `onClick`, and so on) plus a `size` prop.

```tsx
<AccountIcon size="large" />
```

Browse the full icon set in Storybook at [ui.xola.io](https://ui.xola.io/?path=/story/media-icons--large-24-px).

## Configuration

The `size` prop accepts one of four values. Each value maps to a fixed Tailwind width/height class.

| Size     | Class         | Pixels |
| -------- | ------------- | ------ |
| `tiny`   | `w-3 h-3`     | 12px   |
| `small`  | `w-3.5 h-3.5` | 14px   |
| `medium` | `w-4.5 h-4.5` | 18px   |
| `large`  | `w-6 h-6`     | 24px   |

`size` defaults to `small` when you omit it.

The package ships as TypeScript source with no build step (`main`/`types` point at `./index.ts`). Your
bundler compiles the icon files directly, so you get typed props without a separate `@types` package.
This also means consumers type-check this package's raw source under their own `tsconfig.json`, not a
pre-built `.d.ts`.

**Every `.tsx` file that uses JSX must start with `import React from "react";`**, even though the
automatic JSX runtime doesn't require it. Consumer apps using the classic JSX runtime (`"jsx": "react"`)
need `React` in scope per-file, and since this package ships raw source, their tsconfig applies, not
ours. Missing this import surfaces as `TS2686: 'React' refers to a UMD global, but the current file is a
module` in the *consuming* app, not here, so it's easy to miss. Run `npm run typecheck` after adding an
icon, but also grep for it directly since this repo's own tsconfig may not catch it:

```bash
grep -rL "^import React" src --include="*.tsx" | grep -v helpers/
```

## Development

Run these commands from the `src/icons/` folder.

```bash
npm install
npm run lint
npm run typecheck
npm run format
```

`npm run lint` runs ESLint with autofix. `npm run typecheck` runs `tsc --noEmit`. `npm run format` runs Prettier.

## Publish

Follow these steps in the `src/icons/` folder to publish a new version.

1. Bump the version number.

   ```bash
   npm version <your-new-version>
   ```

2. Publish the package.

   ```bash
   npm publish --tag=latest
   ```

3. Confirm the new version on the [npm package page](https://www.npmjs.com/package/@xola/icons?activeTab=versions).
