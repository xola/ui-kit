import { renderToString } from "react-dom/server";
import { Key } from "./Key";

describe("Key", () => {
    test("maps a named key to its glyph and gives a single character the square width", () => {
        const html = renderToString(<Key char="up" />);

        expect(html).toContain("↑");
        expect(html).toContain("w-5");
    });

    test("renders an unmapped multi-character key as given, without the square width", () => {
        const html = renderToString(<Key char="enter" />);

        expect(html).toContain(">enter<");
        expect(html).not.toContain("w-5");
    });
});
