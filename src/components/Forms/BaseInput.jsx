import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

const sizes = {
    small: "px-3 py-1.5 text-sm leading-sm", // 30px
    medium: "px-3 py-2.5 text-base leading-base", // 40px
    large: "px-5 py-3.5 text-md leading-md", // 50px
};

export const BaseInput = forwardRef(({ as: Tag, size = "medium", isError, className, ...rest }, reference) => {
    return (
        <Tag
            className={clsx(
                "w-full rounded text-gray-darker placeholder-gray-dark hover:placeholder-gray-darker disabled:text-gray",
                "border border-transparent hover:border-black hover:bg-gray-lighter focus:text-black active:text-black disabled:bg-gray-lighter",
                sizes[size],
                isError
                    ? "border-danger focus:border-danger focus:ring-0 focus:ring-danger"
                    : "border-gray-light focus:border-primary focus:ring-0 focus:ring-primary",
                className,
            )}
            {...rest}
            ref={reference}
        />
    );
});

BaseInput.propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    size: PropTypes.oneOf(Object.keys(sizes)),
    className: PropTypes.string,
    isError: PropTypes.bool,
};
