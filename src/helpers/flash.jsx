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
};

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

    getStyles(color, size, className, canClose) {
        return clsx(
            colors[color],
            sizes[size],
            "flex opacity-90 ring-1 ring-black ring-opacity-5 rounded text-white pointer-events-auto",
            className,
        );
    },

    container(text, className, onClose, toastObject) {
        console.debug(`Toasting "${text}" ${toastObject.id}`, toastObject.visible);
        return (
            <Transition
                appear
                as={Fragment}
                show={toastObject.visible}
                enter="transform transition ease-in-out duration-500"
                enterFrom="-translate-y-full opacity-0"
                enterTo="translate-y-0 filter opacity-100"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="-translate-y-full opacity-0"
            >
                <div key={toastObject.id} className={className}>
                    <div className="w-11/12">{text}</div>
                    {onClose ? (
                        <div
                            className="flex justify-center items-center pl-3 text-white hover:text-black cursor-pointer"
                            onClick={onClose.bind(this, toastObject)}
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
