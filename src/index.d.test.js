import { readFileSync } from "node:fs";
import * as publicApi from "./index";

const DECLARATION = /^export declare (?:const|function) (\w+)/gm;
const declaredNames = new Set(
    [...readFileSync(new URL("../index.d.ts", import.meta.url), "utf8").matchAll(DECLARATION)].map(([, name]) => name),
);

const runtimeNames = new Set(Object.keys(publicApi));

describe("index.d.ts", () => {
    test("declares every runtime export of src/index.js", () => {
        const undeclaredNames = Object.keys(publicApi).filter((name) => !declaredNames.has(name));

        expect(undeclaredNames).toEqual([]);
    });

    test("declares nothing that src/index.js does not export", () => {
        const phantomNames = [...declaredNames].filter((name) => !runtimeNames.has(name));

        expect(phantomNames).toEqual([]);
    });
});
