import { renderToString } from "react-dom/server";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
    test("renders without an undefined class for an unknown size and color", () => {
        const html = renderToString(<Spinner size="huge" color="nope" />);

        expect(html).toContain("ui-spinner");
        expect(html).not.toContain("undefined");
    });

    test("adds no color class for color current", () => {
        const html = renderToString(<Spinner color="current" />);

        expect(html).not.toContain("null");
        expect(html).not.toContain("text-secondary");
    });
});
