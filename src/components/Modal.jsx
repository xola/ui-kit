import clsx from "clsx";
import { Button } from "./Button";
import React, { Fragment, useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

const CancelButton = React.forwardRef((props, ref) => {
    return (
        <Button
            className={clsx(props.cancelButtonClass, "w-full sm:w-auto sm:text-sm sm:ml-3")}
            color="outline"
            ref={ref}
            onClick={props.onClose}
        >
            {props.cancelText}
        </Button>
    );
});

export const Modal = ({ primaryText = "Cancel Booking", cancelText = "Cancel", onHide, children }) => {
    const [open, setOpen] = useState(true);
    const Header = children[0];
    const Body = children[1];

    const cancelButtonRef = useRef();

    const size = "sm:max-w-2xl"; // props.rable value
    const primaryButtonClass = "";
    const cancelButtonClass = "";

    const modalArgs = {
        size,
        primaryText,
        cancelText,
        primaryButtonClass,
        cancelButtonClass,
        Header,
        Body,
    };

    useEffect(() => {
        console.log("use effect", open);
        !open && setTimeout(onHide, 1000);
    });

    console.log("Open is now", open);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={open}
                onClose={setOpen}
            >
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
                        <Modal.Core {...modalArgs} onClick={() => setOpen(false)} onHide={() => setOpen(false)} />
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

Modal.Core = React.forwardRef((props, ref) => {
    console.log("props on click", props);

    const modalClasses = clsx(
        props.size,
        "modal sm:w-full inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle",
    );
    return (
        <div ref={ref} className={modalClasses}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 w-full">
                        {props.Header}
                        {props.Body}
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                    className={clsx(props.primaryButtonClass, "w-full sm:w-auto sm:text-sm sm:ml-3")}
                    color="danger"
                    onClick={props.onClick}
                >
                    {props.primaryText}
                </Button>

                <CancelButton {...props} onClose={props.onHide} />
            </div>
        </div>
    );
});

Modal.Header = ({ children }) => {
    return (
        <Dialog.Title as="h3" className="text-xl leading-6 font-medium text-black text-center">
            {children}
        </Dialog.Title>
    );
};

Modal.Body = ({ children }) => {
    return <div className="mt-2 text-left">{children}</div>;
};
