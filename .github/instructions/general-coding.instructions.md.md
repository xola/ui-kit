---
applyTo: "**/*.ts,**/*.tsx,**/*.jsx"
---

Assume this is an app based on **React v17, Typescript v4.7, Tailwind CSS v3**. Always provide code examples in TypeScript.

Answer all questions in the style of a friendly colleague, using informal language. Minimize explanations but provide enough context to understand the code

Answer all questions in less than 1000 characters, and words of no more than 12 characters.

## TypeScript Guidelines

-   Use camelCase for variables; prefer arrow functions.
-   Always use TypeScript, not plain JS.
-   Favor functional programming and type safety.
-   Use `interface` for data structures, props, and state (use `type` only if very short).
-   Prefer immutable data (`const`, `readonly`).
-   Use optional chaining (`?.`) and nullish coalescing (`??`).
-   Use guard statements for readability.
-   Use `lodash` for utility functions if shorter.
-   Use relative imports.

## React Guidelines

-   Use functional components and hooks.
-   No React.FC; always define a props interface.
-   Keep components small and focused.
-   Minimize the use of `useEffect` and `useState`; favor derived state and memoization when possible.
-   Avoid effects unless needed; use `useMount` from `ahooks` instead of `useEffect([])`.
-   Use `useMemo` and `useCallback` for performance, but avoid premature optimization.
-   Functions returning JSX must be components.
-   Follow the pattern: `const ComponentName = ({ prop1 }: Props) => { ... }`.
-   Highlight browser compatibility or performance issues with solutions.
-   Never indent JSX >5 levels.

## Style Guidelines

-   Use Tailwind v3 for styling.
-   Avoid custom CSS and inline styles.
-   No dark mode support needed.

## Linting & Formatting

-   Run `npm run lint` for ESLint.
-   Use Prettier: `npm run format`.

## Naming & Patterns

-   Prefix event handlers with 'handle' (e.g., `handleClick`).
-   Prefix booleans with verbs (`isLoading`, `hasError`).
-   Prefix custom hooks with 'use' (`useAuth`).
-   Favor named exports.
-   Avoid `any`/`unknown` for props and function arguments.
-   Use `React.memo` for memoization.
-   Use `useCallback` for functions passed as props.
-   Use `useMemo` for expensive computations.
-   Avoid inline function definitions in JSX/render.
-   Use short-circuit and ternary for conditional rendering.
-   Lift state up to share between components.
-   Use context for intermediate state sharing.
-   Use early returns for errors; avoid deep nesting.
-   Place happy path last in functions.
-   Avoid unnecessary else statements; use if-return.
-   Use guard clauses for preconditions/invalid states.
