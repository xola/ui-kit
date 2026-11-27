import * as RadixDialog from "@radix-ui/react-dialog";
import PropTypes from "prop-types";
import React, { useId, useRef } from "react";
import { BackdropOwnerContext, getBackdropHandlers } from "../helpers/backdrop";
import cn from "../helpers/classnames";
import { useDialogFocusReturn } from "../hooks/useDialogFocusReturn";
import { CloseIcon } from "../icons";
import {
    DialogFrame,
    DialogTitle,
    DialogTitleScope,
    preventDialogOutsideInteraction,
    preventExpandedComboBoxEscape,
} from "./Dialog/Dialog";

const sizes = {
    small: "max-w-100", // 400px
    medium: "max-w-125", // 500px
    large: "max-w-150", // 600px
    huge: "max-w-200", // 800px
};

const positions = {
    center: "inline-block",
    topLeft: "absolute m-4 top-0 left-0",
    topRight: "absolute m-4 top-0 right-0",
    bottomLeft: "absolute m-4 bottom-0 left-0",
    bottomRight: "absolute m-4 bottom-0 right-0",
};

const hiddenStates = {
    center: "[--ui-dialog-translate:0_16px] sm:[--ui-dialog-translate:0] sm:[--ui-dialog-scale:0.95]",
    topLeft: "[--ui-dialog-scale:0] origin-top-left",
    topRight: "[--ui-dialog-scale:0] origin-top-right",
    bottomLeft: "[--ui-dialog-scale:0] origin-bottom-left",
    bottomRight: "[--ui-dialog-scale:0] origin-bottom-right",
};

export const Modal = ({
    size = "medium",
    position = "center",
    isOpen = false,
    shouldCloseOnOutsideClick = false,
    onClose,
    children,
    className,
}) => {
    const backdropOwner = useId();
    const dialogRef = useRef();
    const { onOpenAutoFocus, onCloseAutoFocus } = useDialogFocusReturn(isOpen);

    const handleBackdropClick = () => {
        if (shouldCloseOnOutsideClick) {
            onClose();
            return;
        }

        if (dialogRef.current) {
            dialogRef.current.tabIndex = -1;
            dialogRef.current.focus();
        }
    };

    const handleContentFocusOut = (event) => {
        if (event.relatedTarget === dialogRef.current) {
            event.stopPropagation();
        }
    };

    // Escape shares the outside-click policy; backdrop handlers own pointer dismissal.
    const handleOpenChange = (open) => {
        if (!open && shouldCloseOnOutsideClick) {
            onClose();
        }
    };

    /** Drops the click event so `onClose` keeps being called with no arguments. */
    const handleClose = () => onClose();

    const backdropHandlers = getBackdropHandlers(handleBackdropClick);

    return (
        <BackdropOwnerContext.Provider value={backdropOwner}>
            <DialogFrame
                ref={dialogRef}
                isOpen={isOpen}
                className="ui-modal group/modal fixed inset-0 z-30 overflow-y-auto [--ui-dialog-out-duration:300ms] data-[state=closed]:animate-dialog-hold"
                onOpenChange={handleOpenChange}
            >
                <div className="min-h-screen px-4 text-center">
                    <div
                        className="ui-modal-overlay fixed inset-0 bg-black bg-opacity-80 transition-opacity [--ui-dialog-in-duration:300ms] [--ui-dialog-opacity:0] [--ui-dialog-out-duration:200ms] group-data-[state=closed]/modal:animate-dialog-out group-data-[state=open]/modal:animate-dialog-in"
                        data-backdrop-owner={backdropOwner}
                        {...backdropHandlers}
                    />

                    {/* This element is to trick the browser into centering the modal contents. */}
                    {position === "center" && (
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                    )}

                    <RadixDialog.Content
                        aria-describedby={undefined}
                        className={cn(
                            className,
                            sizes[size],
                            positions[position],
                            hiddenStates[position],
                            "w-full transform overflow-hidden rounded-lg bg-white p-10 text-left align-middle shadow-xl transition-all",
                            "[--ui-dialog-in-duration:300ms] [--ui-dialog-opacity:0] [--ui-dialog-out-duration:300ms] data-[state=closed]:animate-dialog-out data-[state=open]:animate-dialog-in",
                        )}
                        onEscapeKeyDown={preventExpandedComboBoxEscape}
                        onBlurCapture={handleContentFocusOut}
                        onInteractOutside={preventDialogOutsideInteraction}
                        onOpenAutoFocus={onOpenAutoFocus}
                        onCloseAutoFocus={onCloseAutoFocus}
                    >
                        <DialogTitleScope>
                            {onClose && (
                                <button
                                    type="button"
                                    className="absolute right-0 top-0 m-4 hidden p-2 text-black hover:text-gray-darker sm:block"
                                    onClick={handleClose}
                                >
                                    <CloseIcon />
                                </button>
                            )}

                            {children}
                        </DialogTitleScope>
                    </RadixDialog.Content>
                </div>
            </DialogFrame>
        </BackdropOwnerContext.Provider>
    );
};

Modal.propTypes = {
    size: PropTypes.oneOf(Object.keys(sizes)),
    position: PropTypes.oneOf(Object.keys(positions)),
    isOpen: PropTypes.bool.isRequired,
    shouldCloseOnOutsideClick: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

const Header = ({ children, description, className, ...rest }) => {
    return (
        <DialogTitle className={cn(className, "ui-modal-header text-center")} {...rest}>
            <h3 className="text-2xl font-semibold leading-6 text-black">{children}</h3>

            {description ? (
                <p className="mt-2 text-base font-normal leading-normal text-gray-darker">{description}</p>
            ) : null}
        </DialogTitle>
    );
};

Header.propTypes = {
    children: PropTypes.node.isRequired,
    description: PropTypes.string,
    className: PropTypes.string,
};

Header.displayName = "Modal.Header";
Modal.Header = Header;

const Body = ({ className, ...rest }) => {
    return <div className={cn(className, "ui-modal-body mt-10")} {...rest} />;
};

Body.propTypes = {
    className: PropTypes.string,
};

Body.displayName = "Modal.Body";
Modal.Body = Body;

const Footer = ({ className, ...rest }) => {
    return <div className={cn(className, "ui-modal-footer mt-10 space-x-4 text-right")} {...rest} />;
};

Footer.propTypes = {
    className: PropTypes.string,
};

Footer.displayName = "Modal.Footer";
Modal.Footer = Footer;
