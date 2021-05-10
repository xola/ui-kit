import clsx from "clsx";
import React from "react";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";
import { XolaLogoCircle } from "../images/XolaLogoCircle";
import { Avatar } from "./Avatar";
import { NotificationCount } from "./NotificationCount";

export const Sidebar = ({ children, className, footer, notifications, fixed, onLogoClick }) => {
    return (
        <div
            className={clsx(
                fixed ? "fixed" : "relative",
                "w-16 md:w-24 xl:w-50 h-full p-2 overflow-y-auto bg-black text-white flex flex-col",
                className,
            )}
        >
            <div className={clsx("p-2 text-center xl:text-left", notifications ? null : "invisible")}>
                <NotificationCount className="text-sm">{notifications}</NotificationCount>
            </div>

            <div className="mb-10 text-center">
                <XolaLogoCircle
                    onClick={onLogoClick}
                    className={clsx(
                        "inline-block w-12 h-12 xl:w-24 xl:h-24",
                        onLogoClick && "cursor-pointer hover:opacity-80 transition-opacity",
                    )}
                />
            </div>

            <div className="space-y-2 flex-grow">{children}</div>
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

Sidebar.Footer = ({ children, ...rest }) => {
    return (
        <div className="p-2" {...rest}>
            <div className="border-t border-secondary-darker pb-2 mx-6" />
            {children}
        </div>
    );
};

Sidebar.Footer.displayName = "Sidebar.Footer";

Sidebar.Footer.Avatar = ({ name, ...rest }) => {
    return (
        <button
            className="xl:px-6 py-3 hover:bg-gray-darker rounded cursor-pointer flex items-center justify-center xl:justify-start w-full"
            {...rest}
        >
            <Avatar size="small" name={name} />
            <span className="hidden text-sm xl:inline ml-2 max-w-[50px]">{name}</span>
            <ChevronDownIcon className="ml-auto hidden xl:inline" />
        </button>
    );
};

Sidebar.Footer.Avatar.displayName = "Sidebar.Footer.Avatar";

Sidebar.Footer.Button = ({ icon: Icon, label, ...rest }) => {
    return (
        <button
            className="xl:px-6 py-3 hover:bg-gray-darker rounded cursor-pointer flex items-center justify-center xl:justify-start w-full"
            {...rest}
        >
            <Icon className="w-5 h-5 xl:ml-2 xl:mr-5" />
            <span className="hidden xl:inline">{label}</span>
        </button>
    );
};

Sidebar.Footer.Button.displayName = "Sidebar.Footer.Button";
