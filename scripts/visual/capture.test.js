import path from "node:path";
import * as visualCapture from "./capture.js";

const { getOptions } = visualCapture;

describe("visual capture options", () => {
    test("defaults to the local static build", () => {
        const options = getOptions(["--out", ".visual/current"]);

        expect(options.mode).toBe("static");
        expect(options.staticDir).toBe(path.resolve("storybook-static"));
        expect(options.baseUrl).toBeUndefined();
        expect(options.map).toEqual({});
    });

    test("--url selects remote iframe capture", () => {
        const options = getOptions(["--out", ".visual/baseline", "--url", "https://ui.xola.io"]);

        expect(options.mode).toBe("remote");
        expect(options.baseUrl).toBe("https://ui.xola.io");
        expect(options.staticDir).toBeUndefined();
    });

    test("--static and --url together are rejected", () => {
        const argv = ["--out", ".visual/current", "--static", "storybook-static", "--url", "https://ui.xola.io"];

        expect(() => getOptions(argv)).toThrow("--static and --url are mutually exclusive");
    });

    test.each(["src", ".visual/../src", ".visual", "."])("--out %s is rejected before capture", (out) => {
        expect(() => getOptions(["--out", out])).toThrow("--out must be a dedicated subdirectory of");
    });

    test("--map reads a production-id to current-id JSON object", () => {
        const map = '{"forms-button--primary": "forms-button--overview"}';
        const options = getOptions(["--out", ".visual/baseline", "--url", "https://ui.xola.io", "--map", map]);

        expect(options.map).toEqual({ "forms-button--primary": "forms-button--overview" });
    });

    test("--map rejects empty target ids", () => {
        const map = '{"forms-button--primary": ""}';
        const options = ["--out", ".visual/baseline", "--url", "https://ui.xola.io", "--map", map];

        expect(() => getOptions(options)).toThrow("--map target ids must not be empty");
    });

    test("--map rejects duplicate target ids", () => {
        const map = '{"source--one": "target--same", "source--two": "target--same"}';
        const options = ["--out", ".visual/baseline", "--url", "https://ui.xola.io", "--map", map];

        expect(() => getOptions(options)).toThrow("--map target ids must be unique");
    });

    test("mapped output ids cannot collide with unmapped source ids", () => {
        const storyIds = ["source--old", "source--current"];
        const map = { "source--old": "source--current" };

        expect(() => visualCapture.getOutputIds(storyIds, map)).toThrow(
            "--map target ids collide with unmapped source ids: source--current",
        );
    });

    test("mobile stories capture at the required phone viewport", () => {
        expect(visualCapture.getViewport("overlay-bottomsheet--mobile")).toEqual({ width: 375, height: 812 });
        expect(visualCapture.getViewport("overlay-bottomsheet--default")).toEqual({ width: 1280, height: 800 });
    });

    test("preview readiness supports Storybook versions without ready", () => {
        vi.stubGlobal("window", { __STORYBOOK_PREVIEW__: {} });

        expect(() => visualCapture.readyPreview()).not.toThrow();
        vi.unstubAllGlobals();
    });

    test("legacy previews settle on storyRendered", async () => {
        const listeners = {};
        const channel = {
            on: (event, listener) => {
                listeners[event] = listener;
            },
            off: vi.fn(),
            emit: () => listeners.storyRendered("overlay-modal--default"),
        };
        vi.stubGlobal("window", { __STORYBOOK_ADDONS_CHANNEL__: channel, __STORYBOOK_PREVIEW__: {} });

        const result = visualCapture.renderStoryInPage({ storyId: "overlay-modal--default", timeoutMs: 10 });

        await expect(result).resolves.toEqual([]);
        vi.unstubAllGlobals();
    });
});
