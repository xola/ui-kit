import clsx from "clsx";
import React, { Children } from "react";

export const Breadcrumb = ({ className, classNames = {}, separator = "/", children, ...rest }) => {
    const count = Children.count(children) - 1;

    return (
        <div className={clsx(className, "whitespace-nowrap font-semibold")} {...rest}>
            {Children.map(children, (child, index) => {
                const isLast = index >= count;

                return (
                    <>
                        <span className={clsx(classNames.item, isLast ? "text-black" : "text-gray")}>{child}</span>

                        {isLast ? null : (
                            <span className={clsx(classNames.separator, "text-gray-dark mx-2")}>{separator}</span>
                        )}
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
