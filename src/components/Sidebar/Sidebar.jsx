import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { XolaLogoCircle } from "../../images/XolaLogoCircle";
import { Counter } from "../Counter";
import { SidebarAccount } from "./Sidebar.Account";
import { SidebarButton } from "./Sidebar.Button";
import { SidebarFooter } from "./Sidebar.Footer";
import { SidebarLink } from "./Sidebar.Link";
import { SidebarMenu } from "./Sidebar.Menu";
import { SidebarHeading } from "./Sidebar.Heading";
import { Drawer } from "../Drawer";
import { BellIcon } from "../../icons/BellIcon";

export const Sidebar = ({
    children,
    className,
    footer,
    notifications,
    notificationsContent,
    isFixed = true,
    onLogoClick,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className={clsx(
                "ui-sidebar",
                isFixed ? "fixed" : "relative",
                "flex h-full w-16 flex-col overflow-y-auto bg-black py-2 px-1 text-white md:w-24 xl:w-50",
                className,
            )}
        >
            <div className={clsx("p-2 text-center xl:text-right", notifications ? null : "invisible")}>
                <Counter
                    className="text-sm"
                    onClick={(e) => {
                        setIsOpen(true);
                        e.stopPropagation();
                    }}
                >
                    <BellIcon />
                    {notifications}
                </Counter>
            </div>

            <Drawer
                title="Notifications & Pending items"
                content={notificationsContent}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />

            <div className="mt-8 mb-10 text-center">
                <XolaLogoCircle
                    className={clsx(
                        "inline-block h-12 w-12 xl:h-24 xl:w-24",
                        onLogoClick && "cursor-pointer transition-opacity hover:opacity-80",
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
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    footer: PropTypes.element.isRequired,
    notifications: PropTypes.number,
    isFixed: PropTypes.bool,
    onLogoClick: PropTypes.func.isRequired,
    notificationsContent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Sidebar.Account = SidebarAccount;
Sidebar.Button = SidebarButton;
Sidebar.Footer = SidebarFooter;
Sidebar.Link = SidebarLink;
Sidebar.Menu = SidebarMenu;
Sidebar.Heading = SidebarHeading;
