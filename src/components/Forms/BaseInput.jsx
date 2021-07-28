import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const sizes = {
    small: "px-2 py-1.5 text-sm",
    medium: "py-3 px-2.5 text-base",
    large: "px-4 py-3.5 text-lg",
};

export const BaseInput = ({ as: Tag, size = "medium", isError, className, ...rest }) => {
    return (
        <Tag
            className={clsx(
                "block w-full placeholder-gray-dark text-gray-darker rounded-md leading-none disabled:bg-gray-lighter",
                className,
                sizes[size],
                isError
                    ? "border-danger focus:ring-danger focus:border-danger"
                    : "border-gray-light focus:ring-primary focus:border-primary",
            )}
            {...rest}
        />
    );
};

BaseInput.propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    size: PropTypes.oneOf(Object.keys(sizes)),
    className: PropTypes.string,
    isError: PropTypes.bool,
};
