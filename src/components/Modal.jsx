import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { CloseIcon } from "..";

const sizes = {
    small: "sm:max-w-md",
    medium: "sm:max-w-lg",
    large: "sm:max-w-2xl",
    huge: "sm:max-w-3xl",
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
            <Dialog as="div" className="fixed inset-0 z-30 overflow-y-auto" onClose={handleOutsideClick}>
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
                        <Dialog.Overlay className="fixed inset-0 transition-opacity bg-opacity-75 bg-gray-dark" />
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
                                    className="absolute top-0 right-0 hidden p-2 m-4 sm:block text-gray hover:text-gray-darker"
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

const Header = ({ children, description, ...rest }) => {
    return (
        <Dialog.Title as="div" className="text-center" {...rest}>
            <h3 className="text-2xl font-semibold leading-6 text-black ui-modal-header">{children}</h3>

            {description ? (
                <p className="mt-2 text-base font-normal leading-normal text-gray-darker">{description}</p>
            ) : null}
        </Dialog.Title>
    );
};

Header.propTypes = {
    children: PropTypes.node.isRequired,
    description: PropTypes.string,
};

Header.displayName = "Modal.Header";
Modal.Header = Header;

const Body = ({ className, ...rest }) => {
    return <div className={clsx(className, "mt-10 ui-modal-body")} {...rest} />;
};

Body.propTypes = {
    className: PropTypes.string,
};

Body.displayName = "Modal.Body";
Modal.Body = Body;

const Footer = ({ className, ...rest }) => {
    return <div className={clsx(className, "mt-10 space-x-4 text-right ui-modal-footer")} {...rest} />;
};

Footer.propTypes = {
    className: PropTypes.string,
};

Footer.displayName = "Modal.Footer";
Modal.Footer = Footer;
