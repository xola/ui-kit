import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const removed = { visible: "use 'open'" };

const loadWarner = async () => {
    vi.resetModules();
    const { warnRemovedProps } = await import("./warnRemovedProps");

    return warnRemovedProps;
};

describe("warnRemovedProps", () => {
    let warn;

    beforeEach(() => {
        warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllEnvs();
    });

    test("warns once with the replacement named", async () => {
        const warnRemovedProps = await loadWarner();

        warnRemovedProps("Tooltip", { visible: true }, removed);

        expect(warn).toHaveBeenCalledTimes(1);
        expect(warn).toHaveBeenCalledWith("UI Kit Tooltip: 'visible' was removed in 3.8, use 'open'");
    });

    test("does not repeat for the same component and prop", async () => {
        const warnRemovedProps = await loadWarner();

        warnRemovedProps("Tooltip", { visible: true }, removed);
        warnRemovedProps("Tooltip", { visible: false }, removed);

        expect(warn).toHaveBeenCalledTimes(1);
    });

    test("reset allows a fresh test render to warn again", async () => {
        const warnRemovedProps = await loadWarner();
        const { resetRemovedPropWarnings } = await import("./warnRemovedProps");

        warnRemovedProps("Tooltip", { visible: true }, removed);

        expect(resetRemovedPropWarnings).toBeTypeOf("function");

        resetRemovedPropWarnings();
        warnRemovedProps("Tooltip", { visible: true }, removed);

        expect(warn).toHaveBeenCalledTimes(2);
    });

    test("warns again for a different component", async () => {
        const warnRemovedProps = await loadWarner();

        warnRemovedProps("Tooltip", { visible: true }, removed);
        warnRemovedProps("Popover", { visible: true }, removed);

        expect(warn).toHaveBeenCalledTimes(2);
    });

    test("is silent for props not in the removed map", async () => {
        const warnRemovedProps = await loadWarner();

        warnRemovedProps("Tooltip", { open: true, content: "hi" }, removed);

        expect(warn).not.toHaveBeenCalled();
    });

    test("is silent when the removed prop is undefined", async () => {
        const warnRemovedProps = await loadWarner();

        warnRemovedProps("Tooltip", { visible: undefined }, removed);

        expect(warn).not.toHaveBeenCalled();
    });

    test("never warns in production", async () => {
        vi.stubEnv("NODE_ENV", "production");
        const warnRemovedProps = await loadWarner();

        warnRemovedProps("Tooltip", { visible: true }, removed);

        expect(warn).not.toHaveBeenCalled();
    });
});
