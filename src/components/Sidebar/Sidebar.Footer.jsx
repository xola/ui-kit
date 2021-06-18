import PropTypes from "prop-types";
import React from "react";

export const SidebarFooter = ({ children, ...rest }) => {
    return (
        <div className="p-2" {...rest}>
            <div className="pb-2 mx-6 border-t border-secondary-darker" />
            {children}
        </div>
    );
};

SidebarFooter.displayName = "Sidebar.Footer";

SidebarFooter.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
