import cn from "../../helpers/classnames";
import PropTypes from "prop-types";
import React from "react";

export const SidebarHeading = ({ icon: Icon, label, className }) => {
    return (
        <p className={cn("ml-4 flex items-center text-white", className)}>
            <Icon className="mr-3 h-5 w-5" />
            <span className="text-md font-bold">{label}</span>
        </p>
    );
};

SidebarHeading.displayName = "Sidebar.Heading";

SidebarHeading.propTypes = {
    icon: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
};
