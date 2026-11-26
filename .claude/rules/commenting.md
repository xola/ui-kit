---
paths:
    - "src/**"
    - "scripts/**"
    - ".storybook/**"
---

# Comments

Code carries the what; a comment carries the WHY a reader cannot recover from the code. Before
writing one, try a clearer name or an extracted function.

A WHY comment earns its place for:

- A third-party quirk being worked around: name the library and the behavior (Radix, Headless UI,
  `react-day-picker`, `downshift`).
- An invariant a future edit could break.
- A value chosen to match a design spec or another library's default.
- The invalid state a custom `prop-types` validator guards against.
- A non-obvious hook dependency or memoization trade-off.

```jsx
// react-day-picker fires onDayClick for disabled days too
if (modifiers.disabled) {
    return;
}
```

Form:

- State what is true now. History, ticket keys, "added for", caller lists, commented-out code and
  divider banners live in git and the PR description: delete them on sight.
- Three or more lines use `/** */`. Exported helpers shared across components get JSDoc with
  `@param` and `@returns`.
- Work-in-progress notes start with `TODO`, `FIXME`, `HACK` (say when to remove it), `NOTE` or `PERF`.
- No em-dashes.
