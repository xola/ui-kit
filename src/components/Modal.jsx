import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { forwardRef, Fragment } from "react";

const sizes = {
    small: "sm:max-w-md",
    medium: "sm:max-w-lg",
    large: "sm:max-w-2xl",
    xlarge: "sm:max-w-3xl",
};

export const Modal = ({
    size = "medium",
    show = false,
    showClose = true,
    closeOnClickOutside = false,
    onHide,
    children,
}) => {
    const childCount = React.Children.count(children);
    if (childCount < 3) {
        console.warn(`You have an insufficient number of children ${childCount}, the modal may not behave as expected`);
    }

    const [Header, Body, Footer] = children;
    const modalProps = { width: sizes[size], showClose, Header, Body, Footer };

    // Decide what method to call when the user click's outside the modal
    const onClickOutside = closeOnClickOutside ? onHide : () => {};

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={show} onClose={onClickOutside}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-dark bg-opacity-75 transition-opacity" />
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

Modal.Core = forwardRef(({ width, showClose, onClick, Header, Body, Footer }, ref) => {
    const modalClasses = clsx(
        width,
        "modal sm:w-full inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform",
        "transition-all sm:my-8 sm:align-middle",
    );

    return (
        <div ref={ref} className={modalClasses}>
            <div className="bg-white px-8 pt-5">
                <div className="hidden sm:block absolute top-0 right-0 px-8 pt-7">
                    {showClose && (
                        <div className="cursor-pointer text-xl text-gray hover:text-gray-darker" onClick={onClick}>
                            ×
                        </div>
                    )}
                </div>

                <div className="sm:flex sm:items-start">
                    <div className="text-center w-full pt-3">
                        {Header}
                        {Body}
                    </div>
                </div>
            </div>

            {Footer}
        </div>
    );
});

Modal.Core.displayName = "Modal.Core";

Modal.Header = ({ children }) => {
    return (
        <Dialog.Title as="h3" className="modal-header text-2xl leading-6 font-semibold text-black text-center">
            {children}
        </Dialog.Title>
    );
};

Modal.Header.displayName = "Modal.Header";

Modal.Body = ({ children }) => {
    return <div className="modal-body mt-2 text-left pt-8 pb-2">{children}</div>;
};

Modal.Body.displayName = "Modal.Body";

Modal.Footer = ({ children }) => {
    return <div className="modal-footer sm:flex float-right px-8 py-8">{children}</div>;
};

Modal.Footer.displayName = "Modal.Footer";
