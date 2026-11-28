import { Fragment } from "react";
import { useErrorOverlayContext } from "./ErrorOverlayContext";
import { getCodeFrameRows, pickCodeFrame } from "./stackFrames";

export const CodeFrame = () => {
    const { frames } = useErrorOverlayContext();
    const frame = pickCodeFrame(frames);
    const result = frame ? getCodeFrameRows(frame) : undefined;

    if (!result) {
        return null;
    }

    const { rows, caretColumn } = result;
    const gutterWidth = String(rows[rows.length - 1].number).length;
    const caret = `${" ".repeat(gutterWidth)} | ${" ".repeat(Math.max(caretColumn - 1, 0))}^`;

    return (
        <section
            aria-label="Code frame"
            className="mt-6 overflow-x-auto rounded bg-gray-darker py-3 font-mono text-sm text-white"
        >
            {rows.map(({ number, text, isError }) => (
                <Fragment key={number}>
                    <div
                        aria-current={isError ? "true" : undefined}
                        className={isError ? "whitespace-pre bg-danger bg-opacity-30 px-4" : "whitespace-pre px-4"}
                    >
                        {`${String(number).padStart(gutterWidth)} | ${text}`}
                    </div>

                    {isError && (
                        <div aria-hidden="true" className="whitespace-pre px-4 text-danger">
                            {caret}
                        </div>
                    )}
                </Fragment>
            ))}
        </section>
    );
};
