import cn from "../../helpers/classnames";
import PropTypes from "prop-types";
import React, { useId } from "react";
import styles from "./Checkbox.module.css";

export const Checkbox = ({ label, className, classNames = {}, ...rest }) => {
    const id = useId("checkbox");

    return (
        <div className={cn("ui-checkbox", className, "flex items-center")}>
            <input
                type="checkbox"
                className={cn(
                    "ui-checkbox-input",
                    classNames.checkbox,
                    styles.checkbox,
                    "h-4 w-4 rounded !border-primary text-white transition-colors disabled:border-none disabled:bg-gray-light disabled:text-gray-light",
                )}
                {...rest}
                id={id}
            />

            {label ? (
                <label
                    htmlFor={id}
                    className={cn("ui-checkbox-label", classNames.label, "ml-2 leading-none text-gray-darker")}
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
