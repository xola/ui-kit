import PropTypes from "prop-types";
import React from "react";

export const SidebarFooter = ({ children, ...rest }) => {
    return (
        <div className="ui-sidebar-footer py-3" {...rest}>
            <div className="mx-4 border-t border-secondary-darker pb-2" />
            {children}
        </div>
    );
};

SidebarFooter.displayName = "Sidebar.Footer";

SidebarFooter.propTypes = {
    children: PropTypes.node.isRequired,
};
