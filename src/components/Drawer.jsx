import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Buttons/Button";

export const Drawer = ({
    isOpen = false,
    title,
    content,
    onClose,
    classNames = {},
    position = "right",
    isCloseButtonOutside = false,
}) => {
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
                            <div className="flex w-screen max-w-xl md:max-w-screen-md">
                                {isCloseButtonOutside && position === "right" ? (
                                    <CloseButton isCloseButtonOutside onClose={onClose} />
                                ) : null}

                                <div className="flex h-full w-full flex-col overflow-y-auto bg-white py-8 shadow-xl">
                                    <div className="px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            {/* eslint-disable-next-line react/jsx-max-depth */}
                                            <Dialog.Title>{title}</Dialog.Title>
                                            {!isCloseButtonOutside && <CloseButton onClose={onClose} />}
                                        </div>
                                    </div>
                                    <div className={clsx("relative mt-3 flex-1 px-4 sm:px-6", classNames.content)}>
                                        {content}
                                    </div>
                                </div>

                                {isCloseButtonOutside && position === "left" ? (
                                    <CloseButton isCloseButtonOutside onClose={onClose} />
                                ) : null}
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

const CloseButton = ({ onClose, isCloseButtonOutside = false }) => {
    return (
        <Button
            size="small flex justify-center"
            variant="link"
            className={clsx("m-1 h-6 w-6 text-gray-darker focus:hidden", {
                "rounded-full bg-gray !text-white": isCloseButtonOutside,
            })}
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
    isCloseButtonOutside: PropTypes.bool,
};
