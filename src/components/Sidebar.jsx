import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";
import { XolaLogoCircle } from "../images/XolaLogoCircle";
import { Avatar } from "./Avatar";
import { NotificationCount } from "./NotificationCount";

export const Sidebar = ({ children, className, footer, notifications, isFixed = true, onLogoClick }) => {
    return (
        <div
            className={clsx(
                isFixed ? "fixed" : "relative",
                "w-16 md:w-24 xl:w-50 h-full p-2 overflow-y-auto bg-black text-white flex flex-col",
                className,
            )}
        >
            <div className={clsx("p-2 text-center xl:text-left", notifications ? null : "invisible")}>
                <NotificationCount className="text-sm">{notifications}</NotificationCount>
            </div>

            <div className="mb-10 text-center">
                <XolaLogoCircle
                    className={clsx(
                        "inline-block w-12 h-12 xl:w-24 xl:h-24",
                        onLogoClick && "cursor-pointer hover:opacity-80 transition-opacity",
                    )}
                    onClick={onLogoClick}
                />
            </div>

            <div className="flex-grow space-y-2">{children}</div>
            {footer}
        </div>
    );
};

Sidebar.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    className: PropTypes.string,
    footer: PropTypes.element.isRequired,
    notifications: PropTypes.number,
    isFixed: PropTypes.bool,
    onLogoClick: PropTypes.func.isRequired,
};

const Link = ({ isActive = false, icon: Icon, children, ...rest }) => {
    return (
        <button
            type="button"
            className={clsx(
                "transition-colors leading-none flex items-center justify-center xl:justify-start w-full xl:px-6 py-3 rounded",
                {
                    "bg-primary text-white hover:bg-primary-dark": isActive,
                    "hover:bg-gray-darker text-gray": !isActive,
                },
            )}
            {...rest}
        >
            <Icon className="w-5 h-5 xl:mr-3" />
            <span className="hidden px-1 xl:inline">{children}</span>
            <ChevronRightIcon className="hidden ml-auto w-3 h-3 xl:inline" />
        </button>
    );
};

Link.displayName = "Sidebar.Link";
Link.propTypes = {
    isActive: PropTypes.bool,
    icon: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
Sidebar.Link = Link;

const Footer = ({ children, ...rest }) => {
    return (
        <div className="p-2" {...rest}>
            <div className="pb-2 mx-6 border-t border-secondary-darker" />
            {children}
        </div>
    );
};

Footer.displayName = "Sidebar.Footer";
Footer.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
Sidebar.Footer = Footer;

const SidebarAvatar = ({ name, ...rest }) => {
    return (
        <button
            type="button"
            className="flex justify-center items-center py-3 w-full rounded cursor-pointer xl:px-6 hover:bg-gray-darker xl:justify-start"
            {...rest}
        >
            <Avatar size="small" name={name} />
            <span className="hidden text-sm xl:inline ml-2 max-w-[50px]">{name}</span>
            <ChevronDownIcon className="hidden ml-auto xl:inline" />
        </button>
    );
};

SidebarAvatar.displayName = "Sidebar.Footer.Avatar";
SidebarAvatar.propTypes = {
    name: PropTypes.string.isRequired,
};
Sidebar.Footer.Avatar = SidebarAvatar;

const Button = ({ icon: Icon, label, ...rest }) => {
    return (
        <button
            type="button"
            className="flex justify-center items-center py-3 w-full rounded cursor-pointer xl:px-6 hover:bg-gray-darker xl:justify-start"
            {...rest}
        >
            <Icon className="w-5 h-5 xl:ml-2 xl:mr-5" />
            <span className="hidden xl:inline">{label}</span>
        </button>
    );
};

Button.displayName = "Sidebar.Footer.Button";
Button.propTypes = {
    icon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
};
Sidebar.Footer.Button = Button;
