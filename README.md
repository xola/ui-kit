# Xola UI Kit

React component library for the next generation of Xola apps.

## Usage

Install the UI kit.

```bash
$ npm install @xola/ui-kit
```

Install peer dependencies.

```bash
$ npm install autoprefixer postcss tailwindcss lodash
```

Create PostCSS and Tailwind config files.

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

## Available Components

-   Alert
-   Avatar
-   Badge
-   Breadcrumb
-   Button
-   ButtonGroup
-   FormGroup
-   HeaderToolbar
-   Input
-   Label
-   Logo
-   Modal
-   NotificationCount
-   Popover
-   Search
-   Sidebar
-   Spinner
-   Switch
-   Table
-   Tooltip

## Development

### Installation

Install all required dependencies:

```bash
$ nvm use
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
