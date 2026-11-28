import { errorOverlayReducer, getErrorId } from "./errorOverlayState";

const initialState = { errors: [], activeIndex: 0 };
const getError = (message) => ({ name: "Error", message });
const run = (actions, state = initialState) => actions.reduce(errorOverlayReducer, state);
const push = (error, extras) => ({ type: "push", error, extras });
const getState = (messages, activeIndex) => ({
    errors: messages.map((message) => ({ ...getError(message), id: `Error|${message}|`, count: 1 })),
    activeIndex,
});

describe("getErrorId", () => {
    test("uses the first frame of frames", () => {
        const frames = [{ file: "/src/a.js", line: 1, column: 2 }];

        expect(getErrorId({ ...getError("a"), frames })).toBe("Error|a|/src/a.js:1:2");
    });

    test("falls back to the first frame parsed from stack", () => {
        expect(getErrorId({ ...getError("a"), stack: "Error: a\n    at fn (/src/b.js:3:4)" })).toBe(
            "Error|a|/src/b.js:3:4",
        );
    });

    test("uses the parsed stack when frames is empty", () => {
        const stack = "Error: a\n    at fn (/src/b.js:3:4)";

        expect(getErrorId({ ...getError("a"), frames: [], stack })).toBe("Error|a|/src/b.js:3:4");
    });

    test("has an empty tail without frames or a parseable stack", () => {
        expect(getErrorId(getError("a"))).toBe("Error|a|");
    });
});

describe("errorOverlayReducer push", () => {
    test("counts repeats of the same error", () => {
        const { errors } = run([push(getError("a")), push(getError("a")), push(getError("a"))]);

        expect(errors).toHaveLength(1);
        expect(errors[0].count).toBe(3);
    });

    test("keeps first-seen order and counts per error", () => {
        const { errors } = run([push(getError("E")), push(getError("F")), push(getError("E"))]);

        expect(errors.map(({ message, count }) => [message, count])).toEqual([
            ["E", 2],
            ["F", 1],
        ]);
    });

    test("collapses 1000 identical pushes into one entry", () => {
        const { errors } = run(Array.from({ length: 1000 }, () => push(getError("loop"))));

        expect(errors).toHaveLength(1);
        expect(errors[0].count).toBe(1000);
    });

    test("stores extras on a new entry", () => {
        const { errors } = run([push(getError("a"), { componentStack: "in App" })]);

        expect(errors[0].componentStack).toBe("in App");
    });

    test("never moves activeIndex", () => {
        const { activeIndex } = run([push(getError("c"))], getState(["a", "b"], 1));

        expect(activeIndex).toBe(1);
    });
});

describe("errorOverlayReducer dismiss", () => {
    test("clamps activeIndex when the last error is dismissed", () => {
        const state = run([{ type: "dismiss", index: 2 }], getState(["a", "b", "c"], 2));

        expect(state.errors.map(({ message }) => message)).toEqual(["a", "b"]);
        expect(state.activeIndex).toBe(1);
    });

    test("keeps activeIndex 0 when the first error is dismissed at index 0", () => {
        expect(run([{ type: "dismiss", index: 0 }], getState(["a", "b"], 0)).activeIndex).toBe(0);
    });

    test("empties the list and resets activeIndex when the only error is dismissed", () => {
        expect(run([{ type: "dismiss", index: 0 }], getState(["a"], 0))).toEqual(initialState);
    });

    test("clamps activeIndex when a middle error is dismissed past the end", () => {
        expect(run([{ type: "dismiss", index: 0 }], getState(["a", "b"], 1)).activeIndex).toBe(0);
    });
});

describe("errorOverlayReducer setActive and clear", () => {
    test("clamps setActive into range", () => {
        const state = getState(["a", "b", "c"], 0);

        expect(run([{ type: "setActive", index: 9 }], state).activeIndex).toBe(2);
        expect(run([{ type: "setActive", index: -3 }], state).activeIndex).toBe(0);
    });

    test("sets activeIndex 0 when empty", () => {
        expect(run([{ type: "setActive", index: 4 }]).activeIndex).toBe(0);
    });

    test("clear resets the state", () => {
        expect(run([{ type: "clear" }], getState(["a", "b"], 1))).toEqual(initialState);
    });
});
