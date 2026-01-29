import React, { type ComponentType } from "react";
import cn from "../../helpers/classnames";

export interface SidebarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    className?: string;
}

export const SidebarButton = ({ icon: Icon, label, className, ...rest }: SidebarButtonProps) => {
    return (
        <button
            type="button"
            className={cn(
                "ui-sidebar-button flex w-full cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-darker",
                className,
            )}
            {...rest}
        >
            <div className="p-1.5">
                <Icon className="h-4 w-4" />
            </div>

            <span className="ml-2">{label}</span>
        </button>
    );
};

SidebarButton.displayName = "Sidebar.Button";
