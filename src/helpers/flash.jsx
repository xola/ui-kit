import { useUpdateEffect } from "ahooks";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CloseIcon } from "../icons";
import cn from "./classnames";

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

const nextStage = {
    enterFrom: "enterTo",
    leaveFrom: "leaveTo",
};

const stageClasses = {
    enterFrom: "transition transform duration-500 ease-out -translate-y-full !opacity-0",
    enterTo: "transition transform duration-500 ease-out translate-y-0 !opacity-100",
    entered: "translate-y-0 !opacity-100",
    leaveFrom: "transition transform duration-500 ease-in !opacity-90 translate-y-0",
    leaveTo: "transition transform duration-500 ease-in !opacity-0 -translate-y-full",
};

const FlashMessage = ({ text, className, onClose, toastObject }) => {
    const [stage, setStage] = useState(toastObject.visible ? "enterFrom" : "hidden");

    useUpdateEffect(() => {
        if (toastObject.visible) {
            setStage("enterFrom");
            return;
        }

        setStage((current) => (current === "hidden" ? current : "leaveFrom"));
    }, [toastObject.visible]);

    useEffect(() => {
        const next = nextStage[stage];
        if (next) {
            let frame = requestAnimationFrame(() => {
                frame = requestAnimationFrame(() => setStage(next));
            });

            return () => cancelAnimationFrame(frame);
        }

        if (stage === "enterTo" || stage === "leaveTo") {
            const timer = setTimeout(() => setStage(stage === "enterTo" ? "entered" : "hidden"), 500);
            return () => clearTimeout(timer);
        }

        return undefined;
    }, [stage]);

    if (stage === "hidden") {
        return null;
    }

    const handleClose = (event) => onClose(event, toastObject);

    return (
        <div key={toastObject.id} className={cn(className, stageClasses[stage])}>
            <div className="w-full">{text}</div>
            {onClose && (
                <div
                    className="flex cursor-pointer items-center justify-center pl-3 opacity-60 hover:opacity-100"
                    onClick={handleClose}
                >
                    <CloseIcon />
                </div>
            )}
        </div>
    );
};

FlashMessage.propTypes = {
    text: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    toastObject: PropTypes.shape({
        id: PropTypes.string.isRequired,
        visible: PropTypes.bool.isRequired,
    }).isRequired,
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
        return toast.custom(flash.container.bind(this, text, classNames, canClose ? onClose : null), finalProps);
    },

    //
    // Shortcut methods for flash.show
    //
    primary(text, props) {
        return this.show({ color: "primary", text, ...props });
    },

    secondary(text, props) {
        return this.show({ color: "secondary", text, ...props });
    },

    success(text, props) {
        return this.show({ color: "success", text, ...props });
    },

    warning(text, props) {
        return this.show({ color: "warning", text, ...props });
    },

    caution(text, props) {
        return this.show({ color: "caution", text, ...props });
    },

    danger(text, props) {
        return this.show({ color: "danger", text, ...props });
    },

    getStyles(color, size, className) {
        return cn("flex text-white rounded pointer-events-auto", colors[color], sizes[size], className);
    },

    container(text, className, onClose, toastObject) {
        return <FlashMessage text={text} className={className} onClose={onClose} toastObject={toastObject} />;
    },

    remove(id) {
        return toast.remove(id);
    },

    dismiss(id) {
        return toast.dismiss(id);
    },
};
