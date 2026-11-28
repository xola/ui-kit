import { renderToString } from "react-dom/server";
import { Header } from "./ErrorOverlayParts";

describe("ErrorOverlay parts", () => {
    test("throw a named error when rendered outside ErrorOverlay", () => {
        expect(() => renderToString(<Header />)).toThrow("ErrorOverlay parts must render inside <ErrorOverlay>");
    });
});
