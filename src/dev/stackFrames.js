/**
 * `(.*?):(\d+):(\d+)` takes line and column from the last two number groups, so a `:3000` port stays in `file`.
 */
const V8_FRAME = /^(?:(.*?) \()?(.*?):(\d+):(\d+)\)?$/;
const GECKO_FRAME = /^(.*?)@(.+?):(\d+):(\d+)$/;
const V8_PREFIX = /^(?:async )?(?:new )?/;

const buildFrame = ([, method, file, line, column]) => ({
    method: method || undefined,
    file,
    line: Number(line),
    column: Number(column),
});

const parseLine = (rawLine) => {
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
 * @param {string} stack
 * @returns {Array<{ file: string, line: number, column: number, method?: string }>}
 */
export const parseStack = (stack) => stack.split("\n").map(parseLine).filter(Boolean);

/**
 * The frames to show for an error: supplied `frames` when non-empty, else the parsed `stack`. An empty `frames` (a
 * resolver that found nothing) must not hide a stack that still parses.
 */
export const getErrorFrames = ({ frames, stack }) => {
    if (frames?.length) {
        return frames;
    }

    return stack ? parseStack(stack) : [];
};

/**
 * Sets `isLibrary` from the file path where the frame does not carry it already.
 * @param {Array<{ file: string, isLibrary?: boolean }>} frames
 */
export const markLibraryFrames = (frames) => {
    return frames.map((frame) => {
        const { file, isLibrary } = frame;
        return { ...frame, isLibrary: isLibrary ?? file.includes("/node_modules/") };
    });
};

/**
 * Hides library frames unless expanded. `ignoredCount` is 0 when there is nothing to toggle: no library frames, or
 * only library frames (hiding them all would leave an empty stack).
 * @param {Array<{ isLibrary?: boolean }>} frames
 * @param {boolean} isExpanded
 * @returns {{ visible: Array, ignoredCount: number }}
 */
export const collapseFrames = (frames, isExpanded) => {
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
export const pickCodeFrame = (frames) => {
    return frames.find(({ source, isLibrary }) => source && !isLibrary) ?? frames.find(({ source }) => source);
};

/**
 * Rows for the code frame, or undefined when `line` falls outside the supplied source.
 * @returns {{ rows: Array<{ number: number, text: string, isError: boolean }>, caretColumn: number } | undefined}
 */
export const getCodeFrameRows = (frame) => {
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
