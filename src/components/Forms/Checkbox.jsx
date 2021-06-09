import clsx from "clsx";
import uniqueId from "lodash/uniqueId";
import React, { useState } from "react";
import PropTypes from "prop-types";

export const Checkbox = ({ label, className, classNames = {}, ...rest }) => {
    const [id] = useState(rest.id ?? uniqueId("checkbox-"));

    return (
        <div className={clsx(className, "flex items-center")}>
            <input
                type="checkbox"
                className={clsx(
                    classNames.checkbox,
                    "w-4 h-4 rounded text-primary border-gray focus:primary disabled:bg-gray-light disabled:text-gray-light disabled:border-none transition-colors",
                )}
                {...rest}
                id={id}
            />

            {label ? (
                <label htmlFor={id} className={clsx(classNames.label, "ml-2 leading-none text-gray-darker")}>
                    {label}
                </label>
            ) : null}
        </div>
    );
};

Checkbox.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    classNames: PropTypes.shape({ checkbox: PropTypes.string, label: PropTypes.string }),
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};
