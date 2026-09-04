# CLAUDE.md

## Overview

`@xola/ui-kit` is Xola's shared React component library. It ships Tailwind-based primitives
(Button, Form inputs, Modal, Table, DatePicker, etc.) to npm. `x2-checkout`, `x2-seller`, and other
Xola frontends consume it. Components get documentation and visual tests through Storybook, not
rendered unit tests.

React 17 + Tailwind CSS v3, built with Vite. Components are plain JavaScript/JSX;
`index.d.ts` is hand-maintained for consumers that want types.

`src/icons/` is a nested TypeScript package published separately as `@xola/icons`, with its own
`package.json`, `tsconfig.json`, and lint setup. Working in `src/icons/`: `src/icons/CLAUDE.md`.

## Commands

```sh
npm run dev         # Storybook dev server on port 6006, no manager cache
npm run build       # Production build (vite build to build/)
npm run lint        # xola-lint (ESLint) on src, auto-fix
npm test            # Jest
npm run chromatic   # Visual regression via Chromatic

npx jest src/helpers/avatar.test.js   # One test file
```

Run tests on Node 16 (`.nvmrc`), not a newer local default.

## Key Rules

### Public API

- `src/index.js` is the only barrel file. Export every component meant for consumer use from it.
- Removing or renaming an export, or changing a prop's type/behavior, breaks `x2-checkout`,
  `x2-seller`, and every other dependent app. Call this out explicitly in the PR description.

### Components

- Functional components + hooks only. `const ComponentName = (props) => { ... }`, named export.
  No `React.FC`.
- Type every public prop with `prop-types`, obvious ones included (`children`, `className`).
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

Comment only to explain WHY, not WHAT. Writing or reviewing a comment:
`.claude/rules/commenting.md`.

### Testing

Jest only, with no rendered-component testing library. Writing or changing a test, or deciding
whether a change needs one: `.claude/rules/testing.md`.

## Code Review

Reviewing a PR (what blocks a merge, what is a suggestion): `.claude/commands/review-pr.md`.
