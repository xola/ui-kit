import uniqueId from "lodash/uniqueId";
import PropTypes from "prop-types";
import React, { useState } from "react";

export const Checkbox = ({ label, ...rest }) => {
    const [id] = useState(rest.id ?? uniqueId("checkbox-"));

    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                className="w-4 h-4 rounded text-primary border-gray focus:primary disabled:bg-gray-lighter"
                {...rest}
                id={id}
            />

            <label htmlFor={id} className="ml-2 leading-none text-gray-darker">
                {label}
            </label>
        </div>
    );
};

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
};
