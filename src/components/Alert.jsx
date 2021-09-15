import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { CloseIcon } from "../icons/CloseIcon";

const colors = {
    primary: "bg-primary-lighter text-black",
    secondary: "bg-secondary-lighter text-black",
    success: "bg-success-lighter text-black",
    warning: "bg-warning-lighter text-black",
    danger: "bg-danger-lighter text-black",
    caution: "bg-caution-lighter text-black",
};

export const Alert = ({ className, color = "primary", onClose, children, ...rest }) => {
    return (
        <div
            className={clsx(
                "ui-alert flex items-start rounded text-base px-3 py-3 leading-4",
                colors[color],
                className,
            )}
            {...rest}
        >
            <span className="ui-alert-body w-full">{children}</span>

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
    color: PropTypes.oneOf(Object.keys(colors)),
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
};
