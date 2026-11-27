---
name: migrate-2.6-to-3.7
description: Use when upgrading an app from @xola/ui-kit 2.6 to 3.7, or when, after that bump, ui-kit's Tailwind or PostCSS config fails to load, an import throws `ERR_PACKAGE_PATH_NOT_EXPORTED`, or `useId` is missing.
---

# Migrate @xola/ui-kit 2.6 to 3.7

ui-kit 3.7 is ESM-only, requires React 18.3 or newer, and resolves entry points through an `exports` map. Work the steps in order, and start each one only once the previous step's **Done when** holds. The app's own bundler upgrade (for example Vite 3 to 8) belongs to the app's upgrade plan, not to this guide.

## 1. Preflight

- `git status` shows a clean working tree.
- `node -v` is 20 or newer (3.7 sets `engines.node` to `>=20`).
- `npm ls react react-dom` resolves both to 18.3.1 or newer. 2.6.2 peered on React 17, so a React 17 app upgrades React first.
- TypeScript apps: `@types/react` is `^18.2.22` or `^19`, `@types/react-dom` is `^18.2.7` or `^19`.

Done when every bullet holds.

## 2. Install

```bash
npm install @xola/ui-kit@3.7 --legacy-peer-deps
```

Keep `legacy-peer-deps=true` in the app's `.npmrc` so every later install skips npm 7+ peer conflicts the same way. The `lodash` peer is gone (ui-kit depends on `lodash-es`), so remove `lodash` from the app only when nothing else imports it.

Done when `npm ls @xola/ui-kit` shows 3.7.x with no `invalid` peer lines.

## 3. Load ui-kit as ESM

The package is `"type": "module"` with no CommonJS build. `main` and `module` point at `build/index.js`, which replaces the 2.6.2 `build/ui-kit.umd.js` and `build/ui-kit.mjs`.

- Replace every `require("@xola/ui-kit")` with `import`.
- Convert each config file that requires a ui-kit config (2.6.2 set them up as `module.exports = require("@xola/ui-kit/tailwind.config");` in `tailwind.config.js` and `postcss.config.js`) to an ESM file with the `.mjs` extension, or set `"type": "module"` in the app's `package.json`:

  ```js
  // tailwind.config.mjs
  export { default } from "@xola/ui-kit/tailwind.config.js";
  // postcss.config.mjs
  export { default } from "@xola/ui-kit/postcss.config.js";
  ```

  A config that extends ui-kit's (spreads it and adds `content` globs, theme extensions or plugins) keeps those additions: `import uiKitConfig from "@xola/ui-kit/tailwind.config.js";`, then `export default` the merged object. Delete the old `.js` files once the `.mjs` files exist, because Tailwind and PostCSS load `.js` first.
- Test runners that load packages as CommonJS (Jest without ESM support) must transform `@xola/ui-kit` and its ESM-only dependencies, for example through `transformIgnorePatterns`.

Done when `node -e 'import("@xola/ui-kit").then(() => console.log("ok"))'` prints `ok` and `rg -n "require\(['\"]@xola/ui-kit" -g '*.{js,cjs,cts,ts,tsx,jsx}' -g '!node_modules' .` finds nothing.

## 4. Fix entry points (`exports` map)

Only the subpaths listed under `exports` in `node_modules/@xola/ui-kit/package.json` resolve. Other deep imports (`@xola/ui-kit/index.d.ts`, `@xola/ui-kit/src/...`) throw `ERR_PACKAGE_PATH_NOT_EXPORTED`. The old `build/ui-kit.*` bundles match `build/*` but no longer exist, since `build/` now holds one file per module. Import all of these from `@xola/ui-kit`.

Done when every hit of `rg -n "['\"]@xola/ui-kit/" -g '!node_modules' -g '!dist' -g '!build' .` names a subpath listed in `exports`, and each `build/*` hit names a file present in `node_modules/@xola/ui-kit/build/`.

## 5. Check the CSS import path

Tailwind v3 apps keep the same two imports as 2.6.2:

```js
import "@xola/ui-kit/index.css";
import "@xola/ui-kit/build/style.css";
```

Tailwind v4 apps import only `@xola/ui-kit/build/style.css`, since `index.css` uses v3 `@tailwind` directives that v4 rejects. Their CSS entry also needs an `@source` line for ui-kit's build and `@import "@xola/ui-kit/build/theme.css"`, as set out in the "Tailwind v4 projects" section of `node_modules/@xola/ui-kit/README.md` ("Tailwind v3 projects" covers v3).

Done when the app's CSS entry matches its Tailwind major version's imports.

## 6. Replace removed exports and fix types

`useId` is the one runtime export removed since 2.6.2. ui-kit's `useId(prefix)` returned `` `${prefix}-<n>` ``; React's `useId()` takes no argument, so build `` `${prefix}-${useId()}` `` wherever a caller relies on the prefix:

```diff
-import { useId } from "@xola/ui-kit";
+import { useId } from "react";
```

The 2.6.2 `index.d.ts` also declared `BaseInput`, `CloseCircleIcon` and `SquareIcon`, which were never runtime exports, so any import of them was `undefined`. Remove those imports. 3.7's `index.d.ts` declares exactly the runtime exports; everything outside the `Sidebar` family stays typed `any`, as in 2.6.2.

Two `Sidebar` props changed:

- `onSidebarResize` receives the width as a number (2.6.2 passed a string), at runtime and in the types. Handlers that parse or strip it (`parseInt(width)`, `width.replace(...)`) use the number directly.
- `logo` takes a `ReactElement` (2.6.2 allowed any `ReactNode`). Wrap a bare string in an element.

The `Sidebar` parts were typed in 2.6.2 already, so the rules below surface as new `tsc` errors only when the app has typed ui-kit through a `declare module "@xola/ui-kit"` shim and drops it:

- `Sidebar.Link`, `Sidebar.Button` and `Sidebar.Account` extend the HTML button attributes, so an unknown prop is an error. `to` on `Sidebar.Link` never navigated (it reached the `<button>` as an inert attribute): delete it and route in `onClick`.
- `Sidebar.Link`, `Sidebar.Heading` and `Sidebar.Button` `icon` take a component (`icon={UserIcon}`), not an element (`icon={<UserIcon />}`). `Sidebar.Link` also accepts a thunk `() => ReactElement | null`. `Sidebar.Account` `icon` is a `ReactNode`. Type an app prop that carries an icon as `React.ComponentType<{ className?: string }>`.
- `Sidebar.Button` and `Sidebar.Heading` `label` is a `string`, so `label={user?.name}` needs `?? ""` or a guard.

Done when `rg -nU "import\s*(type\s*)?\{[^}]*\b(useId|BaseInput|CloseCircleIcon|SquareIcon)\b[^}]*\}\s*from\s*['\"]@xola/ui-kit['\"]" -g '!node_modules' .` finds nothing (it matches multi-line imports), every `onSidebarResize` handler from `rg -n onSidebarResize -g '!node_modules' .` treats the width as a number, and every `Sidebar` `logo` is an element.

## 7. Verify

Run the app's lint, type check (`npx tsc --noEmit` for TypeScript apps), test and build scripts, as named in its `package.json`. Then start the dev server and render a page with a ui-kit `Button`.

Done when every script exits 0, the page renders with ui-kit styles, and the console shows no React or module-resolution errors.
