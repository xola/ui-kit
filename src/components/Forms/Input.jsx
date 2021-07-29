import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const sizes = {
    small: "px-2 py-[7px] text-sm leading-3.5",
    medium: "px-3 py-[11px] text-base leading-4",
    large: "px-4 py-[15px] text-lg leading-4.5",
};

export const Input = ({ size = "medium", className, type = "text", isError, ...rest }) => {
    return (
        <input
            type={type}
            className={clsx(
                className,
                "w-full placeholder-gray-dark hover:placeholder-gray-darker text-gray-darker disabled:text-gray rounded",
                "disabled:bg-gray-lighter border border-transparent hover:bg-gray-lighter hover:border-black",
                sizes[size],
                isError
                    ? "border-danger focus:ring-0 focus:border-danger"
                    : "border-gray-light focus:ring-0 focus:border-black",
            )}
            {...rest}
        />
    );
};

Input.propTypes = {
    size: PropTypes.oneOf(Object.keys(sizes)),
    className: PropTypes.string,
    type: PropTypes.string,
    isError: PropTypes.bool,
};
