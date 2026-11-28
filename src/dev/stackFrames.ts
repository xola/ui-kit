import type { StackFrame } from "../../dev";

interface CodeFrameRow {
    number: number;
    text: string;
    isError: boolean;
}

/**
 * `(.*?):(\d+):(\d+)` takes line and column from the last two number groups, so a `:3000` port stays in `file`.
 */
const V8_FRAME = /^(?:(.*?) \()?(.*?):(\d+):(\d+)\)?$/;
const GECKO_FRAME = /^(.*?)@(.+?):(\d+):(\d+)$/;
const V8_PREFIX = /^(?:async )?(?:new )?/;

const buildFrame = ([, method, file, line, column]: RegExpMatchArray): StackFrame => ({
    method: method || undefined,
    file,
    line: Number(line),
    column: Number(column),
});

const parseLine = (rawLine: string): StackFrame | undefined => {
    const line = rawLine.trim();

    if (line.startsWith("at ")) {
        const match = line.slice(3).replace(V8_PREFIX, "").match(V8_FRAME);
        return match ? buildFrame(match) : undefined;
    }

    const match = line.match(GECKO_FRAME);
    return match ? buildFrame(match) : undefined;
};

/**
 * Parses a V8, Firefox or Safari stack string. Lines that are not frames (the message line, `[native code]`) are dropped.
 */
export const parseStack = (stack: string): StackFrame[] => {
    return stack
        .split("\n")
        .map(parseLine)
        .filter((frame) => frame !== undefined);
};

/**
 * The frames to show for an error: supplied `frames` when non-empty, else the parsed `stack`. An empty `frames` (a
 * resolver that found nothing) must not hide a stack that still parses.
 */
export const getErrorFrames = ({ frames, stack }: { frames?: StackFrame[]; stack?: string }) => {
    if (frames?.length) {
        return frames;
    }

    return stack ? parseStack(stack) : [];
};

/**
 * Sets `isLibrary` from the file path where the frame does not carry it already.
 */
export const markLibraryFrames = (frames: StackFrame[]) => {
    return frames.map((frame) => {
        const { file, isLibrary } = frame;
        return { ...frame, isLibrary: isLibrary ?? file.includes("/node_modules/") };
    });
};

/**
 * Hides library frames unless expanded. `ignoredCount` is 0 when there is nothing to toggle: no library frames, or
 * only library frames (hiding them all would leave an empty stack).
 */
export const collapseFrames = (frames: StackFrame[], isExpanded: boolean) => {
    const libraryCount = frames.filter(({ isLibrary }) => isLibrary).length;
    const hasToggle = libraryCount > 0 && libraryCount < frames.length;

    if (hasToggle && !isExpanded) {
        return { visible: frames.filter(({ isLibrary }) => !isLibrary), ignoredCount: libraryCount };
    }

    return { visible: frames, ignoredCount: hasToggle ? libraryCount : 0 };
};

/**
 * The frame whose source the code frame shows: the first app frame with source, else the first library frame with source.
 */
export const pickCodeFrame = (frames: StackFrame[]) => {
    return frames.find(({ source, isLibrary }) => source && !isLibrary) ?? frames.find(({ source }) => source);
};

/**
 * Rows for the code frame, or undefined when `line` falls outside the supplied source.
 */
export const getCodeFrameRows = (frame: StackFrame): { rows: CodeFrameRow[]; caretColumn: number } | undefined => {
    const { source, line, column } = frame;

    if (!source) {
        return undefined;
    }

    const { startLine, lines } = source;
    const isInRange = line >= startLine && line < startLine + lines.length;

    if (!isInRange) {
        return undefined;
    }

    const rows = lines.map((text, index) => {
        const number = startLine + index;
        return { number, text, isError: number === line };
    });

    return { rows, caretColumn: column };
};
