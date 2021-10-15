import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef, Fragment } from "react";
import { getChildByType } from "../helpers/children";
import { CloseIcon } from "../icons/CloseIcon";

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
    const header = getChildByType(children, Modal.Header);
    const body = getChildByType(children, Modal.Body);
    const footer = getChildByType(children, Modal.Footer);

    const handleOutsideClick = () => {
        if (shouldCloseOnOutsideClick) {
            onClose();
        }
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                static
                as="div"
                className="fixed inset-0 z-30 overflow-y-auto ui-modal"
                open={isOpen}
                onClose={handleOutsideClick}
            >
                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
                    <span className="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Modal.Core
                            className={className}
                            width={sizes[size]}
                            header={header}
                            body={body}
                            footer={footer}
                            onClose={onClose}
                        />
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

Modal.propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf(Object.keys(sizes)),
    isOpen: PropTypes.bool,
    shouldCloseOnOutsideClick: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

const Core = forwardRef(({ className, width, onClose, header, body, footer }, reference) => {
    const classes = clsx(
        "ui-modal",
        className,
        width,
        "sm:w-full inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform",
        "transition-all sm:my-8 sm:align-middle",
    );

    return (
        <div ref={reference} className={classes}>
            <div className="px-8 pt-5 bg-white">
                <div className="absolute top-0 right-0 hidden px-8 pt-7 sm:block">
                    {onClose ? (
                        <div className="text-xl cursor-pointer text-gray hover:text-gray-darker" onClick={onClose}>
                            <CloseIcon />
                        </div>
                    ) : null}
                </div>

                <div className="sm:flex sm:items-start">
                    <div className="w-full pt-3 text-center">
                        {header}
                        {body}
                    </div>
                </div>
            </div>

            {footer}
        </div>
    );
});

Core.displayName = "Modal.Core";
Core.propTypes = {
    // ESLint is lying about the rule bellow.
    // eslint-disable-next-line react/require-default-props
    className: PropTypes.string,
    width: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    header: PropTypes.element.isRequired,
    body: PropTypes.element.isRequired,
    footer: PropTypes.element.isRequired,
};
Modal.Core = Core;

// ESLint is lying about the rule bellow.
Modal.Header = ({ children, description }) => {
    return (
        <Dialog.Title as="div" className="text-center">
            <h3 className="text-2xl font-semibold leading-6 text-black ui-modal-header">{children}</h3>

            {description ? (
                <p className="mt-2 text-base font-normal leading-normal text-gray-darker">{description}</p>
            ) : null}
        </Dialog.Title>
    );
};

Modal.Header.displayName = "Modal.Header";
Modal.Header.propTypes = {
    children: PropTypes.node.isRequired,
    description: PropTypes.string,
};

// ESLint is lying about the rule bellow.
Modal.Body = ({ className, ...rest }) => {
    return <div className={clsx("ui-modal-body", className, "pt-8 pb-2 mt-2 text-left")} {...rest} />;
};

Modal.Body.displayName = "Modal.Body";
Modal.Body.propTypes = {
    className: PropTypes.string,
};

// ESLint is lying about the rule bellow.
Modal.Footer = ({ className, ...rest }) => {
    return (
        <div className={clsx("ui-modal-footer", className, "float-right px-8 py-8 modal-footer sm:flex")} {...rest} />
    );
};

Modal.Footer.displayName = "Modal.Footer";
Modal.Footer.propTypes = {
    className: PropTypes.string,
};
