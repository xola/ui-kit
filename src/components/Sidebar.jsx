import clsx from "clsx";
import React from "react";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";
import { XolaLogoCircle } from "../images/XolaLogoCircle";
import { Avatar } from "./Avatar";

export const SidebarNotificationCount = ({ className, count }) => {
    return (
        <span
            className={clsx(
                className,
                "inline-block px-1.5 py-0.5 font-semibold items-center justify-center rounded-full bg-red-dark text-white leading-none",
            )}
        >
            {count}
        </span>
    );
};

export const SidebarLink = ({ active, icon: Icon, children, size = "small", ...rest }) => {
    return (
        <button
            className={clsx(
                "transition-colors leading-none flex items-center text-left w-full md:px-6 md:text-center py-3 rounded",
                {
                    "bg-primary text-white hover:bg-primary-dark": active,
                    "hover:bg-gray-darker text-gray": !active,
                },
            )}
            {...rest}
        >
            <Icon className="hidden md:inline w-5 h-5 mr-3" />
            <span className="sm:px-1">{children}</span>
            <ChevronRightIcon className="ml-auto w-3 h-3 hidden md:inline" />
        </button>
    );
};

export const SidebarFooter = ({ name }) => {
    return (
        <div className="absolute bottom-0 left-0 w-full px-6 pb-6">
            <div className="border-t border-secondary-darker pt-3">
                <Avatar className="mr-2" size="small" name={name} /> {name}
            </div>
        </div>
    );
};

export const Sidebar = ({ children, footer, notifications }) => {
    return (
        <div className="bg-black p-2 text-white h-screen w-24 md:w-56 overflow-y-auto relative">
            {notifications ? (
                <div className="p-2 text-center md:text-left">
                    <SidebarNotificationCount className="text-sm" count={notifications} />
                </div>
            ) : null}

            <div className="text-center mb-10">
                <XolaLogoCircle className="inline-block w-12 h-12 md:w-24 md:h-24" />
            </div>

            <div className="space-y-2">{children}</div>
            {footer}
        </div>
    );
};
