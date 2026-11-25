import { Dialog, DialogBackdrop, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import PropTypes from "prop-types";
import React, { forwardRef, Fragment } from "react";
import { isIosBrowser } from "../helpers/browser";
import cn from "../helpers/classnames";
import { useViewportHeight } from "../hooks/useViewportHeight";
import { CloseIcon } from "../icons";
import { Button } from "./Buttons/Button";

const sizes = {
    small: "w-72",
    medium: "w-85",
    large: "w-110",
    xl: "w-200",
    "2xl": "w-screen md:max-w-screen-md 2xl:max-w-screen-lg", // This was the old size
};

export const Drawer = forwardRef(
    (
        {
            isOpen = false,
            title,
            size = "medium",
            content,
            sideIndent = 0,
            onClose,
            classNames = {},
            position = "right",
        },
        ref,
    ) => {
        const viewportHeight = useViewportHeight();
        const isIOS = isIosBrowser();

        // The Dialog calls `onClose(false)` on Escape; an overlay click passes the same value, not the click event
        const handleOverlayClick = () => onClose(false);

        return (
            <Transition ref={ref} show={isOpen} as={Fragment}>
                <Dialog
                    // With autoFocus on, Headless UI focuses the dialog container unless a child has data-autofocus.
                    // Off, it focuses the first focusable element inside, so keyboard users land on a control
                    autoFocus={false}
                    as="div"
                    className={cn("ui-drawer fixed inset-0 z-10 overflow-hidden", classNames.dialog)}
                    onClose={onClose}
                >
                    <div
                        className={cn(
                            "flex",
                            isIOS ? `h-[${viewportHeight}px] max-h-[${viewportHeight}px] w-full` : "h-screen w-full",
                        )}
                    >
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <DialogBackdrop
                                className={cn(
                                    "ui-drawer-overlay fixed inset-0 bg-black bg-opacity-80 transition-opacity",
                                    classNames.overlay,
                                )}
                                onClick={handleOverlayClick}
                            />
                        </TransitionChild>
                        <div
                            style={{
                                [position === "right" ? "right" : "left"]: `${sideIndent ?? 0}px`,
                            }}
                            className={cn(
                                "ui-drawer-container",
                                "fixed inset-y-0 flex max-w-full",
                                classNames.dialogContent,
                            )}
                        >
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-500"
                                enterFrom={position === "right" ? "translate-x-full" : "-translate-x-full"}
                                enterTo="translate-x-0"
                                leave="transform transition ease-out-in duration-500"
                                leaveFrom={position === "right" ? "-translate-x-full" : "translate-x-full"}
                                leaveTo={position === "right" ? "translate-x-full" : "-translate-x-full"}
                            >
                                <div className="flex">
                                    {position === "right" ? <CloseButton onClose={onClose} /> : null}

                                    <div
                                        className={cn(
                                            "flex h-full w-full flex-col overflow-y-auto bg-white px-4 py-8 shadow-xl sm:px-6",
                                            sizes[size],
                                            classNames.children,
                                        )}
                                    >
                                        <div className="ui-drawer-header w-full">
                                            {/* eslint-disable-next-line react/jsx-max-depth */}
                                            <DialogTitle>{title}</DialogTitle>
                                        </div>
                                        <div className={cn("ui-drawer-body relative mt-3 flex-1", classNames.content)}>
                                            {content}
                                        </div>
                                    </div>

                                    {position === "left" ? <CloseButton onClose={onClose} /> : null}
                                </div>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        );
    },
);

const CloseButton = ({ onClose }) => {
    return (
        <Button
            size="small"
            variant="link"
            className={cn(
                "m-2.5 inline-flex !h-10 !w-10 items-center justify-center !rounded-full bg-white !px-1.5 !text-black",
            )}
            onClick={onClose}
        >
            <CloseIcon size="medium" />
        </Button>
    );
};

Drawer.displayName = "Drawer";

Drawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    content: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    onClose: PropTypes.func.isRequired,
    classNames: PropTypes.object,
    position: PropTypes.string,
    sideIndent: PropTypes.number,
};

Drawer.defaultProps = {
    title: "",
    classNames: {},
    position: "right",
    sideIndent: 0,
};
