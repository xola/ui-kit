import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef, Fragment } from "react";
import { isIosBrowser } from "../helpers/browser";
import { useViewportHeight } from "../hooks/useViewportHeight";
import { CloseIcon } from "../icons/index.js";
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

        return (
            <Transition.Root ref={ref} show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className={clsx("ui-drawer fixed inset-0 z-10 overflow-hidden", classNames.dialog)}
                    open={isOpen}
                    onClose={onClose}
                >
                    <div
                        className={clsx(
                            "flex",
                            isIOS ? `h-[${viewportHeight}px] max-h-[${viewportHeight}px] w-full` : "h-screen w-full",
                        )}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay
                                className={clsx(
                                    "absolute inset-0 bg-black bg-opacity-80 transition-opacity",
                                    classNames.overlay,
                                )}
                            />
                        </Transition.Child>
                        <div
                            style={{
                                [position === "right" ? "right" : "left"]: `${sideIndent ?? 0}px`,
                            }}
                            className={clsx("fixed inset-y-0 flex max-w-full", classNames.dialogContent)}
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom={position === "right" ? "translate-x-full" : "-translate-x-full"}
                                enterTo="translate-x-0"
                                leave="transform transition ease-out-in duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo={position === "right" ? "translate-x-full" : "-translate-x-full"}
                            >
                                <div className="flex">
                                    {position === "right" ? <CloseButton onClose={onClose} /> : null}

                                    <div
                                        className={clsx(
                                            "flex h-full w-full flex-col overflow-y-auto bg-white px-4 py-8 shadow-xl sm:px-6",
                                            sizes[size],
                                            classNames.children,
                                        )}
                                    >
                                        <div className="w-full">
                                            {/* eslint-disable-next-line react/jsx-max-depth */}
                                            <Dialog.Title>{title}</Dialog.Title>
                                        </div>
                                        <div className={clsx("relative mt-3 flex-1", classNames.content)}>
                                            {content}
                                        </div>
                                    </div>

                                    {position === "left" ? <CloseButton onClose={onClose} /> : null}
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        );
    },
);

const CloseButton = ({ onClose }) => {
    return (
        <Button
            size="small"
            variant="link"
            className={clsx(
                "m-2.5 inline-flex !h-10 !w-10 items-center justify-center !rounded-full bg-white !px-1.5 !text-black",
            )}
            onClick={onClose}
        >
            <CloseIcon size="medium" />
        </Button>
    );
};

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
