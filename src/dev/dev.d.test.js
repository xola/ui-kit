import { getDeclaredRuntimeNames } from "../../scripts/exportTestUtils";
import * as devApi from "./index";

const declarationUrl = new URL("../../dev.d.ts", import.meta.url);
const declaredNames = new Set(getDeclaredRuntimeNames(declarationUrl));
const runtimeNames = new Set(Object.keys(devApi));

describe("dev.d.ts", () => {
    test("declares every runtime export of src/dev/index.js", () => {
        const undeclaredNames = [...runtimeNames].filter((name) => !declaredNames.has(name));

        expect(undeclaredNames).toEqual([]);
    });

    test("declares nothing that src/dev/index.js does not export", () => {
        const phantomNames = [...declaredNames].filter((name) => !runtimeNames.has(name));

        expect(phantomNames).toEqual([]);
    });
});
