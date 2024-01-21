import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { useId } from "../../hooks/useId";
import styles from "./Checkbox.module.css";

export const Checkbox = ({ label, className, classNames = {}, ...rest }) => {
    const id = useId("checkbox");

    return (
        <div className={clsx("ui-checkbox", className, "flex items-center")}>
            <input
                type="checkbox"
                className={clsx(
                    "ui-checkbox-input",
                    classNames.checkbox,
                    styles.checkbox,
                    "!border-primary disabled:bg-gray-light disabled:text-gray-light h-4 w-4 rounded text-white transition-colors disabled:border-none",
                )}
                {...rest}
                id={id}
            />

            {label ? (
                <label
                    htmlFor={id}
                    className={clsx("ui-checkbox-label", classNames.label, "text-gray-darker ml-2 leading-none")}
                >
                    {label}
                </label>
            ) : null}
        </div>
    );
};

Checkbox.propTypes = {
    label: PropTypes.node.isRequired,
    className: PropTypes.string,
    classNames: PropTypes.shape({ checkbox: PropTypes.string, label: PropTypes.string }),
    onChange: PropTypes.func,
};
