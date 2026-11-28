import { getErrorFrames } from "./stackFrames";

const clampIndex = (index, length) => Math.max(0, Math.min(index, length - 1));

/**
 * Identity used to merge repeats: name, message and the first frame, so a render loop collapses into one entry.
 * @param {{ name: string, message: string, stack?: string, frames?: Array<{ file: string, line: number, column: number }> }} error
 */
export const getErrorId = ({ name, message, stack, frames }) => {
    const [frame] = getErrorFrames({ frames, stack });
    const location = frame ? `${frame.file}:${frame.line}:${frame.column}` : "";

    return `${name}|${message}|${location}`;
};

const pushError = (state, { error, extras }) => {
    const { errors, activeIndex } = state;
    const entry = { ...error, ...extras };
    const id = getErrorId(entry);
    const isKnown = errors.some((existing) => existing.id === id);

    if (isKnown) {
        return {
            errors: errors.map((existing) =>
                existing.id === id ? { ...existing, count: existing.count + 1 } : existing,
            ),
            activeIndex,
        };
    }

    return { errors: [...errors, { ...entry, id, count: 1 }], activeIndex };
};

const dismissError = ({ errors, activeIndex }, { index }) => {
    const remaining = errors.filter((_, position) => position !== index);

    return { errors: remaining, activeIndex: clampIndex(activeIndex, remaining.length) };
};

/**
 * State is `{ errors: OverlayError[], activeIndex }`. Actions: `push`, `dismiss`, `clear`, `setActive`.
 * `push` never moves `activeIndex`, so a new error does not yank the reader off the one they are reading.
 */
export const errorOverlayReducer = (state, action) => {
    const { type } = action;

    if (type === "push") {
        return pushError(state, action);
    }

    if (type === "dismiss") {
        return dismissError(state, action);
    }

    if (type === "setActive") {
        return { ...state, activeIndex: clampIndex(action.index, state.errors.length) };
    }

    if (type === "clear") {
        return { errors: [], activeIndex: 0 };
    }

    return state;
};
