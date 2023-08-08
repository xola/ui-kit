import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Buttons/Button";

export const Drawer = ({ isOpen = false, title, content, onClose, classNames = {}, position = "right" }) => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className={clsx("ui-drawer fixed inset-0 z-10 overflow-hidden", classNames.dialog)}
                open={isOpen}
                onClose={onClose}
            >
                <div className="flex h-screen w-full">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-gray bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div
                        className={clsx(
                            "fixed inset-y-0 flex max-w-full",
                            position === "right" ? "right-0" : "left-0",
                            classNames.dialogContent,
                        )}
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
                            <div className="flex w-screen md:max-w-screen-md 2xl:max-w-screen-lg">
                                {position === "right" ? <CloseButton onClose={onClose} /> : null}

                                <div
                                    className={clsx(
                                        "flex h-full w-full flex-col overflow-y-auto bg-white px-4 py-8 shadow-xl sm:px-6",
                                        classNames.children,
                                    )}
                                >
                                    <div className="flex items-start justify-between">
                                        {/* eslint-disable-next-line react/jsx-max-depth */}
                                        <Dialog.Title>{title}</Dialog.Title>
                                    </div>
                                    <div className={clsx("relative mt-3 flex-1", classNames.content)}>{content}</div>
                                </div>

                                {position === "left" ? <CloseButton onClose={onClose} /> : null}
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

const CloseButton = ({ onClose }) => {
    return (
        <Button
            size="small flex justify-center"
            variant="link"
            className={clsx("m-1 h-6 w-6 rounded-full bg-gray !text-white focus:hidden")}
            onClick={onClose}
        >
            <CloseIcon size="tiny" />
        </Button>
    );
};

Drawer.propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    content: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    onClose: PropTypes.func.isRequired,
    classNames: PropTypes.object,
    position: PropTypes.string,
};
