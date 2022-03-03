import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const variants = {
    default: (isActive) =>
        clsx(
            "border-b border-gray-light",
            isActive ? "text-primary border-l border-r border-b-transparent" : "hover:text-gray-darker",
        ),

    simple: (isActive) =>
        clsx(
            "flex-1 text-lg transition-colors",
            isActive ? "bg-white text-black" : "text-gray-dark hover:text-black hover:bg-gray-light",
        ),
};

export const Tab = ({
    variant = "default",
    as: Tag = "button",
    className,
    isActive = false,
    isHidden = false,
    ...rest
}) => {
    if (isHidden) {
        return null;
    }

    return (
        <Tag
            className={clsx(
                "ui-tabs-tab",
                className,
                "cursor-pointer whitespace-nowrap py-4 px-8 text-center font-semibold focus-visible:ring",
                variants[variant](isActive),
            )}
            {...rest}
        />
    );
};

Tab.propTypes = {
    variant: PropTypes.oneOf(Object.keys(variants)),
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    className: PropTypes.string,
    isActive: PropTypes.bool,
    isHidden: PropTypes.bool,
};

Tab.displayName = "Tabs.Tab";
