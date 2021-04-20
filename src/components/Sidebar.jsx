import clsx from "clsx";
import React from "react";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";
import { XolaLogoCircle } from "../images/XolaLogoCircle";
import { Avatar } from "./Avatar";
import { NotificationCount } from "./NotificationCount";

export const Sidebar = ({ children, footer, notifications }) => {
    return (
        <div className="relative w-24 h-screen p-2 overflow-y-auto text-white bg-black md:w-56">
            {notifications ? (
                <div className="p-2 text-center md:text-left">
                    <NotificationCount className="text-sm">{notifications}</NotificationCount>
                </div>
            ) : null}

            <div className="mb-10 text-center">
                <XolaLogoCircle className="inline-block w-12 h-12 md:w-24 md:h-24" />
            </div>

            <div className="space-y-2">{children}</div>
            {footer}
        </div>
    );
};

Sidebar.Link = ({ active, icon: Icon, children, size = "small", ...rest }) => {
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
            <Icon className="hidden w-5 h-5 mr-3 md:inline" />
            <span className="sm:px-1">{children}</span>
            <ChevronRightIcon className="hidden w-3 h-3 ml-auto md:inline" />
        </button>
    );
};

Sidebar.Link.displayName = "Sidebar.Link";

Sidebar.Footer = ({ name }) => {
    return (
        <div className="absolute bottom-0 left-0 w-full px-6 pb-6">
            <div className="pt-3 border-t border-secondary-darker">
                <Avatar className="mr-2" size="small" name={name} /> {name}
            </div>
        </div>
    );
};

Sidebar.Footer.displayName = "Sidebar.Footer";
