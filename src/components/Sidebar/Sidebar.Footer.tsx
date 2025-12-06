import React from "react";

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const SidebarFooter = ({ children, ...rest }: SidebarFooterProps) => {
    return (
        <div className="ui-sidebar-footer py-3" {...rest}>
            <div className="mx-4 border-t border-secondary-darker pb-2" />
            {children}
        </div>
    );
};

SidebarFooter.displayName = "Sidebar.Footer";
