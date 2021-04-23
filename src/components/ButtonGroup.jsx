import clsx from "clsx";
import React, { Children, cloneElement } from "react";

// TODO: Refactor active/onChange logic (like we did for Tabs).

const sizes = {
    small: "px-2 py-1.5 text-sm",
    medium: "py-3 px-2.5 text-base",
    large: "px-4 py-3.5 text-lg",
};

const ButtonGroup = ({ children, size, ...rest }) => {
    return (
        <span className="inline-flex" {...rest}>
            {Children.map(children, (child) => {
                return cloneElement(child, { size });
            })}
        </span>
    );
};

const Button = ({ active, size = "medium", ...rest }) => {
    const className = clsx(
        "border-t border-l border-b last:border-r first:rounded-l-md last:rounded-r-md transition-colors focus:ring disabled:opacity-50 focus:z-10 leading-none",
        sizes[size],
        {
            "bg-primary border-primary text-white hover:bg-primary-dark": active,
            "border-gray-light hover:bg-gray-lighter text-gray-darker": !active,
        },
    );

    return <button className={className} {...rest} />;
};

ButtonGroup.Button = Button;

export { ButtonGroup };
