> ⚠️ **Copilot Instructions File:**
> This file is **ONLY** for Copilot Pull Request review.
> Not for general documentation, onboarding, or other automation.

## Copilot Pull Request Review Guide

### Tech Stack

-   React v18
-   TypeScript v5.7
-   Tailwind CSS v3.4

### General Guidelines

-   Apply [general coding guidelines](./instructions/general-coding.instructions.md) to all code.
-   Refer to [immutable data](./instructions/general-coding.instructions.md#immutable-data) for using `const`, `readonly`.
-   Use `useMount` from `ahooks` instead of `useEffect([])`.
-   Use `useModal` for modal state.
-   Highlight browser compatibility or performance issues with solutions.
-   Review the code for memory leaks and GC issues, especially when hooks are involved. Check for missing cleanup in `useEffect` (event listeners, timers, subscriptions), unclosed intervals/timeouts, and circular references in dependencies.
-   Check for missing/incorrect TypeScript types.
-   Ensure Tailwind classes follow best practices.
-   Flag custom CSS that can be replaced by Tailwind.
-   Validate component/file organization for clarity.
-   Do not use `props: any`; destructure and type all props.
-   Highlight any `useEffect` usage which has an `if` condition with multiple conditions and if those conditions can be extracted outside the effect to simplify the effect's dependencies
-   Disallow functions that are declared in a scope which captures less than 3 variables from the outer scope. This rule can be skipped if the method is outside a React component

### High Confidence Rules

3. Follow React hooks rules strictly.
4. Do not use React.FC type; always create a props interface.
7. Do not suppress `react-hooks/exhaustive-deps` ESLint rule.
8. Tag `@rushi` in PR if any `.github` files are changed.
9. Tag `@rushi` if any ESLint configuration is changed
10. Do not allow more than 5 levels of indenting in a React component's JSX.
11. Minimize the use of `useEffect` and `useState`; favor derived state and memoization when possible.

### Other Review Points

-   Confirm React Hooks are used correctly and avoid anti-patterns.
-   Validate Tailwind usage and avoid deprecated patterns.
-   Reference this file and line number in review comments if you use any of these instructions (add at end of comment, two blank lines above).
-   Only summarize the pull request the first time Copilot is invoked. Every subsequent review should only summarize the changes since the last review
-   Do not give feedback on accessability
