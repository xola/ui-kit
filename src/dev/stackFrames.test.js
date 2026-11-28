import {
    collapseFrames,
    getCodeFrameRows,
    getErrorFrames,
    markLibraryFrames,
    parseStack,
    pickCodeFrame,
} from "./stackFrames";

const getFrame = (file, extra = {}) => ({ file, line: 1, column: 1, ...extra });
const getFrames = (libraryCount, appCount) => [
    ...Array.from({ length: libraryCount }, (_, i) => getFrame(`/node_modules/lib/${i}.js`, { isLibrary: true })),
    ...Array.from({ length: appCount }, (_, i) => getFrame(`/src/${i}.js`, { isLibrary: false })),
];

describe("parseStack", () => {
    test("parses V8 frames and keeps the port colon inside file", () => {
        const stack = "Error: x\n    at fn (http://localhost:3000/a.js:10:5)\n    at http://localhost:3000/b.js:2:7";

        expect(parseStack(stack)).toEqual([
            { method: "fn", file: "http://localhost:3000/a.js", line: 10, column: 5 },
            { method: undefined, file: "http://localhost:3000/b.js", line: 2, column: 7 },
        ]);
    });

    test("strips async and new prefixes from the method", () => {
        const [asyncFrame, newFrame] = parseStack("at async load (f.js:1:2)\nat new Foo (f.js:1:2)");

        expect(asyncFrame.method).toBe("load");
        expect(newFrame.method).toBe("Foo");
    });

    test("parses Firefox and Safari frames", () => {
        const frames = parseStack("fn@http://h/a.js:3:4\n@http://h/b.js:5:6");

        expect(frames).toHaveLength(2);
        expect(frames[0]).toEqual({ method: "fn", file: "http://h/a.js", line: 3, column: 4 });
        expect(frames[1].method).toBeUndefined();
    });

    test("returns an empty list for empty or unparseable input", () => {
        expect(parseStack("")).toEqual([]);
        expect(parseStack("garbage\n[native code]")).toEqual([]);
    });
});

describe("markLibraryFrames", () => {
    test("flags node_modules files and leaves app files false", () => {
        const [lib, app] = markLibraryFrames([getFrame("/app/node_modules/react/x.js"), getFrame("/app/src/a.js")]);

        expect(lib.isLibrary).toBe(true);
        expect(app.isLibrary).toBe(false);
    });

    test("keeps an explicit isLibrary value", () => {
        const [frame] = markLibraryFrames([getFrame("/app/node_modules/react/x.js", { isLibrary: false })]);

        expect(frame.isLibrary).toBe(false);
    });
});

describe("collapseFrames", () => {
    test("hides library frames until expanded", () => {
        const frames = getFrames(4, 3);
        const collapsed = collapseFrames(frames, false);
        const expanded = collapseFrames(frames, true);

        expect(collapsed.visible).toHaveLength(3);
        expect(collapsed.ignoredCount).toBe(4);
        expect(expanded.visible).toHaveLength(7);
        expect(expanded.ignoredCount).toBe(4);
    });

    test("shows every frame and no toggle when all frames are library", () => {
        const { visible, ignoredCount } = collapseFrames(getFrames(5, 0), false);

        expect(visible).toHaveLength(5);
        expect(ignoredCount).toBe(0);
    });

    test("reports no ignored frames when none are library", () => {
        expect(collapseFrames(getFrames(0, 3), false).ignoredCount).toBe(0);
    });
});

describe("pickCodeFrame", () => {
    const source = { startLine: 1, lines: ["a"] };

    test("prefers the first non-library frame with source", () => {
        const libraryFrame = getFrame("/node_modules/a.js", { isLibrary: true, source });
        const appFrame = getFrame("/src/a.js", { isLibrary: false, source });

        expect(pickCodeFrame([libraryFrame, appFrame])).toBe(appFrame);
    });

    test("falls back to the first library frame with source", () => {
        const first = getFrame("/node_modules/a.js", { isLibrary: true, source });
        const second = getFrame("/node_modules/b.js", { isLibrary: true, source });

        expect(pickCodeFrame([getFrame("/src/x.js", { isLibrary: false }), first, second])).toBe(first);
    });

    test("returns undefined when no frame has source", () => {
        expect(pickCodeFrame([getFrame("/src/x.js")])).toBeUndefined();
    });
});

describe("getCodeFrameRows", () => {
    const source = { startLine: 8, lines: ["a", "b", "c"] };

    test("numbers rows from startLine and marks the error row", () => {
        const result = getCodeFrameRows(getFrame("/src/a.js", { line: 9, column: 4, source }));

        expect(result.rows.map(({ number }) => number)).toEqual([8, 9, 10]);
        expect(result.rows.filter(({ isError }) => isError).map(({ number }) => number)).toEqual([9]);
        expect(result.caretColumn).toBe(4);
    });

    test("returns undefined when line is outside the source range", () => {
        expect(getCodeFrameRows(getFrame("/src/a.js", { line: 20, source }))).toBeUndefined();
    });

    test("returns undefined without source", () => {
        expect(getCodeFrameRows(getFrame("/src/a.js"))).toBeUndefined();
    });
});

describe("getErrorFrames", () => {
    const stack = "Error: x\n    at fn (/src/a.js:1:2)";

    test("prefers non-empty frames over the stack", () => {
        const frames = [getFrame("/src/given.js")];

        expect(getErrorFrames({ frames, stack })).toBe(frames);
    });

    test("parses the stack when frames is empty", () => {
        expect(getErrorFrames({ frames: [], stack })).toEqual([
            { method: "fn", file: "/src/a.js", line: 1, column: 2 },
        ]);
    });

    test("parses the stack when frames is absent", () => {
        expect(getErrorFrames({ stack })).toHaveLength(1);
    });

    test("returns an empty list without frames or stack", () => {
        expect(getErrorFrames({})).toEqual([]);
    });
});
