# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Overview

`@xola/ui-kit` is Xola's shared React component library: Tailwind-based primitives (Button, Form
inputs, Modal, Table, DatePicker, etc.) published to npm and consumed by `x2-checkout`, `x2-seller`,
and other Xola frontends. Components are documented in Storybook and tested with Storybook play
tests on React 18 and 19.

## Commands

```sh
npm start                 # Storybook dev server (port 6006)
npm run dev               # Same as npm start
npm run build             # Production build (vite build to build/)
npm run build:storybook   # Static Storybook build
npm run lint               # eslint --fix on src (flat config from @xola/jslint); use lint:ci for a read-only check
npm run lint:fix          # eslint --fix on src (alias for lint)
npm run lint:ci           # eslint check only, no writes; exits non-zero on violations
npm run format            # Prettier --write on src
npm test                  # Unit tests only (Vitest); use test:all for unit + Storybook
npm run test:storybook    # Storybook interaction (play) tests, Playwright/Chromium
npm run test:all          # Unit + Storybook tests
npm run test:ssr          # Imports build/index.js in Node; run after npm run build
npm run react:18          # Installs the lockfile's React 18 (--no-save); the checkout's default
npm run react:19          # Installs React 19 (--no-save); run Storybook tests with VITE_REACT_MAJOR=19
npm run test:consumer -- --vite 8 --react 19   # Packs ui-kit into tests/consumer, then vite build + tsc
```

Run a single test file:

```sh
npx vitest run src/utils/avatar.test.js
```

## Architecture

React 18 and 19 + Tailwind CSS v3 component library, built with Vite. Mostly JavaScript/JSX; a small
number of files (`LocalizedDayPicker.tsx`, `DatePicker.helpers.ts`, some icons) are TypeScript.
`index.d.ts` is hand-maintained for consumers that want types.

**ESM only.** The package is `"type": "module"`; every file is native ESM (`import`/`export`, no
`require`/`module.exports`). This includes the published `tailwind.config.js` and
`postcss.config.js`, so consuming apps must load them from an ESM context. There is no CommonJS
build or entry. Storybook runs on the Vite builder (`@storybook/react-vite`, Storybook 10).

- `src/index.js`: the public API. Every exported component must be added here; it defines what
  `@xola/ui-kit` actually ships. Some component folders (e.g. `Tabs/`, `Sidebar/`) have their own
  small `index.js` for the folder import; `src/icons/index.js` is a separate barrel for the icons
  subpackage.
- `src/components/`: one folder per component or component family (e.g. `Forms/`, `Buttons/`,
  `DatePicker/`). Mostly `.jsx`, typed at the boundary with `prop-types`; a few files (e.g.
  `DatePicker/LocalizedDayPicker.tsx`) are TypeScript.
- `src/utils/`, `src/helpers/`, `src/hooks/`: shared utilities, framework-free helpers, and hooks.
- `src/icons/`: SVG icon components.
- `src/stories/`: Storybook stories, organized to mirror the Storybook sidebar (`Forms`,
  `Navigation`, `DataDisplay`, `Overlay`, `Media`, `Screens`, `Other`, `Configuration`). Excluded
  from linting and from the npm package.
- `src/theme.js`: generated/local theme file, gitignored.
- Tailwind theme (custom color scale, spacing, etc.) is defined in `tailwind.config.js` at the
  repo root (ESM `export default`). This is the file consuming apps point their own Tailwind config
  at, and it is the single source of truth `src/theme.js` and `public/theme.css` are generated from
  (`npm run prepare`).

**Testing:** Vitest. Pure logic gets a unit test; component behavior gets a Storybook play test. See
`.claude/rules/testing.md`.

## Key Rules

### Module format

- ESM only. Author every file (source, config, scripts) with `import`/`export`; never `require` or
  `module.exports`. Deep Node imports need the file extension (e.g. `tailwindcss/defaultTheme.js`),
  and `__dirname` must be derived from `import.meta.url` (`fileURLToPath`).

### Public API

- Any new component intended for consumer use must be exported from `src/index.js`.
- Removing or renaming an export, or changing a prop's type/behavior, is a breaking change for
  `x2-checkout`, `x2-seller`, and every other app depending on this package. Call it out
  explicitly in the PR description.

### Components

- Functional components + hooks only. `const ComponentName = (props) => { ... }`, named export.
- Type props with `prop-types`, not TypeScript. Every public prop needs a `PropTypes` entry;
  `children`/`className` pass-through props still need one.
- No `props: any`-equivalent; don't skip `propTypes` for a prop because it's "obvious".
- Destructure props in the function signature rather than accessing `props.x`.
- Use `clsx` for conditional `className` construction, not template literals or string
  concatenation.
- Max 6 levels of JSX indentation.
- Every change must work on React 18.3 and 19. React 19-only APIs go through
  `src/helpers/reactFeatures.js` (feature-detected once at module load), never a direct import.
- Keep `forwardRef`; React 18 has no ref-as-prop.
- No `defaultProps` on function components (React 19 ignores them); use default parameters.
- A prop change updates `skills/` (`using-ui-kit`, and `migrate-to-3.8` with its fixtures) and
  `index.d.ts`. A removed Tooltip, Popover or Sidebar.Menu prop goes in that component's
  `*_REMOVED_PROPS` map, which drives its dev warning and `scripts/skills.test.js`.

### Overlay stacking

- `Modal`, `Drawer` and `BottomSheet` share `z-30`, so the one opened last is on top
  (`Sidebar.Notifications` drawers stay at `z-10`, under the `z-20` rail).
- `Popover` content is `z-50`; `Tooltip` and `Sidebar.Menu` content is `z-[9999]`. All portal to
  `document.body`, above every dialog. Keep these values; consumer layouts are built around them.

### Tailwind

- Use the named color scale from `tailwind.config.js` (`bg-primary`, `text-gray-dark`,
  `border-gray-light`, etc.), never Tailwind's default numbered palette (`text-gray-600`).
- Avoid custom CSS or inline `style` props. If Tailwind can't express it, that's worth flagging,
  not routing around.
- No dark mode support.

### Hooks

- Use `useMount`/`useUnmount`/`useMemoizedFn` from `ahooks` instead of hand-rolled
  `useEffect`/`useCallback` equivalents.
- Always clean up `useEffect` side effects: event listeners, timers, third-party widget instances,
  and subscriptions must be torn down on unmount.
- Do not suppress `react-hooks/exhaustive-deps`.

### Comments

Comment only the WHY the code cannot say. See `.claude/rules/commenting.md`.
