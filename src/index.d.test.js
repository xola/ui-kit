import { readFileSync } from "node:fs";
import * as publicApi from "./index";

const DECLARATION = /^export declare (?:const|function) (\w+)/gm;
const declaredNames = new Set(
    [...readFileSync(new URL("../index.d.ts", import.meta.url), "utf8").matchAll(DECLARATION)].map(([, name]) => name),
);

describe("index.d.ts", () => {
    test("declares every runtime export of src/index.js", () => {
        const undeclaredNames = Object.keys(publicApi).filter((name) => !declaredNames.has(name));

        expect(undeclaredNames).toEqual([]);
    });
});
