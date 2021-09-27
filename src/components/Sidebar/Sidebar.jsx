import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { XolaLogoCircle } from "../../images/XolaLogoCircle";
import { Counter } from "../Counter";
import { SidebarAccount } from "./Sidebar.Account";
import { SidebarButton } from "./Sidebar.Button";
import { SidebarFooter } from "./Sidebar.Footer";
import { SidebarLink } from "./Sidebar.Link";
import { SidebarMenu } from "./Sidebar.Menu";

export const Sidebar = ({ children, className, footer, notifications, isFixed = true, onLogoClick }) => {
    return (
        <div
            className={clsx(
                "ui-sidebar",
                isFixed ? "fixed" : "relative",
                "w-16 md:w-24 xl:w-50 h-full p-2 overflow-y-auto bg-black text-white flex flex-col",
                className,
            )}
        >
            <div className={clsx("p-2 text-center xl:text-left", notifications ? null : "invisible")}>
                <Counter className="text-sm">{notifications}</Counter>
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
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    footer: PropTypes.element.isRequired,
    notifications: PropTypes.number,
    isFixed: PropTypes.bool,
    onLogoClick: PropTypes.func.isRequired,
};

Sidebar.Account = SidebarAccount;
Sidebar.Button = SidebarButton;
Sidebar.Footer = SidebarFooter;
Sidebar.Link = SidebarLink;
Sidebar.Menu = SidebarMenu;
