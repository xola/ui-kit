import { Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { Fragment } from "react";
import toast from "react-hot-toast";
import { CloseIcon } from "../icons/CloseIcon";

const colors = {
    primary: "bg-primary",
    secondary: "bg-secondary-dark",
    success: "bg-success-dark",
    warning: "bg-warning",
    danger: "bg-danger",
    caution: "bg-caution-dark",
};

const sizes = {
    small: "px-3 py-2 text-sm leading-3.5 shadow max-w-[200px]",
    medium: "px-4 py-3 text-base leading-4 shadow-md max-w-[400px]",
    large: "px-4 py-4 text-lg leading-4.5 shadow-lg max-w-xl",
};

const defaultProps = {
    duration: 3000,
    position: "top-right",
    reverseOrder: false,
};

/**
 * React Hot Toast https://react-hot-toast.com/docs
 */
export const flash = {
    show({ text, size = "medium", color = "success", className, canClose = true, onClose, children, ...rest }) {
        if (canClose && !onClose) {
            console.warn("If you like to close the alert, please define `onClose`");
        }

        const finalProps = { ...defaultProps, ...rest };
        if (!canClose) {
            finalProps.duration = Number.POSITIVE_INFINITY;
        }

        const classNames = flash.getStyles(color, size, className, canClose);
        console.debug("Toast props", finalProps);
        toast.custom(flash.container.bind(this, text, classNames, canClose ? onClose : null), finalProps);
    },

    getStyles(color, size, className) {
        return clsx(
            "flex opacity-90 ring-1 ring-black ring-opacity-5 rounded text-white pointer-events-auto",
            colors[color],
            sizes[size],
            className,
        );
    },

    container(text, className, onClose, toastObject) {
        console.debug(`Toasting "${text}" ${toastObject.id}`, toastObject.visible);
        const onCloseWrapper = (event) => onClose(event, toastObject);

        return (
            <Transition
                appear
                as={Fragment}
                show={toastObject.visible}
                enter="transition transform duration-500 ease-out"
                enterFrom="-translate-y-full !opacity-0"
                enterTo="translate-y-0 !opacity-90"
                leave="transition transform duration-500 ease-in"
                leaveFrom="!opacity-90"
                leaveTo="!opacity-0"
            >
                <div key={toastObject.id} className={className}>
                    <div className="w-full">{text}</div>
                    {onClose ? (
                        <div
                            className="flex justify-center items-center pl-3 text-white hover:text-black cursor-pointer"
                            onClick={onCloseWrapper}
                        >
                            <CloseIcon />
                        </div>
                    ) : null}
                </div>
            </Transition>
        );
    },

    dismiss(id) {
        console.log("Dismissing", id ?? "All!");
        toast.dismiss(id);
    },
};
