import PropTypes from "prop-types";
import React from "react";

export const SidebarFooter = ({ children, ...rest }) => {
    return (
        <div className="ui-sidebar-footer p-3" {...rest}>
            <div className="pb-2 mx-4 border-t border-secondary-darker" />
            {children}
        </div>
    );
};

SidebarFooter.displayName = "Sidebar.Footer";

SidebarFooter.propTypes = {
    children: PropTypes.node.isRequired,
};
