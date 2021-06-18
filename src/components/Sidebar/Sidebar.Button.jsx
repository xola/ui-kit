import PropTypes from "prop-types";
import React from "react";

export const SidebarButton = ({ icon: Icon, label, ...rest }) => {
    return (
        <button
            type="button"
            className="flex items-center py-3 w-full rounded cursor-pointer px-6 hover:bg-gray-darker"
            {...rest}
        >
            <Icon className="w-5 h-5 ml-2 mr-5" />
            <span>{label}</span>
        </button>
    );
};

SidebarButton.displayName = "Sidebar.Button";

SidebarButton.propTypes = {
    icon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
};
