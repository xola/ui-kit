import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

export const SidebarButton = ({ icon: Icon, label, className, ...rest }) => {
    return (
        <button
            type="button"
            className={clsx(
                "ui-sidebar-button flex w-full cursor-pointer items-center rounded py-2 px-4 hover:bg-gray-darker",
                className,
            )}
            {...rest}
        >
            <div className="p-1.5">
                <Icon className="h-4 w-4" />
            </div>

            <span className="ml-2">{label}</span>
        </button>
    );
};

SidebarButton.displayName = "Sidebar.Button";

SidebarButton.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
};
