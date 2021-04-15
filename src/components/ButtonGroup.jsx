import clsx from "clsx";
import React, { Children, cloneElement } from "react";

const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-5 py-2.5 text-lg",
};

const ButtonGroup = ({ children, size, ...rest }) => {
    const childrenCount = Children.count(children);

    return (
        <span className="relative z-0 inline-flex" {...rest}>
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
        "-ml-px border transition-colors font-semibold focus:ring disabled:opacity-50 focus:z-10",
        sizes[size],
        {
            "rounded-l-md": isFirst,
            "rounded-r-md": isLast,
            "bg-primary border-primary text-white hover:bg-primary-dark": isActive,
            "border-gray-light hover:bg-gray-lighter": !isActive,
        },
    );

    return <button className={className} {...rest} />;
};

ButtonGroup.Button = Button;

export { ButtonGroup };
