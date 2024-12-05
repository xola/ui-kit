import cn from "../../helpers/classnames";
import { isEmpty, isString } from "lodash-es";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import { Dot } from "../Dot/Dot";

const sizes = {
    small: "px-3 py-1.5 text-sm leading-sm", // 30px
    medium: "px-3 py-2.5 text-base leading-base", // 40px
    large: "px-5 py-3.5 text-md leading-md", // 50px
};

export const BaseInput = forwardRef(
    ({ as: Tag, size = "medium", isError, className, isRequired, value, prefix, suffix, ...rest }, ref) => {
        const stringValue = () => {
            if (!isString(value)) return undefined;

            let result = value;

            /**
             * Why are we removing prefix and suffix?
             *
             * When BaseInput field is used as a component for `NumberFormat` input, the value would also include prefix and suffix.
             *
             * For Example, in UnitField (Weight) we have a suffix as " kg".
             * So, if a user enters 72, the `value` prop supplied to this component would be "72 kg".
             * and if the field is empty, the `value` would be " kg".
             *
             * Now, if we have `isRequired` set as true, and we need to show the required indicator when the field is empty.
             * We need a way to know if the `value` supplied to this component is really a value or just prefix or suffix text.
             * So, we are removing the prefix/suffix from value before comparing.
             */

            // if input contains prefix or suffix, we need to remove them
            if (prefix) result = result.replace(new RegExp(`^${prefix}`), "");

            if (suffix) result = result.replace(new RegExp(`${suffix}$`), "");

            // Remove whitespace characters currency sign for currency input
            return (
                result
                    // Remove one or more whitespace characters that are not followed by a period
                    .replaceAll(/[^.\S]+/g, "")
                    // Remove any currency symbold
                    .replace(/[\p{Sc}]/u, "")
            );
        };

        // Since the input can only be a string or a number, added the toString method for a numeric value, because lodash's IsEmpty method returns true for any number.
        const isEmptyValue = isString(value) ? isEmpty(stringValue()) : isEmpty(value?.toString());

        return (
            <div className="relative flex w-full items-center">
                <Tag
                    ref={ref}
                    className={cn(
                        "w-full rounded text-gray-darker placeholder-gray-dark hover:placeholder-gray-darker disabled:text-gray",
                        "border border-transparent hover:border-black hover:bg-gray-lighter focus:text-black active:text-black disabled:bg-gray-lighter",
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

BaseInput.propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    size: PropTypes.oneOf(Object.keys(sizes)),
    className: PropTypes.string,
    isError: PropTypes.bool,
    isRequired: PropTypes.bool,
    // eslint-disable-next-line react/require-default-props
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    prefix: PropTypes.string, // eslint-disable-line react/require-default-props
    suffix: PropTypes.string, // eslint-disable-line react/require-default-props
};

BaseInput.defaultProps = {
    as: "input",
    size: "medium",
    className: "",
    isError: false,
    isRequired: false,
};
