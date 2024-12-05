import PropTypes from "prop-types";
import React, { Children } from "react";
import cn from "../helpers/classnames";

export const Breadcrumb = ({ className, classNames = {}, separator = "/", children, ...rest }) => {
    const count = Children.count(children) - 1;

    return (
        <div className={cn("ui-breadcrumb", "whitespace-nowrap text-2xl font-semibold", className)} {...rest}>
            {Children.map(children, (child, index) => {
                const isLast = index >= count;

                return (
                    <>
                        <span className={cn(classNames.item, isLast ? "text-black" : "text-gray-dark")}>{child}</span>

                        {isLast ? null : (
                            <span className={cn(classNames.separator, "mx-2 text-gray-dark")}>{separator}</span>
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
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Breadcrumb.Item = ({ className, onClick, children }) => {
    return (
        <div
            className={cn("ui-breadcrumb-item inline", onClick && "cursor-pointer hover:underline", className)}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

Breadcrumb.Item.displayName = "Breadcrumb.Item";

Breadcrumb.Item.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
};
