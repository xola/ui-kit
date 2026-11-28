import type * as React from "react";

export interface StackFrame {
    file: string;
    line: number;
    column: number;
    method?: string;
    /** Defaults to `file.includes("/node_modules/")`. */
    isLibrary?: boolean;
    /** Plain-text code frame around `line`. Rows are numbered from `startLine`. */
    source?: { startLine: number; lines: string[] };
}

export interface OverlayError {
    /** Dedupe signature: name, message and first frame. */
    id: string;
    name: string;
    message: string;
    stack?: string;
    /** Wins over parsing `stack`. */
    frames?: StackFrame[];
    componentStack?: string;
    /** Times this error was seen. */
    count: number;
}

export interface ErrorOverlayProps {
    isOpen: boolean;
    errors: OverlayError[];
    onClose: () => void;
    /** The open-in-editor button is hidden when absent. */
    onOpenInEditor?: (frame: StackFrame) => void;
    /** Controlled when given, internal otherwise. */
    activeIndex?: number;
    onActiveChange?: (index: number) => void;
    /** Replaces the default composition of all six parts. */
    children?: React.ReactNode;
}

/**
 * Development-only error panel. Renders nothing, and warns once, when NODE_ENV is production.
 */
export declare const ErrorOverlay: {
    (props: ErrorOverlayProps): React.ReactElement | null;
    Header: React.ComponentType;
    Message: React.ComponentType;
    CallStack: React.ComponentType;
    CodeFrame: React.ComponentType;
    ComponentStack: React.ComponentType;
    Toolbar: React.ComponentType;
};

export interface UseErrorOverlayResult {
    errors: OverlayError[];
    activeIndex: number;
    push: (
        error: { name: string; message: string; stack?: string },
        extras?: { frames?: StackFrame[]; componentStack?: string },
    ) => void;
    dismiss: (index: number) => void;
    clear: () => void;
    setActiveIndex: (index: number) => void;
}

export declare function useErrorOverlay(): UseErrorOverlayResult;

/** Normalizes anything thrown or rejected into `{ name, message, stack? }`. */
export declare function toOverlayError(thrown: unknown): { name: string; message: string; stack?: string };

/** Parses a V8, Firefox or Safari stack string into frames. */
export declare function parseStack(stack: string): StackFrame[];
