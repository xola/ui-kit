import React from "react";
import { expect, fn, spyOn, waitFor, within } from "storybook/test";
import { ErrorOverlay } from "../../dev/ErrorOverlay";
import { getPortalCanvas } from "../helpers";

const ErrorOverlayStories = {
    title: "Overlay/ErrorOverlay",
    parameters: {
        docs: {
            description: {
                component:
                    "Development-only error panel from `@xola/ui-kit/dev`. It renders what the app captured and resolved: message, call stack, code frame and component stack. Gate the import with `import.meta.env.DEV`.",
            },
        },
    },
};

const getFrame = (file, line, extra) => ({ file, line, column: 5, method: `fn${line}`, ...extra });
const getLibraryFrame = (line) => getFrame(`/app/node_modules/react-dom/cjs/react-dom.js`, line, { isLibrary: true });

const SOURCE = {
    startLine: 8,
    lines: ["const total = cart.items", "    .map((item) => item.price)", "    .reduce(sum);"],
};

/** Three app frames and four library frames. */
const FRAMES = [
    getFrame("/src/Checkout.jsx", 9, { source: SOURCE }),
    getLibraryFrame(101),
    getLibraryFrame(102),
    getFrame("/src/App.jsx", 22),
    getLibraryFrame(103),
    getLibraryFrame(104),
    getFrame("/src/main.jsx", 5),
];

const ERRORS = [
    {
        id: "a",
        name: "TypeError",
        message: "Cannot read properties of undefined (reading 'id')",
        frames: FRAMES,
        componentStack: "    at Checkout\n    at App",
        count: 1,
    },
    {
        id: "b",
        name: "Error",
        message: "Second failure",
        stack: "Error: Second failure\n    at x (/src/b.js:1:1)",
        count: 2,
    },
    { id: "c", name: "RangeError", message: "Third failure", count: 1 },
];

/** Each story needs its own function: `args` and `play` are assigned onto it, so a shared one makes every story the last. */
const createStory = () => (args) => <ErrorOverlay {...args} />;

const findDialog = (canvasElement) => getPortalCanvas(canvasElement).findByRole("dialog");

const stubClipboard = (writeText) => {
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
};

const restoreClipboard = () => Reflect.deleteProperty(navigator, "clipboard");

export const Default = createStory();
Default.args = { isOpen: true, errors: ERRORS, onClose: fn() };
Default.play = async ({ canvasElement, userEvent }) => {
    const dialog = within(await findDialog(canvasElement));

    expect(dialog.getByText(/Cannot read properties of undefined/)).toBeInTheDocument();
    expect(dialog.getByText("1 / 3")).toBeInTheDocument();
    expect(dialog.getByRole("region", { name: "Code frame" })).toBeInTheDocument();
    expect(dialog.getByLabelText("Component stack")).toBeInTheDocument();
    expect(within(dialog.getByRole("list")).getAllByRole("listitem")).toHaveLength(3);

    await userEvent.click(dialog.getByRole("button", { name: "Show 4 ignored frames" }));

    expect(within(dialog.getByRole("list")).getAllByRole("listitem")).toHaveLength(7);
    expect(dialog.getByRole("button", { name: "Hide 4 ignored frames" })).toBeInTheDocument();
};

export const Pagination = createStory();
Pagination.args = { isOpen: true, errors: ERRORS, onClose: fn() };
Pagination.play = async ({ canvasElement, userEvent }) => {
    const dialog = within(await findDialog(canvasElement));

    expect(dialog.getByRole("button", { name: "Previous error" })).toBeDisabled();

    await userEvent.keyboard("{ArrowRight}");
    expect(dialog.getByText("2 / 3")).toBeInTheDocument();
    expect(dialog.getByText("x2")).toBeInTheDocument();

    await userEvent.keyboard("{ArrowRight}");
    expect(dialog.getByText("3 / 3")).toBeInTheDocument();

    await userEvent.keyboard("{ArrowRight}");
    expect(dialog.getByText("3 / 3")).toBeInTheDocument();
    expect(dialog.getByRole("button", { name: "Next error" })).toBeDisabled();

    await userEvent.click(dialog.getByRole("button", { name: "Previous error" }));
    expect(dialog.getByText("2 / 3")).toBeInTheDocument();
};

export const OpenInEditor = createStory();
OpenInEditor.args = { isOpen: true, errors: ERRORS, onClose: fn(), onOpenInEditor: fn() };
OpenInEditor.play = async ({ args, canvasElement, userEvent }) => {
    const dialog = within(await findDialog(canvasElement));

    await userEvent.click(dialog.getByRole("button", { name: "Open /src/App.jsx:22" }));

    expect(args.onOpenInEditor).toHaveBeenCalledTimes(1);
    expect(args.onOpenInEditor).toHaveBeenCalledWith(expect.objectContaining({ file: "/src/App.jsx", line: 22 }));
};

export const Copy = createStory();
Copy.args = { isOpen: true, errors: ERRORS, onClose: fn() };
Copy.play = async ({ canvasElement, userEvent }) => {
    const writeText = fn(() => Promise.resolve());
    stubClipboard(writeText);

    try {
        const dialog = within(await findDialog(canvasElement));

        await userEvent.click(dialog.getByRole("button", { name: "Copy error" }));

        expect(writeText).toHaveBeenCalledWith(expect.stringContaining("Cannot read properties of undefined"));
        await waitFor(() => expect(dialog.getByRole("button", { name: "Copied" })).toBeInTheDocument());
    } finally {
        restoreClipboard();
    }
};

