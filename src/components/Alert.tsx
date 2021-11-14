import clsx from "clsx";
import React, { HTMLAttributes } from "react";
import { CloseIcon } from "../icons/CloseIcon";

const colors = {
    primary: "bg-primary-lighter text-black",
    secondary: "bg-secondary-lighter text-black",
    success: "bg-success-lighter text-black",
    warning: "bg-warning-lighter text-black",
    danger: "bg-danger-lighter text-black",
    caution: "bg-caution-lighter text-black",
};

interface AlertProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
    color?: keyof typeof colors;
    onClose?: () => void;
}

export const Alert = ({ className, color = "primary", onClose, children, ...rest }: AlertProps) => {
    return (
        <div
            className={clsx(
                "ui-alert flex items-start rounded text-base px-3 py-3 leading-4",
                colors[color],
                className,
            )}
            {...rest}
        >
            <span className="w-full ui-alert-content">{children}</span>

            {onClose ? (
                <button type="button" className="ml-3 cursor-pointer ui-alert-close hover:text-gray-dark">
                    <CloseIcon onClick={onClose} />
                </button>
            ) : null}
        </div>
    );
};
