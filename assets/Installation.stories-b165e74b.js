import{M as r,d as p}from"./index-32e1e29a.js";import{j as n,a as i,F as l}from"./jsx-runtime-5e7b5774.js";import{u as a}from"./index-3170f51e.js";import"./iframe-bf250786.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-4294b5bd.js";import"./index-e6e5af86.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-33434671.js";import"./index-1ae9f0af.js";import"./index-1b441bc2.js";import"./index-47bbf582.js";import"./isSymbol-939a2475.js";import"./index-356e4a49.js";const c=`## Xola UI Kit

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
- [AI Prompt for Integration](#ai-prompt-for-integration)
- [Development](#development)
- [Local Package Linking](#local-package-linking)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)

## Requirements

- Node.js v16
- npm v7 or higher

This repo's \`master\` branch targets React 17. For React 18 or 19, use the \`next\` branch, or
install the package with the \`next\` tag:

\`\`\`bash
npm install @xola/ui-kit@next
\`\`\`

## Installation

Install the UI kit in your project:

\`\`\`bash
npm install @xola/ui-kit
\`\`\`

Install its peer dependencies:

\`\`\`bash
npm install autoprefixer postcss tailwindcss lodash
\`\`\`

## Usage

1. Create Tailwind and PostCSS config files that extend the UI kit's config.

   \`\`\`bash
   echo 'module.exports = require("@xola/ui-kit/tailwind.config");' > tailwind.config.js
   echo 'module.exports = require("@xola/ui-kit/postcss.config");' > postcss.config.js
   \`\`\`

2. Import the UI kit's CSS in your app entry point.

   \`\`\`js
   import "@xola/ui-kit/index.css";
   import "@xola/ui-kit/build/style.css";
   \`\`\`

3. Import and use a component.

   \`\`\`js
   import { Button } from "@xola/ui-kit";
   \`\`\`

The UI kit assumes your project already has a working React setup with PostCSS support.

## Configuration

npm v7 changed how it resolves peer dependencies. This repo sets \`legacy-peer-deps=true\` in
\`.npmrc\` to avoid peer dependency conflicts.

Apply the same setting in any project that consumes \`@xola/ui-kit\`. Copy this repo's \`.npmrc\`, or
pass the flag on every install:

\`\`\`bash
npm install --legacy-peer-deps
npm install some-package --legacy-peer-deps
\`\`\`

## AI Prompt for Integration

Paste this prompt into an AI coding assistant (Claude Code, Cursor, etc.) working in the target
app's repo to wire up \`@xola/ui-kit\` end to end.

\`\`\`
Integrate the @xola/ui-kit package into this project.

1. Check this project's installed React version (react entry in package.json / package-lock.json,
   or \`npm ls react\`).
   - React 17 (or no major-version conflict): install the default tag.
     npm install @xola/ui-kit
   - React 18 or 19: install the \`next\` tag instead, which targets React 18/19.
     npm install @xola/ui-kit@next
   Use whichever tag matches in every command below.

2. Install peer dependencies:
   npm install autoprefixer postcss tailwindcss lodash

3. Add \`legacy-peer-deps=true\` to this project's .npmrc (create the file if missing).
   @xola/ui-kit requires it to avoid npm v7+ peer dependency conflicts.

4. Create tailwind.config.js and postcss.config.js at the project root that extend the kit's config:
   module.exports = require("@xola/ui-kit/tailwind.config");
   module.exports = require("@xola/ui-kit/postcss.config");
   If this project already has its own Tailwind/PostCSS config, merge instead of overwriting:
   preserve existing content globs, theme extensions, and plugins, and spread the kit's config in
   rather than replacing the file outright.

5. Import the kit's CSS in the app's entry point (before any of the app's own global styles):
   import "@xola/ui-kit/index.css";
   import "@xola/ui-kit/build/style.css";

6. Import components directly from the package, e.g.:
   import { Button } from "@xola/ui-kit";

7. Verify: run the project's build/dev server and confirm it starts without errors and that an
   imported component (e.g. Button) renders with its expected Tailwind styling.

Do not vendor or copy ui-kit source into this repo. Do not use Tailwind's default numbered color
classes when styling around ui-kit components; ui-kit ships with no dark mode support, so avoid
relying on it in this integration.
\`\`\`

## Development

1. Use the pinned Node version.

   \`\`\`bash
   nvm use
   \`\`\`

2. Install dependencies.

   \`\`\`bash
   npm install
   \`\`\`

3. Start the Storybook dev server.

   \`\`\`bash
   npm start
   \`\`\`

### Lint

\`\`\`bash
npm run lint         # Check src for lint issues and auto-fix them
npm run lint:report  # Same check, writes results to eslint_report.json
\`\`\`

## Local Package Linking

Use an npm workspace to test local \`ui-kit\` changes against another project before you publish.

1. Place \`ui-kit\` and your project in the same parent directory.
2. In that parent directory, create a \`package.json\`:

   \`\`\`json
   {
       "workspaces": ["ui-kit", "your-project"]
   }
   \`\`\`

3. Copy \`.npmrc\` and \`.nvmrc\` from \`ui-kit\` into the parent directory.

   \`\`\`bash
   cp ui-kit/.npmrc .
   cp ui-kit/.nvmrc .
   \`\`\`

4. From the parent directory, install dependencies for both projects.

   \`\`\`bash
   npm install
   \`\`\`

   npm now links \`your-project\`'s \`@xola/ui-kit\` dependency to the local \`ui-kit\` folder.

5. From \`ui-kit\`, start the build in watch mode.

   \`\`\`bash
   cd ui-kit
   npm run build -- --watch
   \`\`\`

   Changes in \`ui-kit\` now appear in \`your-project\`.

## Troubleshooting

**Changes in \`ui-kit\` don't show up in \`your-project\`.** npm likely installed a separate copy in
\`your-project\`'s \`node_modules\`. Remove it and let the workspace link take over again:

\`\`\`bash
cd your-project
rm -rf node_modules/@xola
\`\`\`

**Install fails or dependency state looks broken.** Clear lockfiles and \`node_modules\` for both
projects, then reinstall:

\`\`\`bash
cd workspace
rm -rf package-lock.json node_modules ui-kit/node_modules your-project/node_modules
npm install
\`\`\`

## Deployment

1. Install [np](https://github.com/sindresorhus/np#readme), the release tool.

   \`\`\`bash
   npm install -g np
   \`\`\`

2. Build and publish the package.

   \`\`\`bash
   npm run build
   np <your-new-version> --tag=latest --yolo
   \`\`\`

3. Push the release tags to the upstream repo.

   \`\`\`bash
   git push <upstream-remote> master --tags
   \`\`\`
`;function s(e){const t=Object.assign({p:"p"},a(),e.components);return i(l,{children:[n(r,{title:"Installation"}),`
`,n("h2",{children:"README.md"}),`
`,n("div",{style:{fontSize:"14px",marginBottom:"30px"},children:i(t.p,{children:["Content automatically pulled from"," ",`
`,n("span",{style:{fontSize:"14px",fontFamily:"Roboto mono, monospace"},children:"README.md"})]})}),`
`,n(p,{children:c})]})}function m(e={}){const{wrapper:t}=Object.assign({},a(),e.components);return t?n(t,{...e,children:n(s,{...e})}):s(e)}const d=()=>{throw new Error("Docs-only story")};d.parameters={docsOnly:!0};const o={title:"Installation",tags:["stories-mdx"],includeStories:["__page"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:m};const S=["__page"];export{S as __namedExportsOrder,d as __page,o as default};
