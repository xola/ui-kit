import { readFileSync } from "node:fs";
import { getDeclaredRuntimeNames, getDeclaredTypeNames, getExportedNames, getExportedTypeNames } from "../scripts/exportTestUtils";
import * as publicApi from "./index";
import * as icons from "./icons/index";

const declarationUrl = new URL("../index.d.ts", import.meta.url);
const declarationSource = readFileSync(declarationUrl, "utf8");
const ICON_TYPE_REEXPORT = /^export type \{[^}]+\} from ["'][^"']*icons[^"']*["'];?$/gm;
// index.d.ts declares some exports in place and re-exports the rest from the build bundle.
const declaredNames = new Set([...getDeclaredRuntimeNames(declarationUrl), ...getExportedNames(declarationUrl)]);
const declaredTypeNames = new Set(getDeclaredTypeNames(declarationUrl));
const iconTypeNames = new Set(getExportedTypeNames(new URL("./icons/index.ts", import.meta.url)));

const runtimeNames = new Set(Object.keys(publicApi));

describe("index.d.ts", () => {
    test("does not re-export icons owned by @xola/icons", () => {
        const reexportedIcons = Object.keys(icons).filter((name) => runtimeNames.has(name));

        expect(reexportedIcons).toEqual([]);
    });

    test("does not export icon types owned by @xola/icons", () => {
        const reexportedTypes = [...iconTypeNames].filter((name) => declaredTypeNames.has(name));
        const iconTypeReexports = declarationSource.match(ICON_TYPE_REEXPORT) ?? [];

        expect([...reexportedTypes, ...iconTypeReexports]).toEqual([]);
    });

    test("declares every runtime export of src/index.js", () => {
        const undeclaredNames = Object.keys(publicApi).filter((name) => !declaredNames.has(name));

        expect(undeclaredNames).toEqual([]);
    });

    test("declares nothing that src/index.js does not export", () => {
        const phantomNames = [...declaredNames].filter((name) => !runtimeNames.has(name));

        expect(phantomNames).toEqual([]);
    });
});
