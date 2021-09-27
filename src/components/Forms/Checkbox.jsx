import clsx from "clsx";
import uniqueId from "lodash/uniqueId";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styles from "./Checkbox.module.css";

export const Checkbox = ({ label, className, classNames = {}, ...rest }) => {
    const [id] = useState(rest.id ?? uniqueId("checkbox-"));

    return (
        <div className={clsx("ui-checkbox", className, "flex items-center")}>
            <input
                type="checkbox"
                className={clsx(
                    "ui-checkbox-input",
                    classNames.checkbox,
                    styles.checkbox,
                    "w-4 h-4 rounded text-white !border-primary disabled:bg-gray-light disabled:text-gray-light disabled:border-none transition-colors",
                )}
                {...rest}
                id={id}
            />

            {label ? (
                <label
                    htmlFor={id}
                    className={clsx("ui-checkbox-label", classNames.label, "ml-2 leading-none text-gray-darker")}
                >
                    {label}
                </label>
            ) : null}
        </div>
    );
};

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    classNames: PropTypes.shape({ checkbox: PropTypes.string, label: PropTypes.string }),
    onChange: PropTypes.func,
};
