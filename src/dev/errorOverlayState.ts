import type { OverlayError, UseErrorOverlayResult } from "../../dev";
import { getErrorFrames } from "./stackFrames";

type PushedError = Parameters<UseErrorOverlayResult["push"]>[0];
type PushExtras = Parameters<UseErrorOverlayResult["push"]>[1];
type ErrorIdentity = Pick<OverlayError, "name" | "message" | "stack" | "frames">;

interface PushAction {
    type: "push";
    error: PushedError;
    extras?: PushExtras;
}

interface DismissAction {
    type: "dismiss";
    index: number;
}

interface SetActiveAction {
    type: "setActive";
    index: number;
}

interface ClearAction {
    type: "clear";
}

export interface ErrorOverlayState {
    errors: OverlayError[];
    activeIndex: number;
}

type ErrorOverlayAction = PushAction | DismissAction | SetActiveAction | ClearAction;

const clampIndex = (index: number, length: number) => Math.max(0, Math.min(index, length - 1));

/**
 * Identity used to merge repeats: name, message and the first frame, so a render loop collapses into one entry.
 */
export const getErrorId = ({ name, message, stack, frames }: ErrorIdentity) => {
    const [frame] = getErrorFrames({ frames, stack });
    const location = frame ? `${frame.file}:${frame.line}:${frame.column}` : "";

    return `${name}|${message}|${location}`;
};

const pushError = (state: ErrorOverlayState, { error, extras }: PushAction) => {
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

const dismissError = ({ errors, activeIndex }: ErrorOverlayState, { index }: DismissAction) => {
    const remaining = errors.filter((_, position) => position !== index);

    return { errors: remaining, activeIndex: clampIndex(activeIndex, remaining.length) };
};

/**
 * State is `{ errors: OverlayError[], activeIndex }`. Actions: `push`, `dismiss`, `clear`, `setActive`.
 * `push` never moves `activeIndex`, so a new error does not yank the reader off the one they are reading.
 */
export const errorOverlayReducer = (state: ErrorOverlayState, action: ErrorOverlayAction): ErrorOverlayState => {
    if (action.type === "push") {
        return pushError(state, action);
    }

    if (action.type === "dismiss") {
        return dismissError(state, action);
    }

    if (action.type === "setActive") {
        return { ...state, activeIndex: clampIndex(action.index, state.errors.length) };
    }

    if (action.type === "clear") {
        return { errors: [], activeIndex: 0 };
    }

    return state;
};
