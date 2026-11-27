import { version } from "react";
import { spyOn } from "storybook/test";
import { afterEach, beforeAll, beforeEach } from "vitest";
import { resetRemovedPropWarnings } from "../../src/helpers/warnRemovedProps";
import { allowlist } from "./allowlist.js";
import { findDeprecations, formatConsoleArgs } from "./reactDeprecations.js";

const spies = [];

/**
 * `npm i --no-save` leaves package-lock.json untouched, so Vite's prebundle hash stays the same after a React swap
 * and node_modules/.cache/storybook keeps serving the previous React.
 */
beforeAll(() => {
    const expectedMajor = import.meta.env.VITE_REACT_MAJOR ?? "18";
    const isExpectedMajor = version.startsWith(expectedMajor);
    if (!isExpectedMajor) {
        throw new Error(`Stale React in Storybook cache: expected ${expectedMajor}, got ${version}`);
    }
});

beforeEach(() => {
    resetRemovedPropWarnings();
    spies.push(spyOn(console, "error"), spyOn(console, "warn"));
});

/**
 * Reads the test name from the context `expect`: in browser mode the `expect` this file imports from "vitest" is a
 * separate instance whose `currentTestName` stays undefined. Storybook names tests by story only ("Default"), so the
 * file path keeps keys unique.
 */
afterEach(({ expect, task }) => {
    const messages = spies.flatMap((spy) => spy.mock.calls.map(formatConsoleArgs));
    spies.forEach((spy) => spy.mockRestore());
    spies.length = 0;

    const { currentTestName } = expect.getState();
    const testKey = `${task.file.name} > ${currentTestName}`;
    const deprecations = findDeprecations(messages, allowlist[testKey] ?? []);
    const hasDeprecations = deprecations.length > 0;
    if (hasDeprecations) {
        const list = deprecations.map((message) => `- ${message}`).join("\n");
        throw new Error(`React deprecation warnings in "${testKey}":\n${list}`);
    }
});
