import React from "react";
import clsx from "clsx";

export const Breadcrumb = ({ className, spacing = 2, separator = "/", children }) => {
    const count = React.Children.count(children) - 1;
    return (
        <div className={className, clsx(`space-x-${spacing}`)}>
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
