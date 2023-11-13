import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { CloseIcon } from "../icons/CloseIcon";

export const alertColors = {
    primary: "bg-primary-lighter text-black",
    secondary: "bg-secondary-lighter text-black",
    success: "bg-success-lighter text-black",
    warning: "bg-warning-lighter text-black",
    danger: "bg-danger-lighter text-black",
    caution: "bg-caution-lighter text-black",
};

export const Alert = ({ color = "primary", onClose, className, children, ...rest }) => {
    return (
        <div
            className={clsx(
                "ui-alert flex items-start rounded px-3 py-3 text-base leading-4",
                alertColors[color],
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

Alert.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(alertColors)),
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
};
