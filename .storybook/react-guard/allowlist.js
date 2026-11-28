/**
 * Known React deprecation warnings, keyed by `<story file> > <expect.getState().currentTestName>`. Values are
 * substrings of the formatted console message. Each entry belongs to the task that removes it; an empty object is
 * the exit condition for 3.8.0.
 *
 * React logs each warning once per component per test file, so the entry sits on the first story that renders the
 * offending component.
 */
export const allowlist = {};
