import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { CloseIcon } from "../icons/CloseIcon";

// Widths are for desktop designs because mobile is always full width
const sizes = {
    small: "sm:max-w-100",
    medium: "sm:max-w-125",
    large: "sm:max-w-150",
    huge: "sm:max-w-200",
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
            <Dialog as="div" className="ui-modal fixed inset-0 z-30 overflow-y-auto" onClose={handleOutsideClick}>
                <div className="min-h-screen p-0 text-center">
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

                    {/* For desktop only this element is to trick the browser into centering the modal contents. */}
                    <span className="hidden h-screen align-middle sm:inline-block" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500 sm:duration-300"
                        enterFrom="opacity-0 translate-y-30 sm:translate-y-4 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-500 sm:duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-full sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className={clsx(
                                className,
                                sizes[size],
                                "absolute bottom-0 sm:relative sm:inline-block sm:inline-block",
                                "w-full transform overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-white py-4 px-8",
                                "text-left shadow-xl transition-all sm:rounded-lg sm:p-10",
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

                            {/* Show a little bar at the top in mobile only to show you can swipe this down */}
                            <div className="absolute left-1/2 h-1.5 w-18 -translate-x-1/2 rounded-full bg-black opacity-10 sm:hidden"></div>

                            {/* The actual content of the modal with padding for mobile only */}
                            <div className="pt-6 sm:pt-0">{children}</div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
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
