import React from "react";
import clsx from "clsx";

// This is required otherwise JIT won't pickup the dynamically generated classes like "space-x-2"
const sizes = {
    1: "space-x-1",
    1.5: "space-x-1.5",
    2: "space-x-2",
    3: "space-x-3",
    4: "space-x-4",
    5: "space-x-5",
    6: "space-x-6",
};

export const Breadcrumb = ({ className, spacing = 2, separator = "/", children }) => {
    const count = React.Children.count(children) - 1;
    return (
        <div className={(className, sizes[spacing])}>
            {React.Children.map(children, (child, idx) => {
                const isLast = idx >= count;
                return (
                    <>
                        <span className={clsx(isLast ? "text-black font-semibold" : "text-gray")}>{child}</span>
                        <span className={clsx(className, { hidden: isLast }, "text-gray-dark")}>{separator}</span>
                    </>
                );
            })}
        </div>
    );
};

Breadcrumb.Item = ({ className, children }) => {
    return <div className={clsx(className, "inline")}>{children}</div>;
};

Breadcrumb.Item.displayName = "Breadcrumb.Item";
