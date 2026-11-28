import { useEventListener } from "ahooks";
import { Component, useState, type ReactNode } from "react";
import type { ErrorOverlay as DevErrorOverlay, ErrorOverlayProps, OverlayError } from "../../dev";
import { Modal } from "../components/Modal";
import { isDevelopment } from "../helpers/environment";
import { CallStack } from "./CallStack";
import { CodeFrame } from "./CodeFrame";
import { ErrorOverlayContext, type ErrorOverlayContextValue } from "./ErrorOverlayContext";
import { ComponentStack, Header, Message, Toolbar } from "./ErrorOverlayParts";
import { getErrorFrames, markLibraryFrames } from "./stackFrames";

const PRODUCTION_WARNING =
    "ErrorOverlay is a development tool and renders nothing when NODE_ENV is production. Gate the import with import.meta.env.DEV.";

let hasWarnedInProduction = false;

/**
 * The fallback stays plain on purpose: it renders when the overlay's own content threw, so it reads `message` through
 * `String` instead of trusting its shape.
 */
const OverlayFallback = ({ error }: { error: OverlayError }) => {
    const { name, message, stack } = error;

    return (
        <pre
            data-testid="error-overlay-fallback"
            className="mt-6 overflow-x-auto whitespace-pre-wrap font-mono text-sm text-danger"
        >
            {`${String(name)}: ${String(message)}\n${stack ?? ""}`}
        </pre>
    );
};

/** Paging to another error remounts the boundary through `key`, so one bad error does not hide the rest. */
class OverlayBoundary extends Component<{ error: OverlayError; children: ReactNode }, { hasError: boolean }> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        const { error, children } = this.props;
        const { hasError } = this.state;

        return hasError ? <OverlayFallback error={error} /> : children;
    }
}

interface OverlayBodyProps extends Omit<ErrorOverlayContextValue, "frames"> {
    children?: ReactNode;
}

/**
 * Frames are computed here, inside the boundary, because bad frame data (null fields from an unmapped source map
 * position, a non-string `stack`) throws and must reach the fallback instead of the host app.
 */
const OverlayBody = ({ error, errors, index, setIndex, onOpenInEditor, children }: OverlayBodyProps) => {
    const value = { error, frames: markLibraryFrames(getErrorFrames(error)), errors, index, setIndex, onOpenInEditor };

    return (
        <ErrorOverlayContext.Provider value={value}>
            {children ?? (
                <>
                    <Header />
                    <Message />
                    <CodeFrame />
                    <CallStack />
                    <ComponentStack />
                    <Toolbar />
                </>
            )}
        </ErrorOverlayContext.Provider>
    );
};

const OverlayContent = ({
    isOpen = false,
    errors,
    activeIndex,
    children,
    onClose,
    onOpenInEditor,
    onActiveChange,
}: ErrorOverlayProps) => {
    const [innerIndex, setInnerIndex] = useState(0);
    const isControlled = activeIndex !== undefined;
    const rawIndex = isControlled ? activeIndex : innerIndex;
    const lastIndex = errors.length - 1;
    const index = Math.max(0, Math.min(rawIndex, lastIndex));

    const setIndex = (next: number) => {
        const clamped = Math.max(0, Math.min(next, lastIndex));

        if (!isControlled) {
            setInnerIndex(clamped);
        }

        onActiveChange?.(clamped);
    };

    // Radix traps keyboard focus on the dialog's own close button, outside any wrapper this component renders, so a
    // wrapper onKeyDown would miss ArrowLeft/ArrowRight.
    useEventListener(
        "keydown",
        (event) => {
            if (event.key === "ArrowLeft") {
                setIndex(index - 1);
            }

            if (event.key === "ArrowRight") {
                setIndex(index + 1);
            }
        },
        { target: () => document, enable: isOpen },
    );

    const error = errors[index];

    if (!error) {
        return null;
    }

    return (
        <Modal size="huge" isOpen={isOpen} shouldCloseOnOutsideClick onClose={onClose}>
            <OverlayBoundary key={error.id} error={error}>
                <OverlayBody
                    error={error}
                    errors={errors}
                    index={index}
                    setIndex={setIndex}
                    onOpenInEditor={onOpenInEditor}
                >
                    {children}
                </OverlayBody>
            </OverlayBoundary>
        </Modal>
    );
};

const ErrorOverlayRoot = (props: ErrorOverlayProps) => {
    if (!isDevelopment) {
        if (!hasWarnedInProduction) {
            hasWarnedInProduction = true;
            console.warn(PRODUCTION_WARNING);
        }

        return null;
    }

    return <OverlayContent {...props} />;
};

/**
 * Development-only error panel. Renders nothing, and warns once, when NODE_ENV is production.
 */
export const ErrorOverlay = Object.assign(ErrorOverlayRoot, {
    Header,
    Message,
    Toolbar,
    CallStack,
    CodeFrame,
    ComponentStack,
}) satisfies typeof DevErrorOverlay;
