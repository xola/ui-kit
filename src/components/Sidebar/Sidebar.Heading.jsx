import PropTypes from "prop-types";
import clsx from "clsx";
import React from "react";

export const SidebarHeading = ({ icon: Icon, label, className }) => {
    return (
        <p className={clsx("flex items-center ml-4 text-white", className)}>
            <Icon className="mr-3 w-5 h-5" />
            <span className="font-bold text-md">{label}</span>
        </p>
    );
};

SidebarHeading.displayName = "Sidebar.Heading";

SidebarHeading.propTypes = {
    icon: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
};
