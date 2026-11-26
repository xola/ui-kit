/**
 * Trusted input for stories that depend on `:focus-visible`. testing-library's user-event dispatches untrusted events and
 * moves focus with `focus()`, which Chromium treats as script focus: it matches `:focus-visible` until the first real
 * mouse press in the document and never after it. Only Playwright's real mouse and keyboard, through Vitest browser
 * mode, tell keyboard focus apart from focus a dialog restores after a click.
 *
 * @returns {Promise<object|undefined>} Vitest's `userEvent`, or undefined in the Storybook UI, which has no trusted input
 */
export const getRealUserEvent = async () => {
    if (!globalThis.__vitest_browser__) {
        return undefined;
    }

    const { userEvent } = await import("@vitest/browser/context");

    return userEvent;
};

/**
 * Story `beforeEach` cleanup for stories that press the real mouse. A real key press makes script focus match
 * `:focus-visible` again, so the next story's `userEvent.tab()` still counts as keyboard focus.
 */
export const restoreKeyboardFocusVisible = async () => {
    const userEvent = await getRealUserEvent();

    await userEvent?.keyboard("{Shift}");
};
