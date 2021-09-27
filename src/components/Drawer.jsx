import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";

export const Drawer = ({ isOpen = false, title, content, onClose, classNames = {} }) => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog static as="div" className="ui-drawer overflow-hidden fixed inset-0" open={isOpen} onClose={onClose}>
                <div className="overflow-hidden absolute inset-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-opacity-75 transition-opacity bg-gray" />
                    </Transition.Child>

                    <div className="flex fixed inset-y-0 right-0 pl-10 max-w-full">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="w-screen max-w-md">
                                <div className="flex overflow-y-auto flex-col py-8 h-full bg-white shadow-xl">
                                    <div className="px-4 sm:px-6">
                                        <div className="flex justify-between items-start">
                                            <Dialog.Title className={clsx("text-base font-semibold", classNames.title)}>
                                                {title}
                                            </Dialog.Title>
                                            <div className={clsx("ml-3 h-7 flex items-center")}>
                                                <Button
                                                    size="small"
                                                    color="link"
                                                    className="focus:hidden"
                                                    onClick={onClose}
                                                >
                                                    <CloseIcon />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={clsx("mt-3 relative flex-1 px-4 sm:px-6", classNames.content)}>
                                        {content}
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
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
