import React from "react";
import { renderToString } from "react-dom/server";

vi.mock("../helpers/environment", () => ({ isDevelopment: false }));

const WARNING =
    "ErrorOverlay is a development tool and renders nothing when NODE_ENV is production. Gate the import with import.meta.env.DEV.";

describe("ErrorOverlay production guard", () => {
    test("renders nothing and warns exactly once", async () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const { ErrorOverlay } = await import("./ErrorOverlay");
        const element = (
            <ErrorOverlay isOpen errors={[{ id: "a", name: "Error", message: "x", count: 1 }]} onClose={() => {}} />
        );

        expect(renderToString(element)).toBe("");
        expect(renderToString(element)).toBe("");
        expect(warn).toHaveBeenCalledTimes(1);
        expect(warn).toHaveBeenCalledWith(WARNING);

        warn.mockRestore();
    });
});
