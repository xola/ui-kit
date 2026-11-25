---
name: migrate-2.6-to-3.7
description: Use when upgrading an app from @xola/ui-kit 2.6.x to 3.7.x, or when a 2.6 app fails to load ui-kit config, resolve its entry points or import a removed export after the bump.
---

# Migrate @xola/ui-kit 2.6 to 3.7

ui-kit 3.7 is ESM-only, requires React 18.3 or newer, and resolves entry points through an `exports` map. Work through the steps in order. Each ends with a check; do not start the next step until it passes.

Out of scope: the consuming app's own bundler jump (for example Vite 3 to 8). The app's own upgrade plan covers it.

## 1. Preflight

- `git status` shows a clean working tree.
- Node is 20 or newer (`node -v`). 3.7 sets `engines.node` to `>=20`; 2.6.2 allowed 16.
- `react` and `react-dom` resolve to 18.3.1 or newer (`npm ls react react-dom`). 2.6.2 peered on React 17; 3.7 peers on `^18.3.1 || ^19.0.0`.
- `@types/react` and `@types/react-dom` are `^18.2.22` or `^19` (`@types/react`) and `^18.2.7` or `^19` (`@types/react-dom`) if the app uses TypeScript.

Done when all four hold.

## 2. Install

```bash
npm install @xola/ui-kit@3.7 --legacy-peer-deps
```

Keep `legacy-peer-deps=true` in the app's `.npmrc`; ui-kit's own `.npmrc` sets it. The `lodash` peer is gone (ui-kit depends on `lodash-es` directly), so remove `lodash` from the app only if nothing else uses it.

Done when `npm ls @xola/ui-kit` shows 3.7.x with no `invalid` peer lines.

## 3. Load ui-kit as ESM

The package has `"type": "module"` and no CommonJS build. `main`/`module` now point at `build/index.js`; the 2.6.2 `build/ui-kit.umd.js` and `build/ui-kit.mjs` are gone.

- Replace every `require("@xola/ui-kit")` with `import`.
- Replace CommonJS config files that require ui-kit's configs. Use the `.mjs` extension (or `"type": "module"` in the app's `package.json`):

  ```js
  // tailwind.config.mjs
  export { default } from "@xola/ui-kit/tailwind.config.js";
  // postcss.config.mjs
  export { default } from "@xola/ui-kit/postcss.config.js";
  ```

  2.6.2 used `module.exports = require("@xola/ui-kit/tailwind.config");` in `tailwind.config.js` and `postcss.config.js`. Delete those files after the `.mjs` versions exist, or the tools pick up the old ones.
- Test runners that load packages as CommonJS (Jest without ESM support) must transform `@xola/ui-kit` and its ESM-only dependencies, for example through `transformIgnorePatterns`.

Done when `node -e 'import("@xola/ui-kit").then(() => console.log("ok"))'` prints `ok` and `rg -n "require\(['\"]@xola/ui-kit" -g '*.{js,cjs,cts,ts,tsx,jsx}' -g '!node_modules' .` finds nothing.

## 4. Fix entry points (`exports` map)

Only these subpaths resolve:

| Import | Resolves to |
| --- | --- |
| `@xola/ui-kit` | `build/index.js` (types: `build/index.d.ts`) |
| `@xola/ui-kit/index.css` | `index.css` |
| `@xola/ui-kit/build/*` | `build/*` |
| `@xola/ui-kit/tailwind.config` and `.js` | `tailwind.config.js` |
| `@xola/ui-kit/postcss.config` and `.js` | `postcss.config.js` |
| `@xola/ui-kit/package.json` | `package.json` |

Any other deep import (`@xola/ui-kit/index.d.ts`, `@xola/ui-kit/src/...`) throws `ERR_PACKAGE_PATH_NOT_EXPORTED`. `build/` is now one file per module (mirrors `src/`), so imports of the old `build/ui-kit.*` bundles break. Import from `@xola/ui-kit`.

Done when `grep -rn "@xola/ui-kit/" src` lists only paths from the table.

## 5. Check the CSS import path

Tailwind v3 apps keep the same two imports as 2.6.2:

```js
import "@xola/ui-kit/index.css";
import "@xola/ui-kit/build/style.css";
```

Tailwind v4 apps import only `@xola/ui-kit/build/style.css` (never `index.css`), plus `@source` and `@import "@xola/ui-kit/build/theme.css"` in the CSS entry. The ui-kit README sections "Tailwind v3 projects" and "Tailwind v4 projects" are the reference.

Done when the app's CSS entry matches its Tailwind major version's imports above.

## 6. Replace removed exports

`useId` is the one runtime export removed between 2.6.2 and 3.7. Use React's own hook:

```diff
-import { useId } from "@xola/ui-kit";
+import { useId } from "react";
```

The 2.6.2 `index.d.ts` also declared `BaseInput`, `CloseCircleIcon` and `SquareIcon`, which were never exported at runtime, so any import of them is `undefined`. Remove those imports.

Added since 2.6.2, available if you need them: `SecondaryButton`, `ValuePopoverText`, `getInitials`, `compactNumber`, `getChildByType`, `getChildrenByType`, `useIsClient`, `useViewportHeight`.

Types: `index.d.ts` now declares every runtime export. Every component except Sidebar is still typed `any`, as in 2.6.2. One signature changed: `Sidebar`'s `onSidebarResize` was `(width: string) => void` and is now `(width: number) => void`. TypeScript consumers must update handlers that parse the string (`parseInt(width)`, `width.replace(...)`) to use the number directly.

The Sidebar parts are typed too, and a consumer that had no types for them (an `any` shim) sees new errors. `Sidebar.Link`, `Sidebar.Button` and `Sidebar.Account` extend the HTML button attributes, so an unknown prop such as `to` on `Sidebar.Link` is an error: delete it, it only became an inert attribute, and change the route in `onClick`. `Sidebar.Link` and `Sidebar.Heading` `icon`, and `Sidebar.Button` `icon`, take a component (`icon={UserIcon}`), not an element (`icon={<UserIcon />}`); `Sidebar.Link` also accepts a thunk `() => ReactElement | null`. Type an app prop that carries an icon as `React.ComponentType<{ className?: string }>`. `Sidebar.Button` and `Sidebar.Heading` `label` is a `string`, so `label={user?.name}` needs `?? ""` or a guard.

Done when `rg -nU "import\s*(type\s*)?\{[^}]*\b(useId|BaseInput|CloseCircleIcon|SquareIcon)\b[^}]*\}\s*from\s*['\"]@xola/ui-kit['\"]" -g '!node_modules' .` finds nothing (it matches multi-line imports) and `npx tsc --noEmit` accepts every `onSidebarResize` handler.

## 7. Verify

Run the app's own scripts, all green:

```bash
npm run lint
npx tsc --noEmit      # TypeScript apps
npm test
npm run build
```

Then start the dev server and render a page with a ui-kit `Button`. Done when the page renders with ui-kit styles and the console shows no React or module-resolution errors.
