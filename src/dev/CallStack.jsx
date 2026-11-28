import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { ArrowTopRightIcon } from "../icons";
import { ErrorOverlayContext } from "./ErrorOverlayContext";
import { collapseFrames } from "./stackFrames";

const CallStackFrame = ({ frame, onOpenInEditor }) => {
    const { method, file, line, column } = frame;
    const handleOpen = () => onOpenInEditor(frame);

    return (
        <li className="flex items-center justify-between space-x-4 py-1.5 text-sm">
            <span className="min-w-0 break-all">
                <span className="font-semibold text-black">{method ?? "(anonymous)"}</span>{" "}
                <span className="font-mono text-gray-dark">{`${file}:${line}:${column}`}</span>
            </span>

            {onOpenInEditor && (
                <button
                    type="button"
                    aria-label={`Open ${file}:${line}`}
                    className="shrink-0 text-gray-dark hover:text-black"
                    onClick={handleOpen}
                >
                    <ArrowTopRightIcon />
                </button>
            )}
        </li>
    );
};

CallStackFrame.propTypes = {
    frame: PropTypes.shape({
        file: PropTypes.string.isRequired,
        line: PropTypes.number.isRequired,
        column: PropTypes.number.isRequired,
        method: PropTypes.string,
    }).isRequired,
    onOpenInEditor: PropTypes.func,
};

export const CallStack = () => {
    const { frames, onOpenInEditor } = useContext(ErrorOverlayContext);
    const [isExpanded, setIsExpanded] = useState(false);
    const { visible, ignoredCount } = collapseFrames(frames, isExpanded);
    const handleToggle = () => setIsExpanded(!isExpanded);

    if (frames.length === 0) {
        return null;
    }

    return (
        <section aria-label="Call stack" className="mt-6">
            <ul role="list" className="divide-y divide-gray-light">
                {visible.map((frame, position) => (
                    <CallStackFrame
                        key={`${position}:${frame.file}:${frame.line}:${frame.column}`}
                        frame={frame}
                        onOpenInEditor={onOpenInEditor}
                    />
                ))}
            </ul>

            {ignoredCount > 0 && (
                <button type="button" className="mt-2 text-sm text-primary hover:underline" onClick={handleToggle}>
                    {isExpanded ? `Hide ${ignoredCount} ignored frames` : `Show ${ignoredCount} ignored frames`}
                </button>
            )}
        </section>
    );
};
