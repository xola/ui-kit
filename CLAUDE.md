# CLAUDE.md

## Overview

`@xola/ui-kit` is Xola's shared React component library. It ships Tailwind-based primitives
(Button, Form inputs, Modal, Table, DatePicker, etc.) to npm. `x2-checkout`, `x2-seller`, and other
Xola frontends consume it. Components get documentation and visual tests through Storybook, not
rendered unit tests.

React 17 + Tailwind CSS v3, built with Vite. Plain JavaScript/JSX, no TypeScript.
`index.d.ts` is hand-maintained for consumers that want types.

## Commands

```sh
npm run dev              # Storybook dev server, no manager cache
npm run storybook        # Storybook dev server on port 6006
npm run build             # Production build (vite build to build/)
npm run build:storybook   # Static Storybook build
npm run lint               # xola-lint (ESLint) on src, auto-fix
npm run format            # Prettier --write on src
npm test                  # Run all tests (Jest)
npm run chromatic         # Visual regression via Chromatic
```

Run a single test file:

```sh
npx jest src/helpers/avatar.test.js
```

Test on Node 16 (`.nvmrc` / `.node-version`, matches `engines.node` in `package.json`). Recent
fixes restored Node 16 compat; don't regress it by testing only on a newer local Node.

## Key Rules

### Public API

- `src/index.js` is the only barrel file. Export every component meant for consumer use from it.
- Removing or renaming an export, or changing a prop's type/behavior, breaks `x2-checkout`,
  `x2-seller`, and every other dependent app. Call this out explicitly in the PR description.

### Components

- Functional components + hooks only. `const ComponentName = (props) => { ... }`, named export.
  No `React.FC`.
- Type every public prop with `prop-types`, including `children`/`className` pass-through props.
  Don't skip a prop's `propTypes` entry because its type looks obvious.
- Destructure props in the function signature, not `props.x` access.
- Use `clsx` for conditional `className`, not template literals or string concatenation.
- Max 6 levels of JSX indentation.

### Tailwind

- Use the named color scale from `tailwind.config.js` (`bg-primary`, `text-gray-dark`,
  `border-gray-light`). Never use Tailwind's default numbered palette (`text-gray-600`).
- Avoid custom CSS or inline `style` props. If Tailwind can't express something, flag it, don't
  route around it.
- No dark mode support.

### Hooks

- Use `useMount`/`useUnmount`/`useMemoizedFn` from `ahooks` instead of hand-rolled
  `useEffect`/`useCallback` equivalents.
- Clean up every `useEffect` side effect: event listeners, timers, tippy/nouislider instances,
  subscriptions. Tear down on unmount.
- Do not suppress `react-hooks/exhaustive-deps`.

### Comments

Comment only to explain WHY, not WHAT. Full rules: `.claude/rules/commenting.md`.

### Testing

No `@testing-library/react` in this repo. Don't add it without discussion; component behavior is
validated visually through Storybook + Chromatic. Full rules: `.claude/rules/testing.md`.

## Code Review

See `.claude/commands/review-pr.md` for what blocks a merge vs. what's a non-blocking suggestion.
