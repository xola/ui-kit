import { Dialog, Transition } from "@headlessui/react";
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
    ({ isOpen = false, title, size = "medium", content, onClose, classNames = {}, position = "right" }, ref) => {
        const viewportHeight = useViewportHeight();
        const isIOS = isIosBrowser();

        return (
            <Transition.Root appear ref={ref} show={isOpen} as={Fragment}>
                <Dialog
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
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay
                                className={cn(
                                    "ui-drawer-overlay fixed inset-0 bg-black bg-opacity-80 transition-opacity",
                                    classNames.overlay,
                                )}
                            />
                        </Transition.Child>
                        <div
                            className={cn(
                                "ui-drawer-container",
                                "fixed inset-y-0 flex max-w-full",
                                position === "right" ? "right-0" : "left-0",
                                classNames.dialogContent,
                            )}
                        >
                            <Transition.Child
                                as={Fragment}
                                appear
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
                                            <Dialog.Title>{title}</Dialog.Title>
                                        </div>
                                        <div className={cn("ui-drawer-body relative mt-3 flex-1", classNames.content)}>{content}</div>
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
            className={cn(
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
};

Drawer.defaultProps = {
    title: "",
    classNames: {},
    position: "right",
};
