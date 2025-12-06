import clsx from "clsx";
import React from "react";
import { CloseIcon } from "../icons";

const colors = {
    primary: "bg-primary-lighter text-black",
    secondary: "bg-secondary-lighter text-black",
    success: "bg-success-lighter text-black",
    warning: "bg-warning-lighter text-black",
    danger: "bg-danger-lighter text-black",
    caution: "bg-caution-lighter text-black",
} as const;

type AlertColor = keyof typeof colors;

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: AlertColor;
    children: React.ReactNode;
    className?: string;
    onClose?: () => void;
}

export const Alert = ({ color = "primary", children, className, onClose, ...rest }: AlertProps) => {
    return (
        <div
            className={clsx(
                "ui-alert flex items-start rounded px-3 py-3 text-base leading-4",
                colors[color],
                className,
            )}
            {...rest}
        >
            <span className="ui-alert-content w-full leading-p1">{children}</span>

            {onClose ? (
                <button type="button" className="ui-alert-close ml-3 cursor-pointer hover:text-gray-dark">
                    <CloseIcon onClick={onClose} />
                </button>
            ) : null}
        </div>
    );
};
