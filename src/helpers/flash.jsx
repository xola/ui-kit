import { Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { Fragment } from "react";
import toast from "react-hot-toast";
import { CloseIcon } from "../icons/index.js";

const colors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    caution: "bg-caution",
};

const sizes = {
    small: "px-3 py-2 text-sm leading-3.5 shadow max-w-50",
    medium: "px-4 py-3.5 text-base leading-4 shadow max-w-100",
    large: "px-4.5 py-4 text-md leading-4.5 shadow max-w-xl",
};

const defaultProps = {
    duration: 3000,
    position: "top-center",
    reverseOrder: false,
};

/**
 * React Hot Toast https://react-hot-toast.com/docs
 */
export const flash = {
    show({ text, size = "medium", color = "success", className, canClose = true, onClose, ...rest }) {
        const finalProps = { ...defaultProps, ...rest };
        if (!canClose) {
            finalProps.duration = Number.POSITIVE_INFINITY;
        }

        const classNames = flash.getStyles(color, size, className, canClose);
        toast.custom(flash.container.bind(this, text, classNames, canClose ? onClose : null), finalProps);
    },

    //
    // Shortcut methods for flash.show
    //
    primary(text, props) {
        this.show({ color: "primary", text, ...props });
    },

    secondary(text, props) {
        this.show({ color: "secondary", text, ...props });
    },

    success(text, props) {
        this.show({ color: "success", text, ...props });
    },

    warning(text, props) {
        this.show({ color: "warning", text, ...props });
    },

    caution(text, props) {
        this.show({ color: "caution", text, ...props });
    },

    danger(text, props) {
        this.show({ color: "danger", text, ...props });
    },

    getStyles(color, size, className) {
        return clsx("flex text-white rounded pointer-events-auto", colors[color], sizes[size], className);
    },

    container(text, className, onClose, toastObject) {
        const onCloseWrapper = (event) => onClose(event, toastObject);

        return (
            <Transition
                appear
                as={Fragment}
                show={toastObject.visible}
                enter="transition transform duration-500 ease-out"
                enterFrom="-translate-y-full !opacity-0"
                enterTo="translate-y-0 !opacity-100"
                leave="transition transform duration-500 ease-in"
                leaveFrom="!opacity-90 translate-y-0"
                leaveTo="!opacity-0 -translate-y-full"
            >
                <div key={toastObject.id} className={className}>
                    <div className="w-full">{text}</div>
                    {onClose && (
                        <div
                            className="flex cursor-pointer items-center justify-center pl-3 opacity-60 hover:opacity-100"
                            onClick={onCloseWrapper}
                        >
                            <CloseIcon />
                        </div>
                    )}
                </div>
            </Transition>
        );
    },

    dismiss(id) {
        toast.dismiss(id);
    },
};
