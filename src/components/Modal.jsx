import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Skeleton } from "..";
import { CloseIcon } from "../icons/CloseIcon";
import { FadeIn } from "./Animation/FadeIn";

const sizes = {
    small: "max-w-[400px]",
    medium: "max-w-[500px]",
    large: "max-w-[600px]",
    huge: "max-w-[800px]",
};

export const Modal = ({
    size = "medium",
    isOpen = false,
    shouldCloseOnOutsideClick = false,
    onClose,
    children,
    className,
}) => {
    const handleOutsideClick = () => {
        if (shouldCloseOnOutsideClick) {
            onClose();
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="overflow-y-auto fixed inset-0 z-30 ui-modal" onClose={handleOutsideClick}>
                <div className="px-4 min-h-screen text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-opacity-75 transition-opacity bg-gray-dark ui-modal-overlay" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="inline-block h-screen align-middle" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className={clsx(
                                className,
                                sizes[size],
                                "inline-block w-full p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg",
                            )}
                        >
                            {onClose ? (
                                <button
                                    type="button"
                                    className="hidden absolute top-0 right-0 p-2 m-4 sm:block text-gray hover:text-gray-darker"
                                    onClick={onClose}
                                >
                                    <CloseIcon />
                                </button>
                            ) : null}

                            {children}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

const Header = ({ children, description, className, ...rest }) => {
    return (
        <Dialog.Title as="div" className={clsx(className, "text-center ui-modal-header")} {...rest}>
            <h3 className="text-2xl font-semibold leading-6 text-black">{children}</h3>

            {description ? (
                <p className="mt-2 text-base font-normal leading-normal text-gray-darker">{description}</p>
            ) : null}
        </Dialog.Title>
    );
};

Header.propTypes = {
    children: PropTypes.node.isRequired,
    description: PropTypes.string,
    className: PropTypes.string,
};

Header.displayName = "Modal.Header";
Modal.Header = Header;

const Body = ({ isLoading = false, className, children, ...rest }) => {
    return (
        <div className={clsx(className, "mt-10 ui-modal-body")} {...rest}>
            {isLoading ? <BodySkeleton /> : <FadeIn>{children}</FadeIn>}
        </div>
    );
};

Body.propTypes = {
    className: PropTypes.string,
};

Body.displayName = "Modal.Body";
Modal.Body = Body;

const BodySkeleton = () => {
    return (
        <>
            <div className="space-y-2 w-full">
                <Skeleton
                    height={80}
                    classNames={{
                        container: "flex flex-col justify-between w-full h-20 !border-none !bg-white",
                    }}
                >
                    <div className="flex flex-col justify-between space-y-1 w-full">
                        <div className="h-5 rounded bg-gray-lighter" />
                        <div className="h-5 rounded bg-gray-lighter" />
                        <div className="h-5 rounded bg-gray-lighter" />
                    </div>
                </Skeleton>
            </div>
            <Skeleton
                height={80}
                classNames={{
                    container: "flex flex-col space-y-2 justify-start w-full !border-none !bg-white",
                }}
            >
                <div className="flex flex-col justify-between space-y-2 w-full">
                    <div className="w-full h-4 bg-gray-lighter" />
                    <div className="w-full h-4 bg-gray-lighter" />
                    <div className="w-full h-4 bg-gray-lighter" />
                </div>
            </Skeleton>
        </>
    );
};

const Footer = ({ isLoading = false, className, children, ...rest }) => {
    return (
        <div className={clsx(className, "mt-10 space-x-4 text-right ui-modal-footer")} {...rest}>
            {isLoading ? <FooterSkeleton /> : <FadeIn className="space-x-2">{children}</FadeIn>}
        </div>
    );
};

Footer.propTypes = {
    className: PropTypes.string,
};

Footer.displayName = "Modal.Footer";
Modal.Footer = Footer;

const FooterSkeleton = () => {
    return (
        <Skeleton height={64} classNames={{ container: "!bg-white !border-none" }}>
            <div className="flex justify-end space-x-2 flex-cols-reverse">
                <div className="flex justify-center items-center px-4.5 py-3 h-[40px] w-20 bg-gray-lighter leading-base rounded">
                    Cancel
                </div>
                <div className="flex justify-center items-center px-4.5 py-3 h-[40px] w-20 bg-gray-lighter font-bold leading-base rounded">
                    Save
                </div>
            </div>
        </Skeleton>
    );
};
