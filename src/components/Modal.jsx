import clsx from "clsx";
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

export const Modal = ({ size, show, showClose, closeOnClickOutside, onHide, children }) => {
    const childCount = React.Children.count(children);
    if (childCount < 3) {
        console.warn(`You have an insufficient number of children ${childCount}, the modal may not behave as expected`);
    }

    const [open, setOpen] = useState(show);
    const [Header, Body, Footer] = children;

    size = size || "md";
    const width = `sm:max-w-${size}`; // Tailwind JIT won't pick this up
    const modalArgs = { width, showClose, Header, Body, Footer };

    // Decide what method to call when the user click's outside the modal
    const onClickOutside = closeOnClickOutside ? setOpen : () => {};

    useEffect(() => {
        // Invoked when someone outside this component wants the modal to open or close
        setOpen(show);
    }, [show]);

    useEffect(() => {
        // Invoked when the modal asked itself to close (clicking "X" or outside the modal). Tell the parent the modal
        // has closed
        if (open !== show) {
            onHide();
        }
    }, [open]);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={open} onClose={onClickOutside}>
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
                        <Modal.Core {...modalArgs} onClick={() => setOpen(false)} />
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

Modal.Core = React.forwardRef((props, ref) => {
    const modalClasses = clsx(
        props.width,
        "modal sm:w-full inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform",
        "transition-all sm:my-8 sm:align-middle",
    );
    return (
        <div ref={ref} className={modalClasses}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                    {props.showClose && (
                        <div className="cursor-pointer text-xl text-gray hover:text-black" onClick={props.onClick}>
                            ×
                        </div>
                    )}
                </div>
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 w-full">
                        {props.Header}
                        {props.Body}
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex float-right">{props.Footer}</div>
        </div>
    );
});
Modal.Core.displayName = "Modal.Core";

Modal.Header = ({ children }) => {
    return (
        <Dialog.Title as="h3" className="text-xl leading-6 font-medium text-black text-center">
            {children}
        </Dialog.Title>
    );
};
Modal.Header.displayName = 'Modal.Header';

Modal.Body = ({ children }) => {
    return <div className="mt-2 text-left">{children}</div>;
};
Modal.Body.displayName = "Modal.Body";

Modal.Footer = ({ children }) => {
    return children;
};
Modal.Footer.displayName = "Modal.Footer";