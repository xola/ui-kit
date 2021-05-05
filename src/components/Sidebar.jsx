import clsx from "clsx";
import React from "react";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";
import { XolaLogoCircle } from "../images/XolaLogoCircle";
import { Avatar } from "./Avatar";
import { NotificationCount } from "./NotificationCount";

export const Sidebar = ({ children, className, footer, notifications, fixed }) => {
    return (
        <div
            className={clsx(
                fixed ? "fixed" : "relative",
                "w-16 md:w-24 xl:w-48 h-screen p-2 overflow-y-auto bg-black text-white",
                className,
            )}
        >
            {notifications ? (
                <div className="p-2 text-center xl:text-left">
                    <NotificationCount className="text-sm">{notifications}</NotificationCount>
                </div>
            ) : null}

            <div className="mb-10 text-center">
                <XolaLogoCircle className="inline-block w-12 h-12 xl:w-24 xl:h-24" />
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
                "transition-colors leading-none flex items-center justify-center xl:justify-start w-full xl:px-6 py-3 rounded",
                {
                    "bg-primary text-white hover:bg-primary-dark": active,
                    "hover:bg-gray-darker text-gray": !active,
                },
            )}
            {...rest}
        >
            <Icon className="w-5 h-5 xl:mr-3" />
            <span className="hidden px-1 xl:inline">{children}</span>
            <ChevronRightIcon className="hidden w-3 h-3 ml-auto xl:inline" />
        </button>
    );
};

Sidebar.Link.displayName = "Sidebar.Link";

Sidebar.Footer = ({ name }) => {
    return (
        <div className="absolute bottom-0 left-0 w-full px-3 md:px-6 pb-6">
            <div className="pt-3 border-t border-secondary-darker">
                <Avatar className="mr-2" size="small" name={name} />{" "}
                <span className="hidden xl:inline">{name}</span>
            </div>
        </div>
    );
};

Sidebar.Footer.displayName = "Sidebar.Footer";
