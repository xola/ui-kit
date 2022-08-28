import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { Dot } from "../Dot";
import "./BaseInput.css";

const sizes = {
    small: "px-3 py-1.5 text-sm leading-sm", // 30px
    medium: "px-3 py-2.5 text-base leading-base", // 40px
    large: "px-5 py-3.5 text-md leading-md", // 50px
};

export const BaseInput = ({ as: Tag, size = "medium", isError, className, isRequired, ...rest }) => {
    return (
        <div className="relative flex w-full items-center">
            <Tag className={clsx("ui-input-tag", sizes[size], isError && "ui-input-tag-error", className)} {...rest} />
            {isRequired && <Dot className="absolute right-3" color="danger" />}
        </div>
    );
};

BaseInput.propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    size: PropTypes.oneOf(Object.keys(sizes)),
    className: PropTypes.string,
    isError: PropTypes.bool,
    isRequired: PropTypes.bool,
};
