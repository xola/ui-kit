import uniqueId from "lodash/uniqueId";
import React from "react";

const Checkbox = ({ label, id = uniqueId("checkbox-"), ...rest }) => {
    return (
        <div className="flex items-center">
            <input
                id={id}
                type="checkbox"
                className="w-4 h-4 rounded text-primary border-gray focus:primary disabled:bg-gray-lighter"
                {...rest}
            />

            <label htmlFor={id} className="ml-2 text-gray-darker leading-none">
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
