## Xola Icons

Xola's icon set exposed as React components, written in TypeScript. This folder is published on NPM as [@xola/icons](https://www.npmjs.com/package/@xola/icons).

The preview for icons are published as part of the repository's storybook on [ui.xola.io](https://ui.xola.io/?path=/story/media-icons--large-24-px).

### Requirements

-   Node.js v16
-   NPM v7 or higher

### Usage

Install the icons

```bash
npm install @xola/icons
```

Ships as TypeScript source (no build/dist step) with full types, so consumers get typed props out
of the box.

### Development

```bash
npm install
npm run lint       # eslint --fix
npm run typecheck  # tsc --noEmit
npm run format     # prettier --write
```

### Publish

Run these commands in the `src/icons/` folder

```bash
npm version <your-new-version>
npm publish --tag=latest
```

You can view your publish package here https://www.npmjs.com/package/@xola/icons?activeTab=versions
