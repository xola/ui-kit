import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const sizes = {
    small: "px-3 py-1.5 text-sm leading-sm", // 30px
    medium: "px-3 py-2.5 text-base leading-base", // 40px
    large: "px-5 py-3.5 text-md leading-md", // 50px
};

export const BaseInput = ({ as: Tag, size = "medium", isError, className, ...rest }) => {
    return (
        <Tag
            className={clsx(
                "w-full placeholder-gray-dark hover:placeholder-gray-darker text-gray-darker disabled:text-gray rounded",
                "disabled:bg-gray-lighter border border-transparent hover:bg-gray-lighter hover:border-black focus:text-black active:text-black",
                sizes[size],
                isError
                    ? "border-danger focus:ring-0 focus:ring-danger focus:border-danger"
                    : "border-gray-light focus:ring-0 focus:ring-primary focus:border-primary",
                className,
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
