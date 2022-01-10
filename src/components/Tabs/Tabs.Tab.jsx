import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

export const Tab = ({ as: Tag = "button", className, isActive = false, ...rest }) => {
    return (
        <Tag
            className={clsx(
                "ui-tabs-tab",
                className,
                "transition-colors cursor-pointer p-4 flex-1 text-center text-lg font-semibold whitespace-nowrap focus-visible:ring",
                isActive ? "bg-white text-black" : "text-gray-dark hover:text-black hover:bg-gray-light",
            )}
            {...rest}
        />
    );
};

Tab.propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    className: PropTypes.string,
    isActive: PropTypes.bool,
};

Tab.displayName = "Tabs.Tab";
