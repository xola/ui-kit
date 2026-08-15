## Xola UI Kit

Xola's React component library. It uses Tailwind CSS and serves the next generation of Xola apps.

This repository publishes two packages:

1. [@xola/ui-kit](https://www.npmjs.com/package/@xola/ui-kit), the components.
2. [@xola/icons](https://www.npmjs.com/package/@xola/icons), the icon set.

Storybook is public at [ui.xola.io](https://ui.xola.io). You can preview components and icons there.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Development](#development)
- [Local Package Linking](#local-package-linking)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)

## Requirements

- Node.js v16
- npm v7 or higher

This repo's `master` branch targets React 17. For React 18 or 19, use the `next` branch, or
install the package with the `next` tag:

```bash
npm install @xola/ui-kit@next
```

## Installation

Install the UI kit in your project:

```bash
npm install @xola/ui-kit
```

Install its peer dependencies:

```bash
npm install autoprefixer postcss tailwindcss lodash
```

## Usage

1. Create Tailwind and PostCSS config files that extend the UI kit's config.

   ```bash
   echo 'module.exports = require("@xola/ui-kit/tailwind.config");' > tailwind.config.js
   echo 'module.exports = require("@xola/ui-kit/postcss.config");' > postcss.config.js
   ```

2. Import the UI kit's CSS in your app entry point.

   ```js
   import "@xola/ui-kit/index.css";
   import "@xola/ui-kit/build/style.css";
   ```

3. Import and use a component.

   ```js
   import { Button } from "@xola/ui-kit";
   ```

The UI kit assumes your project already has a working React setup with PostCSS support.

## Configuration

npm v7 changed how it resolves peer dependencies. This repo sets `legacy-peer-deps=true` in
`.npmrc` to avoid peer dependency conflicts.

Apply the same setting in any project that consumes `@xola/ui-kit`. Copy this repo's `.npmrc`, or
pass the flag on every install:

```bash
npm install --legacy-peer-deps
npm install some-package --legacy-peer-deps
```

## Development

1. Use the pinned Node version.

   ```bash
   nvm use
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Start the Storybook dev server.

   ```bash
   npm start
   ```

### Lint

```bash
npm run lint         # Check src for lint issues and auto-fix them
npm run lint:report  # Same check, writes results to eslint_report.json
```

## Local Package Linking

Use an npm workspace to test local `ui-kit` changes against another project before you publish.

1. Place `ui-kit` and your project in the same parent directory.
2. In that parent directory, create a `package.json`:

   ```json
   {
       "workspaces": ["ui-kit", "your-project"]
   }
   ```

3. Copy `.npmrc` and `.nvmrc` from `ui-kit` into the parent directory.

   ```bash
   cp ui-kit/.npmrc .
   cp ui-kit/.nvmrc .
   ```

4. From the parent directory, install dependencies for both projects.

   ```bash
   npm install
   ```

   npm now links `your-project`'s `@xola/ui-kit` dependency to the local `ui-kit` folder.

5. From `ui-kit`, start the build in watch mode.

   ```bash
   cd ui-kit
   npm run build -- --watch
   ```

   Changes in `ui-kit` now appear in `your-project`.

## Troubleshooting

**Changes in `ui-kit` don't show up in `your-project`.** npm likely installed a separate copy in
`your-project`'s `node_modules`. Remove it and let the workspace link take over again:

```bash
cd your-project
rm -rf node_modules/@xola
```

**Install fails or dependency state looks broken.** Clear lockfiles and `node_modules` for both
projects, then reinstall:

```bash
cd workspace
rm -rf package-lock.json node_modules ui-kit/node_modules your-project/node_modules
npm install
```

## Deployment

1. Install [np](https://github.com/sindresorhus/np#readme), the release tool.

   ```bash
   npm install -g np
   ```

2. Build and publish the package.

   ```bash
   npm run build
   np <your-new-version> --tag=latest --yolo
   ```

3. Push the release tags to the upstream repo.

   ```bash
   git push <upstream-remote> master --tags
   ```
