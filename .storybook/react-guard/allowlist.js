/**
 * Known React deprecation warnings, keyed by `<story file> > <expect.getState().currentTestName>`. Values are
 * substrings of the formatted console message. Each entry belongs to the task that removes it; an empty object is
 * the exit condition for 3.8.0.
 *
 * React logs each warning once per component per test file, so the entry sits on the first story that renders the
 * offending component.
 */

/** Raised by @tippyjs/react reading `children.ref` on React 19. */
const TIPPY_ELEMENT_REF =
    "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX " +
    "Element type in a future release.";

export const allowlist = {
    // Task 12: Tippy
    "src/stories/Navigation/Sidebar.stories.jsx > Default": [TIPPY_ELEMENT_REF],
};
