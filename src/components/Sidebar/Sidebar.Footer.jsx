import PropTypes from "prop-types";
import React from "react";

export const SidebarFooter = ({ children, ...rest }) => {
    return (
        <div className="ui-sidebar-footer py-3" {...rest}>
            <div className="border-secondary-darker mx-4 border-t pb-2" />
            {children}
        </div>
    );
};

SidebarFooter.displayName = "Sidebar.Footer";

SidebarFooter.propTypes = {
    children: PropTypes.node.isRequired,
};
