import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { CloseIcon } from "../icons/CloseIcon";

export const sizes = {
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

const animations = {
    center: {
        enterFrom: "translate-y-4 sm:translate-y-0 sm:scale-95",
        enterTo: "translate-y-0 sm:scale-100",
        leaveFrom: "translate-y-0 sm:scale-100",
        leaveTo: "translate-y-4 sm:translate-y-0 sm:scale-95",
    },
    topLeft: {
        enterFrom: "scale-0 origin-top-left",
        enterTo: "scale-100 origin-top-left",
        leaveFrom: "scale-100 origin-top-left",
        leaveTo: "scale-0 origin-top-left",
    },
    topRight: {
        enterFrom: "scale-0 origin-top-right",
        enterTo: "scale-100 origin-top-right",
        leaveFrom: "scale-100 origin-top-right",
        leaveTo: "scale-0 origin-top-right",
    },
    bottomLeft: {
        enterFrom: "scale-0 origin-bottom-left",
        enterTo: "scale-100 origin-bottom-left",
        leaveFrom: "scale-100 origin-bottom-left",
        leaveTo: "scale-0 origin-bottom-left",
    },
    bottomRight: {
        enterFrom: "scale-0 origin-bottom-right",
        enterTo: "scale-100 origin-bottom-right",
        leaveFrom: "scale-100 origin-bottom-right",
        leaveTo: "scale-0 origin-bottom-right",
    },
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
    const handleOutsideClick = () => {
        if (shouldCloseOnOutsideClick) {
            onClose();
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="ui-modal fixed inset-0 z-30 overflow-y-auto" onClose={handleOutsideClick}>
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="ui-modal-overlay fixed inset-0 bg-gray-dark bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    {position === "center" && (
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                    )}

                    <Transition.Child
                        as={Fragment}
                        enter={clsx("ease-out duration-300")}
                        enterFrom={clsx("opacity-0", animations[position].enterFrom)}
                        enterTo={clsx("opacity-100", animations[position].enterTo)}
                        leave={clsx("ease-in duration-300")}
                        leaveFrom={clsx("opacity-100", animations[position].leaveFrom)}
                        leaveTo={clsx("opacity-0", animations[position].leaveTo)}
                    >
                        <div
                            className={clsx(
                                className,
                                sizes[size],
                                positions[position],
                                "w-full transform overflow-hidden rounded-lg bg-white p-10 text-left align-middle shadow-xl transition-all",
                            )}
                        >
                            {onClose ? (
                                <button
                                    type="button"
                                    className="absolute top-0 right-0 m-4 hidden p-2 text-gray hover:text-gray-darker sm:block"
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
        <Dialog.Title as="div" className={clsx(className, "ui-modal-header text-center")} {...rest}>
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

const Body = ({ className, ...rest }) => {
    return <div className={clsx(className, "ui-modal-body mt-10")} {...rest} />;
};

Body.propTypes = {
    className: PropTypes.string,
};

Body.displayName = "Modal.Body";
Modal.Body = Body;

const Footer = ({ className, ...rest }) => {
    return <div className={clsx(className, "ui-modal-footer mt-10 space-x-4 text-right")} {...rest} />;
};

Footer.propTypes = {
    className: PropTypes.string,
};

Footer.displayName = "Modal.Footer";
Modal.Footer = Footer;
