import uniqueId from "lodash/uniqueId";
import React, { useState } from "react";

const Checkbox = ({ label, ...rest }) => {
    const [id] = useState(rest.id ?? uniqueId("checkbox-"));

    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                className="w-4 h-4 rounded text-primary border-gray focus:primary disabled:bg-gray-lighter"
                {...rest}
                id={id}
            />

            <label htmlFor={id} className="ml-2 text-gray-darker leading-none">
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
