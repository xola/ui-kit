import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Buttons/Button";

export const Drawer = ({ isOpen = false, title, content, onClose, classNames = {} }) => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="ui-drawer fixed inset-0 overflow-hidden md:left-24 xl:left-50"
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
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-700 sm:duration-700"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-700 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="z-30 w-screen max-w-xl">
                            <div className="flex h-full flex-col overflow-y-auto bg-white py-8 shadow-xl">
                                <div className="px-4 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <Dialog.Title>{title}</Dialog.Title>
                                        <div className={clsx("ml-3 flex h-7 items-center")}>
                                            <Button
                                                size="small"
                                                color="link"
                                                className="text-gray-darker focus:hidden"
                                                onClick={onClose}
                                            >
                                                <CloseIcon />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className={clsx("relative mt-3 flex-1 px-4 sm:px-6", classNames.content)}>
                                    {content}
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

Drawer.propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    content: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    onClose: PropTypes.func.isRequired,
    classNames: PropTypes.object,
};
