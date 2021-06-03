import clsx from "clsx";
import React, { Children, cloneElement, createElement } from "react";

const sizes = {
    small: "px-2 py-1.5 text-sm",
    medium: "py-3 px-2.5 text-base",
    large: "px-4 py-3.5 text-lg",
};

const ButtonGroup = ({ children, size, value, onChange, ...rest }) => {
    return (
        <span className="inline-flex whitespace-nowrap" {...rest}>
            {Children.map(children, (child, index) => {
                const buttonProps = { size };

                // Conditionally adding props like this so that we
                // are also able to control the props on `ButtonGroup.Button`
                // directly, if `value` and `onChange` are not passed on the parent.
                if (value !== undefined) {
                    buttonProps.active = value === index;
                }

                if (onChange) {
                    buttonProps.onClick = () => onChange(index);
                }

                return cloneElement(child, buttonProps);
            })}
        </span>
    );
};

const Button = ({ active, as = "button", size = "medium", className, ...rest }) => {
    const classes = clsx(
        "border-t border-l border-b last:border-r first:rounded-l-md last:rounded-r-md transition-colors focus:ring disabled:opacity-60 focus:z-10 leading-none",
        sizes[size],
        active
            ? "bg-primary border-primary text-white hover:bg-primary-dark"
            : "border-gray-light hover:bg-gray-lighter text-gray-darker",
        className,
    );

    return createElement(as, { className: classes, ...rest });
};

ButtonGroup.Button = Button;

export { ButtonGroup };
