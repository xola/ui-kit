# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Overview

`@xola/ui-kit` is Xola's shared React component library: Tailwind-based primitives (Button, Form
inputs, Modal, Table, DatePicker, etc.) published to npm and consumed by `x2-checkout`, `x2-seller`,
and other Xola frontends. Components are documented and visually tested via Storybook.

## Commands

```sh
npm run dev              # Storybook dev server (no manager cache)
npm run storybook        # Storybook dev server on port 6006
npm run build             # Production build (vite build to build/)
npm run build:storybook   # Static Storybook build
npm run lint               # eslint on src (flat config from @xola/jslint)
npm run lint:fix          # eslint --fix on src
npm run format            # Prettier --write on src
npm test                  # Run all tests (Vitest)
```

Run a single test file:

```sh
npx vitest run src/utils/avatar.test.js
```

## Architecture

React 18 + Tailwind CSS v3 component library, built with Vite. Plain JavaScript/JSX, no
TypeScript. `index.d.ts` is hand-maintained for consumers that want types.

**ESM only.** The package is `"type": "module"`; every file is native ESM (`import`/`export`, no
`require`/`module.exports`). This includes the published `tailwind.config.js` and
`postcss.config.js`, so consuming apps must load them from an ESM context. There is no CommonJS
build or entry. Storybook runs on the Vite builder (`@storybook/react-vite`, Storybook 10).

- `src/index.js`: the public API. Every exported component must be added here; this is the only
  barrel file and it defines what `@xola/ui-kit` actually ships.
- `src/components/`: one folder per component or component family (e.g. `Forms/`, `Buttons/`,
  `DatePicker/`). Components are `.jsx`, typed at the boundary with `prop-types`.
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

**Testing:** Vitest only, no `@testing-library/react`. Existing tests cover `src/utils/*` pure
functions (see `src/utils/avatar.test.js`). Component behavior is validated visually through
Storybook, not through rendered unit tests. Don't introduce a testing-library dependency without
discussion.

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

### Tailwind

- Use the named color scale from `tailwind.config.js` (`bg-primary`, `text-gray-dark`,
  `border-gray-light`, etc.), never Tailwind's default numbered palette (`text-gray-600`).
- Avoid custom CSS or inline `style` props. If Tailwind can't express it, that's worth flagging,
  not routing around.
- No dark mode support.

### Hooks

- Use `useMount`/`useUnmount`/`useMemoizedFn` from `ahooks` instead of hand-rolled
  `useEffect`/`useCallback` equivalents.
- Always clean up `useEffect` side effects: event listeners, timers, tippy/nouislider instances,
  and subscriptions must be torn down on unmount.
- Do not suppress `react-hooks/exhaustive-deps`.

### Comments

Write code that speaks for itself. Comment only to explain WHY, not WHAT. See
`.claude/rules/commenting.md` for full guidelines.

### Testing

See `.claude/rules/testing.md` for full rules. New pure logic in `src/utils/` and `src/helpers/`
needs Vitest coverage; new components rely on a Storybook story existing rather than a rendered unit
test.

## Code Review

See `.claude/commands/review-pr.md` for what to block on vs. flag as non-blocking during review.
