import { useEventListener } from "ahooks";
import PropTypes from "prop-types";
import React, { Component, useState } from "react";
import { Modal } from "../components/Modal";
import { isDevelopment } from "../helpers/environment";
import { CallStack } from "./CallStack";
import { CodeFrame } from "./CodeFrame";
import { ErrorOverlayContext } from "./ErrorOverlayContext";
import { ComponentStack, Header, Message, Toolbar } from "./ErrorOverlayParts";
import { getErrorFrames, markLibraryFrames } from "./stackFrames";

const PRODUCTION_WARNING =
    "ErrorOverlay is a development tool and renders nothing when NODE_ENV is production. Gate the import with import.meta.env.DEV.";

let hasWarnedInProduction = false;

/**
 * The fallback stays plain on purpose: it renders when the overlay's own content threw, so it reads `message` through
 * `String` instead of trusting its shape.
 */
const OverlayFallback = ({ error }) => {
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

OverlayFallback.propTypes = {
    error: PropTypes.shape({
        name: PropTypes.string,
        message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    }).isRequired,
};

/** Paging to another error remounts the boundary through `key`, so one bad error does not hide the rest. */
class OverlayBoundary extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
    };

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

/**
 * Frames are computed here, inside the boundary, because bad frame data (null fields from an unmapped source map
 * position, a non-string `stack`) throws and must reach the fallback instead of the host app.
 */
const OverlayBody = ({ error, errors, index, setIndex, onOpenInEditor, children }) => {
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

OverlayBody.propTypes = {
    error: PropTypes.object.isRequired,
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
    index: PropTypes.number.isRequired,
    children: PropTypes.node,
    setIndex: PropTypes.func.isRequired,
    onOpenInEditor: PropTypes.func,
};

const OverlayContent = ({ isOpen = false, errors, onClose, onOpenInEditor, activeIndex, onActiveChange, children }) => {
    const [innerIndex, setInnerIndex] = useState(0);
    const isControlled = activeIndex !== undefined;
    const rawIndex = isControlled ? activeIndex : innerIndex;
    const lastIndex = errors.length - 1;
    const index = Math.max(0, Math.min(rawIndex, lastIndex));

    const setIndex = (next) => {
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

const errorShape = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    stack: PropTypes.string,
    frames: PropTypes.arrayOf(PropTypes.object),
    componentStack: PropTypes.string,
    count: PropTypes.number.isRequired,
});

const propTypes = {
    isOpen: PropTypes.bool.isRequired,
    errors: PropTypes.arrayOf(errorShape).isRequired,
    activeIndex: PropTypes.number,
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
    onOpenInEditor: PropTypes.func,
    onActiveChange: PropTypes.func,
};

OverlayContent.propTypes = propTypes;

/**
 * Development-only error panel. Renders nothing, and warns once, when NODE_ENV is production.
 */
export const ErrorOverlay = (props) => {
    if (!isDevelopment) {
        if (!hasWarnedInProduction) {
            hasWarnedInProduction = true;
            console.warn(PRODUCTION_WARNING);
        }

        return null;
    }

    return <OverlayContent {...props} />;
};

ErrorOverlay.propTypes = propTypes;
ErrorOverlay.Header = Header;
ErrorOverlay.Message = Message;
ErrorOverlay.CallStack = CallStack;
ErrorOverlay.CodeFrame = CodeFrame;
ErrorOverlay.ComponentStack = ComponentStack;
ErrorOverlay.Toolbar = Toolbar;
