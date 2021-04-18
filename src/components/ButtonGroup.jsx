import clsx from "clsx";
import React, { Children, cloneElement } from "react";

const sizes = {
    small: "px-2 py-1.5 text-sm",
    medium: "py-3 px-2.5 text-base",
    large: "px-4 py-3.5 text-lg",
};

const ButtonGroup = ({ children, size, ...rest }) => {
    const childrenCount = Children.count(children);

    return (
        <span className="inline-flex" {...rest}>
            {Children.map(children, (child, index) => {
                const isFirst = index === 0;
                const isLast = index + 1 === childrenCount;
                return cloneElement(child, { isFirst, isLast, size });
            })}
        </span>
    );
};

const Button = ({ isActive, isFirst, isLast, size = "medium", ...rest }) => {
    const className = clsx(
        "border-t border-l border-b transition-colors focus:ring disabled:opacity-50 focus:z-10",
        sizes[size],
        {
            "rounded-l-md": isFirst,
            "rounded-r-md border-r": isLast,
            "bg-primary border-primary text-white hover:bg-primary-dark": isActive,
            "border-gray-light hover:bg-gray-lighter text-gray-darker": !isActive,
        },
    );

    return <button className={className} {...rest} />;
};

ButtonGroup.Button = Button;

export { ButtonGroup };
