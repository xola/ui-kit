import React, { type ComponentType } from "react";
import cn from "../../helpers/classnames";

export interface SidebarHeadingProps {
    icon: ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    className?: string;
}

export const SidebarHeading = ({ icon: Icon, label, className }: SidebarHeadingProps) => {
    return (
        <p className={cn("ml-4 flex items-center text-white", className)}>
            <Icon className="mr-3 h-5 w-5" />
            <span className="text-md font-bold">{label}</span>
        </p>
    );
};

SidebarHeading.displayName = "Sidebar.Heading";
