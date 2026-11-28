import * as RadixDialog from "@radix-ui/react-dialog";
import { useMemoizedFn, useMount, useUnmount } from "ahooks";
import PropTypes from "prop-types";
import React, { createContext, forwardRef, useContext, useState } from "react";

/** A denied backdrop press focuses the frame; Radix's Content trap must not redirect that frame focus. */
const keepDialogFrameFocus = (event) => {
    if (event.target === event.currentTarget) {
        event.stopPropagation();
    }
};

export const DialogFrame = forwardRef(({ isOpen, onOpenChange, className, children, ...rest }, ref) => {
    return (
        <RadixDialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <RadixDialog.Portal>
                <RadixDialog.Overlay ref={ref} className={className} onFocusCapture={keepDialogFrameFocus} {...rest}>
                    {children}
                </RadixDialog.Overlay>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
});

DialogFrame.displayName = "DialogFrame";
DialogFrame.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

/** Backdrop handlers own pointer dismissal, so Radix must not also call `onOpenChange` for the same press. */
export const preventDialogOutsideInteraction = (event) => event.preventDefault();

/** Radix captures Escape before react-select can close its menu, so leave that key to an expanded combobox. */
export const preventExpandedComboBoxEscape = (event) => {
    const { target } = event;
    const isExpandedComboBox =
        target instanceof HTMLElement &&
        target.getAttribute("role") === "combobox" &&
        target.getAttribute("aria-expanded") === "true";

    if (isExpandedComboBox) {
        event.preventDefault();
    }
};

const TitleCountContext = createContext();

/**
 * Radix requires a title, while Modal.Header and BottomSheet.Header are optional. Until a titled child mounts, render
 * an empty, visually hidden title so a headerless dialog keeps an empty accessible name without logging an error.
 */
export const DialogTitleScope = ({ children }) => {
    const [titleCount, setTitleCount] = useState(0);
    const changeTitleCount = useMemoizedFn((change) => setTitleCount((count) => count + change));

    return (
        <TitleCountContext.Provider value={changeTitleCount}>
            {titleCount === 0 && <RadixDialog.Title className="sr-only" />}
            {children}
        </TitleCountContext.Provider>
    );
};

DialogTitleScope.propTypes = {
    children: PropTypes.node.isRequired,
};

export const DialogTitle = ({ children, className, ...rest }) => {
    const changeTitleCount = useContext(TitleCountContext);

    useMount(() => changeTitleCount?.(1));
    useUnmount(() => changeTitleCount?.(-1));

    return (
        <RadixDialog.Title asChild>
            <div className={className} {...rest}>
                {children}
            </div>
        </RadixDialog.Title>
    );
};

DialogTitle.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
