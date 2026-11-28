import { renderToString } from "react-dom/server";
import { Label } from "./Label";

describe("Label", () => {
    test("error color wins over disabled color", () => {
        const html = renderToString(<Label isError isDisabled />);

        expect(html).toContain("text-danger");
        expect(html).not.toContain("text-gray");
    });
});
