import clsx from "clsx";
import React, { Children } from "react";
import PropTypes from "prop-types";

export const Breadcrumb = ({ className, classNames = {}, separator = "/", children, ...rest }) => {
    const count = Children.count(children) - 1;

    return (
        <div className={clsx("text-2xl whitespace-nowrap font-semibold", className)} {...rest}>
            {Children.map(children, (child, index) => {
                const isLast = index >= count;

                return (
                    <>
                        <span className={clsx(classNames.item, isLast ? "text-black" : "text-gray-dark")}>{child}</span>

                        {isLast ? null : (
                            <span className={clsx(classNames.separator, "text-gray-dark mx-2")}>{separator}</span>
                        )}
                    </>
                );
            })}
        </div>
    );
};

Breadcrumb.propTypes = {
    className: PropTypes.string,
    classNames: PropTypes.object,
    separator: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

Breadcrumb.Item = ({ className, onClick, children }) => {
    return (
        <div className={clsx(className, "inline", onClick && "cursor-pointer hover:underline")} onClick={onClick}>
            {children}
        </div>
    );
};

Breadcrumb.Item.displayName = "Breadcrumb.Item";

Breadcrumb.Item.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};
