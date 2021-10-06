import PropTypes from "prop-types";
import React from "react";

export const SidebarButton = ({ icon: Icon, label, ...rest }) => {
    return (
        <button
            type="button"
            className="ui-sidebar-button flex items-center px-4 py-2 w-full rounded cursor-pointer hover:bg-gray-darker"
            {...rest}
        >
            <div className="p-1.5">
                <Icon className="w-4 h-4" />
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
