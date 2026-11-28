import { useTimeout } from "ahooks";
import { useState } from "react";
import type { OverlayError } from "../../dev";
import { Button } from "../components/Buttons/Button";
import { Modal } from "../components/Modal";
import { ChevronLeftIcon, ChevronRightIcon, CopyIcon } from "../icons";
import { useErrorOverlayContext } from "./ErrorOverlayContext";

const URL_PATTERN = /(https?:\/\/[^\s)]+)/g;
const COPY_STATUS_RESET_MS = 2000;
const COPY_LABELS = { idle: "Copy error", copied: "Copied", failed: "Copy failed" };

type CopyStatus = keyof typeof COPY_LABELS;

const getCopyText = ({ name, message, stack, componentStack }: OverlayError) => {
    const componentSection = componentStack ? `\n\nComponent stack:\n${componentStack}` : "";

    return `${name}: ${message}\n${stack ?? ""}${componentSection}`;
};

export const Header = () => {
    const { error, errors, index, setIndex } = useErrorOverlayContext();
    const { name, count } = error;
    const lastIndex = errors.length - 1;
    const handlePrevious = () => setIndex(index - 1);
    const handleNext = () => setIndex(index + 1);

    return (
        <>
            <Modal.Header>{name}</Modal.Header>

            <div className="mt-4 flex items-center justify-center space-x-3 text-sm text-gray-darker">
                <button
                    type="button"
                    aria-label="Previous error"
                    disabled={index <= 0}
                    className="disabled:opacity-40"
                    onClick={handlePrevious}
                >
                    <ChevronLeftIcon />
                </button>

                <span>{`${index + 1} / ${errors.length}`}</span>

                <button
                    type="button"
                    aria-label="Next error"
                    disabled={index >= lastIndex}
                    className="disabled:opacity-40"
                    onClick={handleNext}
                >
                    <ChevronRightIcon />
                </button>

                {count > 1 && <span className="rounded bg-danger px-1.5 text-xs text-white">{`x${count}`}</span>}
            </div>
        </>
    );
};

export const Message = () => {
    const { error } = useErrorOverlayContext();
    const parts = error.message.split(URL_PATTERN);

    return (
        <p className="mt-6 whitespace-pre-wrap break-words text-base text-danger">
            {parts.map((part, position) =>
                position % 2 === 1 ? (
                    <a key={position} href={part} target="_blank" rel="noreferrer" className="underline">
                        {part}
                    </a>
                ) : (
                    part
                ),
            )}
        </p>
    );
};

export const ComponentStack = () => {
    const { error } = useErrorOverlayContext();
    const { componentStack } = error;

    if (!componentStack) {
        return null;
    }

    return (
        <section aria-label="Component stack" className="mt-6">
            <pre className="overflow-x-auto font-mono text-sm text-gray-darker">{componentStack}</pre>
        </section>
    );
};

export const Toolbar = () => {
    const { error } = useErrorOverlayContext();
    const [status, setStatus] = useState<CopyStatus>("idle");

    useTimeout(() => setStatus("idle"), status === "idle" ? undefined : COPY_STATUS_RESET_MS);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(getCopyText(error));
            setStatus("copied");
        } catch {
            setStatus("failed");
        }
    };

    return (
        <div className="mt-6 flex justify-end">
            <Button type="button" icon={<CopyIcon />} onClick={handleCopy}>
                {COPY_LABELS[status]}
            </Button>
        </div>
    );
};

Header.displayName = "ErrorOverlay.Header";
Message.displayName = "ErrorOverlay.Message";
ComponentStack.displayName = "ErrorOverlay.ComponentStack";
Toolbar.displayName = "ErrorOverlay.Toolbar";
