import { createContext, useContext } from "react";
import type { OverlayError, StackFrame } from "../../dev";

export interface ErrorOverlayContextValue {
    error: OverlayError;
    frames: StackFrame[];
    errors: OverlayError[];
    index: number;
    setIndex: (index: number) => void;
    onOpenInEditor?: (frame: StackFrame) => void;
}

export const ErrorOverlayContext = createContext<ErrorOverlayContextValue | undefined>(undefined);

export const useErrorOverlayContext = () => {
    const context = useContext(ErrorOverlayContext);

    if (!context) {
        throw new Error("ErrorOverlay parts must render inside <ErrorOverlay>");
    }

    return context;
};
