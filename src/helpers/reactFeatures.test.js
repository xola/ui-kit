import { afterEach, describe, expect, it, vi } from "vitest";

/** vitest throws on a key missing from a mock factory, so "lacking" is an explicit undefined export. */
const loadWithReactDom = async (reactDomMock) => {
    vi.resetModules();
    vi.doMock("react-dom", () => reactDomMock);
    return import("./reactFeatures");
};

describe("reactFeatures", () => {
    afterEach(() => {
        vi.doUnmock("react-dom");
        vi.resetModules();
    });

    it("uses react-dom useFormStatus when it exists", async () => {
        const fakeHook = () => ({ pending: true });
        const { hasFormStatus, useFormStatusSafe } = await loadWithReactDom({ useFormStatus: fakeHook });

        expect(hasFormStatus).toBe(true);
        expect(useFormStatusSafe).toBe(fakeHook);
    });

    it("falls back to a never-pending hook when useFormStatus is missing", async () => {
        const { hasFormStatus, useFormStatusSafe } = await loadWithReactDom({ useFormStatus: undefined });

        expect(hasFormStatus).toBe(false);
        expect(useFormStatusSafe()).toEqual({ pending: false });
    });
});
