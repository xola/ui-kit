import { isEmpty, isString } from "lodash-es";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import cn from "../../helpers/classnames";
import { Dot } from "../Dot/Dot";

const sizes = {
    small: "px-3 py-1.5 text-sm leading-sm", // 30px
    medium: "px-3 py-2.5 text-base leading-base", // 40px
    large: "px-5 py-3.5 text-md leading-md", // 50px
};

export const BaseInput = forwardRef(
    (
        {
            as: Tag = "input",
            size = "medium",
            isError = false,
            className = "",
            isRequired = false,
            value,
            prefix,
            suffix,
            ...rest
        },
        ref,
    ) => {
        const stringValue = () => {
            let result = value;

            // NumberFormat includes the prefix/suffix in `value` (e.g. " kg" when the field is
            // empty), so strip them before the empty check that drives the required indicator.

            if (prefix) result = result.replace(new RegExp(`^${prefix}`), "");

            if (suffix) result = result.replace(new RegExp(`${suffix}$`), "");

            // Strip whitespace and the currency symbol so decoration alone does not count as content.
            return result.replaceAll(/[^.\S]+/g, "").replace(/[\p{Sc}]/u, "");
        };

        // lodash's isEmpty returns true for any number, so numbers are stringified before checking.
        const isEmptyValue = isString(value) ? isEmpty(stringValue()) : isEmpty(value?.toString());

        return (
            <div className="relative flex w-full items-center">
                <Tag
                    ref={ref}
                    className={cn(
                        "w-full rounded text-gray-darker placeholder-gray-dark hover:placeholder-gray-darker disabled:text-gray",
                        "border hover:border-black hover:bg-gray-lighter focus:text-black active:text-black disabled:bg-gray-lighter",
                        sizes[size],
                        isError
                            ? "!focus:border-danger !border-danger focus:ring-0 focus:ring-danger"
                            : "border-gray-light focus:border-primary focus:ring-0 focus:ring-primary",
                        className,
                    )}
                    value={value}
                    {...rest}
                />
                {isRequired && isEmptyValue && <Dot className="absolute right-3" color="danger" />}
            </div>
        );
    },
);

BaseInput.displayName = "BaseInput";

BaseInput.propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    size: PropTypes.oneOf(Object.keys(sizes)),
    className: PropTypes.string,
    isError: PropTypes.bool,
    isRequired: PropTypes.bool,

    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    prefix: PropTypes.string,
    suffix: PropTypes.string,
};
