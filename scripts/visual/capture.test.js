import path from "node:path";
import { getOptions } from "./capture.js";

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

    test("--map reads a production-id to current-id JSON object", () => {
        const map = '{"forms-button--primary": "forms-button--overview"}';
        const options = getOptions(["--out", ".visual/baseline", "--url", "https://ui.xola.io", "--map", map]);

        expect(options.map).toEqual({ "forms-button--primary": "forms-button--overview" });
    });
});
