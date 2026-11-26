---
paths:
    - "**/*.test.js"
    - "**/*.test.jsx"
    - "src/stories/**"
---

# Testing

`vitest.config.js` has two projects. Pick by what changed:

- **Pure logic** (`src/utils/`, `src/helpers/`, `src/hooks/`, `scripts/`): a `unit` test.
- **Component behavior**: a Storybook `play` test in the `storybook` project.

Every behavior change starts red: write the test, watch it fail for the reason you expect, then fix.

## Unit tests

- Name the file after its source and keep it beside it: `avatar.js` → `avatar.test.js`.
- Cover the happy path plus empty, `null`/`undefined` and boundary inputs.
- Date-dependent logic: build dates from `Date.now()` or `vi.setSystemTime`, never a fixed literal.
- Run dependencies for real (`dayjs`, `clsx`); assert the helper's own contract.

## Story play tests

Stories in `src/stories/<section>/` are the component test layer. Write the play function with
`storybook/test` (`expect`, `userEvent`, `within`, `waitFor`, `fn`). Rendering components in a unit
test needs `@testing-library/react`, which the repo leaves out by choice: ask before adding it.

- Green on both React legs: `npm run test:storybook`, then `npm run react:19`,
  `VITE_REACT_MAJOR=19 npm run test:storybook`, and `npm run react:18` to restore. CI runs both.
- `.storybook/react-guard/` fails any story that logs a React deprecation warning. Fix the warning;
  `allowlist.js` stays `{}`.
- Overlays portal to `document.body`: query `within(document.body)`, find a tooltip with
  `getByRole("tooltip")`, and wrap "is gone" checks in `waitFor` (content fades out over 250ms).
- Stacking and clipping: assert what is painted with `document.elementFromPoint` at a measured rect,
  as `src/stories/Overlay/OverlayCombinations.stories.jsx` does.
- Keyboard versus mouse focus (`:focus-visible`): drive it with `getRealUserEvent()` from
  `src/stories/realInput.js`. testing-library's `userEvent` cannot tell the two apart.
- Assert behavior, ARIA roles and callbacks. Tailwind class strings are styling, not behavior.
- Wait on conditions with `waitFor`. A fixed wait belongs only to a test that pins a timer window
  (open delay, close delay, fade); name the window in the test.
