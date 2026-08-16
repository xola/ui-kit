---
paths:
  - "**/*.test.js"
  - "**/*.test.jsx"
---

# Testing Guidelines

## General Rules

- All tests use Jest. There is no `@testing-library/react` dependency in this repo — don't add one
  without discussion; component behavior is validated visually via Storybook + Chromatic, not
  rendered unit tests.
- Test files match their source filename and live next to it: `avatar.js` → `avatar.test.js` in
  the same directory.
- Cover pure logic in `src/helpers/` and `src/hooks/` — anything that transforms data or has
  branching behavior independent of rendering.
- Do not hard-code dates; if a helper is date-dependent, generate dynamic dates relative to
  `Date.now()` rather than a fixed literal.
- Test both the happy path and edge/failure cases (empty input, `null`/`undefined`, boundary
  values).

```js
describe("getInitials", () => {
    test("should get initials from name", () => {
        expect(getInitials("Nemanja Krstić")).toBe("NK");
        expect(getInitials("")).toBe("N/A");
    });
});
```

## What Doesn't Need a Jest Test

- New or changed components — add/update a Storybook story under `src/stories/` instead so the
  behavior is visible and covered by Chromatic visual regression.
- Tailwind class name assertions — never test for the presence of a specific class string.

## Scope

- Don't mock third-party libraries (`dayjs`, `clsx`, `downshift`) to test trivial pass-through
  logic — test the actual behavior of your helper, not the library underneath it.
- Keep helper tests focused on one function's contract; don't reach into unrelated modules to set
  up a test.