export const CopyFailure = createStory();
CopyFailure.args = { isOpen: true, errors: ERRORS, onClose: fn() };
CopyFailure.play = async ({ canvasElement, userEvent }) => {
    stubClipboard(fn(() => Promise.reject(new Error("denied"))));

    try {
        const dialog = within(await findDialog(canvasElement));

        await userEvent.click(dialog.getByRole("button", { name: "Copy error" }));

        await waitFor(() => expect(dialog.getByRole("button", { name: "Copy failed" })).toBeInTheDocument());
    } finally {
        restoreClipboard();
    }
};

export const EscapeCloses = createStory();
EscapeCloses.args = { isOpen: true, errors: ERRORS, onClose: fn() };
EscapeCloses.play = async ({ args, canvasElement, userEvent }) => {
    await findDialog(canvasElement);

    await userEvent.keyboard("{Escape}");

    await waitFor(() => expect(args.onClose).toHaveBeenCalledTimes(1));
};

export const NoStack = createStory();
NoStack.args = {
    isOpen: true,
    errors: [{ id: "n", name: "Error", message: "No stack here", count: 1 }],
    onClose: fn(),
};
NoStack.play = async ({ canvasElement }) => {
    const dialog = within(await findDialog(canvasElement));

    expect(dialog.getByText(/No stack here/)).toBeInTheDocument();
    expect(dialog.queryByRole("list")).not.toBeInTheDocument();
    expect(dialog.queryByRole("region", { name: "Code frame" })).not.toBeInTheDocument();
};

export const OutOfRangeSource = createStory();
OutOfRangeSource.args = {
    isOpen: true,
    errors: [
        {
            id: "o",
            name: "Error",
            message: "Source misses the line",
            frames: [getFrame("/src/a.js", 99, { source: SOURCE })],
            count: 1,
        },
    ],
    onClose: fn(),
};
OutOfRangeSource.play = async ({ canvasElement }) => {
    const dialog = within(await findDialog(canvasElement));

    expect(within(dialog.getByRole("list")).getAllByRole("listitem")).toHaveLength(1);
    expect(dialog.queryByRole("region", { name: "Code frame" })).not.toBeInTheDocument();
};

export const RenderFailure = createStory();
RenderFailure.args = {
    isOpen: true,
    errors: [
        {
            id: "r",
            name: "Error",
            message: { not: "a string" },
            stack: "Error: raw\n    at x (/src/r.js:1:1)",
            count: 1,
        },
    ],
    onClose: fn(),
};
RenderFailure.play = async ({ canvasElement }) => {
    const dialog = within(await findDialog(canvasElement));
    const fallback = await dialog.findByTestId("error-overlay-fallback");

    expect(fallback).toHaveTextContent("Error: [object Object]");
    expect(fallback).toHaveTextContent("at x (/src/r.js:1:1)");
};

export const BadFrameData = createStory();
BadFrameData.args = {
    isOpen: true,
    errors: [
        {
            id: "bf",
            name: "Error",
            message: "Unmapped position",
            frames: [{ file: null, line: null, column: null }],
            count: 1,
        },
    ],
    onClose: fn(),
};
BadFrameData.play = async ({ canvasElement }) => {
    const dialog = within(await findDialog(canvasElement));

    expect(await dialog.findByTestId("error-overlay-fallback")).toHaveTextContent("Error: Unmapped position");
};

let keyWarningSpy;

export const RepeatedFrames = createStory();
RepeatedFrames.args = {
    isOpen: true,
    errors: [
        {
            id: "rf",
            name: "RangeError",
            message: "Maximum call stack size exceeded",
            frames: Array.from({ length: 5 }, () => getFrame("/src/recurse.js", 7)),
            count: 1,
        },
    ],
    onClose: fn(),
};
RepeatedFrames.beforeEach = () => {
    keyWarningSpy = spyOn(console, "error");

    return () => keyWarningSpy.mockRestore();
};
RepeatedFrames.play = async ({ canvasElement }) => {
    const dialog = within(await findDialog(canvasElement));
    const hasKeyWarning = keyWarningSpy.mock.calls.some(([text]) => String(text).includes("same key"));

    expect(within(dialog.getByRole("list")).getAllByRole("listitem")).toHaveLength(5);
    expect(hasKeyWarning).toBe(false);
};

export const EmptyFrames = createStory();
EmptyFrames.args = {
    isOpen: true,
    errors: [
        {
            id: "ef",
            name: "Error",
            message: "Resolver returned nothing",
            frames: [],
            stack: "Error: Resolver returned nothing\n    at fn (/src/a.js:1:2)",
            count: 1,
        },
    ],
    onClose: fn(),
};
EmptyFrames.play = async ({ canvasElement }) => {
    const dialog = within(await findDialog(canvasElement));

    expect(within(dialog.getByRole("list")).getAllByRole("listitem")).toHaveLength(1);
};

export default ErrorOverlayStories;
