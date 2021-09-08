# Xola UI Kit

React component library for the next generation of Xola apps.

## Requirements

-   Node.js v14
-   NPM v7

## Usage

Install the UI kit:

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

Import main CSS files in your project:

```js
import "@xola/ui-kit/index.css";
import "@xola/ui-kit/build/style.css";
```

UI kit expects you already have a working React dev environment with PostCSS support.

Import and use the components:

```js
import { Button } from "@xola/ui-kit";
```

## Development

### Installation

Install all required dependencies:

```bash
$ nvm use # Project needs Node.js v14 with NPM v7
$ npm install
```

Start the Storybook development server:

```bash
$ npm run dev
```

### Use the Package Locally

In order for this to work you will have to set up an NPM workspace. Also, `ui-kit` and `your-project` has to be in the same directory.

Start by creating a `package.json` file in your "workspace" directory with the following content:

```json
{
    "workspaces": ["ui-kit", "your-project"]
}
```

```bash
$ cd workspace
$ npm install --legacy-peer-deps
```

Next, start the build command from `ui-kit`:

```bash
$ cd ui-kit
$ npm run build -- --watch
```

If you encounter some issues, try removing the following directories and running the install command again:

```bash
$ rm -rf ui-kit/node_modules
$ rm -rf your-project/node_modules
$ npm install --legacy-peer-deps
```

### Lint & Auto-fix

To automatically fix lint issues in this project you have the following commands:

```bash
npm run lint # Run lint on `src` and output issues
npm run lint:fix # Run lint and automatically fix any issues. Any that are not fixed are output to screen.
```

## Notes

To avoid issues with how npm v7 resolves peer dependencies, we enabled `legacy-peer-deps` rule in `.npmrc`.

In order to avoid issues in your projects that are using this UI Kit, use the same `.npmrc` file or always run installs with `--legacy-peer-deps` flag.

For example:

```bash
$ npm install --legacy-peer-deps
```

Or:

```bash
$ npm install some-package --legacy-peer-deps
```
