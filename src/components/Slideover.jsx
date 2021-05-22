import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { Fragment, useRef } from "react";
import { XIcon } from '../icons/XIcon';
import { Button } from './Button';

export const Slideover = ({ open = false, title, content, onClose, classNames = {} }) => {
    const initialFocusRef = useRef();

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" static className="fixed inset-0 overflow-hidden" open={open} onClose={onClose}>
                <div className="absolute inset-0 overflow-hidden">
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

                    <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
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
                                <div className="h-full flex flex-col py-8 bg-white shadow-xl overflow-y-auto">
                                    <div className="px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <Dialog.Title className={clsx("text-base font-semibold", classNames.title)}>
                                                {title}
                                            </Dialog.Title>
                                            <div className={clsx("ml-3 h-7 flex items-center")}>
                                                <Button size="small" color="link" className="focus:hidden" onClick={onClose}>
                                                    <XIcon />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={clsx("mt-3 relative flex-1 px-4 sm:px-6", classNames.content)}>
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
