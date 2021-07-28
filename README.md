# Xola UI Kit

React component library for the next generation of Xola apps.

## Usage

Install the UI kit.

```bash
$ npm install @xola/ui-kit
```

Install peer dependencies:
```bash
$ npm install autoprefixer postcss tailwindcss lodash
```

Create PostCSS and Tailwind config files:
```bash
$ echo 'module.exports = require("@xola/ui-kit/tailwind.config");' > tailwind.config.js
$ echo 'module.exports = require("@xola/ui-kit/postcss.config");' > postcss.config.js
```

Import main CSS files in your project.

```js
import "@xola/ui-kit/index.css";
import "@xola/ui-kit/build/style.css";
```

UI kit expects you already have a working React dev environment with PostCSS support.

Import and use the components.

```js
import { Button } from "@xola/ui-kit";
```

## Development

### Installation

Install all required dependencies:

```bash
$ nvm use # Project needs vode V14
$ npm install
```

Start the Storybook development server:

```bash
$ npm run dev
```

### Use the Package Locally

```bash
$ npm pack
$ cd your-project
$ npm install ../ui-kit/xola-ui-kit@{version}.tgz --no-save
```

### Lint & Auto-fix

To automatically fix lint issues in this project you have the following commands:
```bash
npm run lint # Run lint on `src` and output issues
npm run lint:fix # Run lint and automatically fix any issues. Any that are not fixed are output to screen
```