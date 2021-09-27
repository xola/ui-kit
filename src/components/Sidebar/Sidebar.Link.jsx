import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { ChevronRightIcon } from "../../icons/ChevronRightIcon";

export const SidebarLink = ({ isActive = false, icon: Icon, children, ...rest }) => {
    return (
        <button
            type="button"
            className={clsx(
                "ui-sidebar-link",
                "transition-colors leading-none flex items-center justify-center xl:justify-start w-full xl:px-6 py-3 rounded",
                {
                    "bg-primary text-white hover:bg-primary-dark": isActive,
                    "hover:bg-gray-darker text-gray": !isActive,
                },
            )}
            {...rest}
        >
            <Icon className="w-5 h-5 xl:mr-3" />
            <span className="hidden px-1 xl:inline">{children}</span>
            <ChevronRightIcon className="hidden ml-auto w-3 h-3 xl:inline" />
        </button>
    );
};

SidebarLink.displayName = "Sidebar.Link";

SidebarLink.propTypes = {
    isActive: PropTypes.bool,
    icon: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};
