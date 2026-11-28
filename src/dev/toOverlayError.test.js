import { toOverlayError } from "./toOverlayError";

describe("toOverlayError", () => {
    test("keeps name, message and stack of an Error", () => {
        const error = new TypeError("bad");

        expect(toOverlayError(error)).toEqual({ name: "TypeError", message: "bad", stack: error.stack });
    });

    test("wraps a string as an Error message", () => {
        expect(toOverlayError("boom")).toEqual({ name: "Error", message: "boom" });
    });

    test("serializes a plain object as JSON", () => {
        expect(toOverlayError({ code: 7 })).toEqual({ name: "Error", message: '{"code":7}' });
    });

    test("falls back to String for a circular object without throwing", () => {
        const circular = {};
        circular.self = circular;

        expect(toOverlayError(circular)).toEqual({ name: "Error", message: "[object Object]" });
    });

    test("stringifies undefined", () => {
        expect(toOverlayError(undefined)).toEqual({ name: "Error", message: "undefined" });
    });
});
