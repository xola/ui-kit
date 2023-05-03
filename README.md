## Xola UI Kit

Xola's React component library with Tailwind CSS for the next generation of Xola apps. See a preview at https://ui.xola.io

### Requirements

-   Node.js v16
-   NPM v7 or higher

### Usage

Install the UI kit:

```bash
npm install @xola/ui-kit
```

Install peer dependencies:

```bash
npm install autoprefixer postcss tailwindcss lodash
```

Create PostCSS and Tailwind config files:

```bash
echo 'module.exports = require("@xola/ui-kit/tailwind.config");' > tailwind.config.js
echo 'module.exports = require("@xola/ui-kit/postcss.config");' > postcss.config.js
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
$ nvm use # Project needs Node.js v16 with NPM v7
$ npm install
```

Start the Storybook development server:

```bash
$ npm start
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

## Publishing

Install the [np](https://www.npmjs.com/package/np) library using `npm install -g np`. Then run this to publish:

```bash
npm run publish
```

You will need:
1. The version number of the library
2. Your npm OTP 

The default tag is `latest`, if you wish to use another tag use the `-- --tag=foo` flag