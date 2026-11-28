import { renderToString } from "react-dom/server";
import { ErrorOverlay } from "./ErrorOverlay";

vi.mock("../helpers/environment", () => ({ isDevelopment: true }));

describe("ErrorOverlay in development", () => {
    test("renders nothing for an empty error list", () => {
        const element = <ErrorOverlay isOpen errors={[]} onClose={() => {}} />;

        expect(renderToString(element)).toBe("");
    });
});
