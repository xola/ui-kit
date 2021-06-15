import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef, Fragment } from "react";

const sizes = {
    small: "sm:max-w-md",
    medium: "sm:max-w-lg",
    large: "sm:max-w-2xl",
    xlarge: "sm:max-w-3xl",
};

export const Modal = ({
    size = "medium",
    shouldShow = false,
    shouldShowClose = true,
    shouldCloseOnOutsideClick = false,
    onHide,
    children,
}) => {
    const childCount = React.Children.count(children);
    if (childCount < 3) {
        console.warn(`You have an insufficient number of children ${childCount}, the modal may not behave as expected`);
    }

    const [Header, Body, Footer] = children;
    const modalProps = { width: sizes[size], shouldShowClose, Header, Body, Footer };

    // Decide what method to call when the user click's outside the modal
    const onClickOutside = shouldCloseOnOutsideClick ? onHide : () => {};

    return (
        <Transition.Root show={shouldShow} as={Fragment}>
            <Dialog
                static
                as="div"
                className="overflow-y-auto fixed inset-0 z-10"
                open={shouldShow}
                onClose={onClickOutside}
            >
                <div className="flex justify-center items-end px-4 pt-4 pb-20 min-h-screen text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-opacity-75 transition-opacity bg-gray-dark" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Modal.Core {...modalProps} onClick={onHide} />
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

Modal.propTypes = {
    size: PropTypes.oneOf(Object.keys(sizes)),
    shouldShow: PropTypes.bool,
    shouldShowClose: PropTypes.bool,
    shouldCloseOnOutsideClick: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

const Core = forwardRef(({ width, shouldShowClose, onClick, Header, Body, Footer }, reference) => {
    const modalClasses = clsx(
        width,
        "modal sm:w-full inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform",
        "transition-all sm:my-8 sm:align-middle",
    );

    return (
        <div ref={reference} className={modalClasses}>
            <div className="px-8 pt-5 bg-white">
                <div className="hidden absolute top-0 right-0 px-8 pt-7 sm:block">
                    {shouldShowClose && (
                        <div className="text-xl cursor-pointer text-gray hover:text-gray-darker" onClick={onClick}>
                            ×
                        </div>
                    )}
                </div>

                <div className="sm:flex sm:items-start">
                    <div className="pt-3 w-full text-center">
                        {Header}
                        {Body}
                    </div>
                </div>
            </div>

            {Footer}
        </div>
    );
});

Core.displayName = "Modal.Core";
Core.propTypes = {
    width: PropTypes.string.isRequired,
    shouldShowClose: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    Header: PropTypes.element.isRequired,
    Body: PropTypes.element.isRequired,
    Footer: PropTypes.element.isRequired,
};
Modal.Core = Core;

Modal.Header = ({ children }) => {
    return (
        <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-center text-black modal-header">
            {children}
        </Dialog.Title>
    );
};

Modal.Header.displayName = "Modal.Header";
Modal.Header.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Modal.Body = ({ className, ...rest }) => {
    return <div className={clsx(className, "pt-8 pb-2 mt-2 text-left modal-body")} {...rest} />;
};

Modal.Body.displayName = "Modal.Body";
Modal.Body.propTypes = {
    className: PropTypes.string,
};

Modal.Footer = ({ className, ...rest }) => {
    return <div className={clsx(className, "float-right px-8 py-8 modal-footer sm:flex")} {...rest} />;
};

Modal.Footer.displayName = "Modal.Footer";
Modal.Footer.propTypes = {
    className: PropTypes.string,
};
