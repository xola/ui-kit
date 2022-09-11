import { Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { Fragment } from "react";
import toast from "react-hot-toast";
import { CloseIcon } from "../icons/CloseIcon";

const colors = {
    primary: "bg-primary-lighter border border-primary-light/20",
    secondary: "bg-secondary-lighter border border-secondary-light",
    success: "bg-success-lighter border border-success-light/20",
    warning: "bg-warning-light border border-warning/30",
    danger: "bg-danger-light border border-danger/30",
    caution: "bg-caution-lighter border border-caution-light/20",
};

const sizes = {
    small: "px-3 py-2 text-sm leading-3.5 max-w-50",
    medium: "px-4 py-3.5 text-base leading-4 max-w-100",
    large: "px-4.5 py-4 text-md leading-4.5 max-w-xl",
};

const defaultProps = {
    duration: 3000,
    position: "bottom-right",
    reverseOrder: false,
};

/**
 * React Hot Toast https://react-hot-toast.com/docs
 */
export const flash = {
    show({ text, size = "medium", color = "success", className, canClose = true, onClose, children, ...rest }) {
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
        this.show({ color: "danger", text, text, ...props });
    },

    getStyles(color, size, className) {
        return clsx("flex text-black rounded pointer-events-auto", colors[color], sizes[size], className);
    },

    container(text, className, onClose, toastObject) {
        const onCloseWrapper = (event) => onClose(event, toastObject);

        return (
            <Transition
                appear
                as={Fragment}
                show={toastObject.visible}
                enter="transition transform duration-500 ease-out"
                enterFrom="translate-y-full !opacity-0"
                enterTo="translate-y-0 !opacity-90"
                leave="transition transform duration-500 ease-in"
                leaveFrom="!opacity-90"
                leaveTo="!opacity-0"
            >
                <div key={toastObject.id} className={className}>
                    <div className="w-full">{text}</div>
                    {onClose ? (
                        <div
                            className="flex cursor-pointer items-center justify-center pl-3 text-gray-dark hover:text-black"
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
        toast.dismiss(id);
    },
};
