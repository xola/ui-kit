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
import { AnnounceIcon } from "../../icons/AnnounceIcon";

export const Sidebar = ({
    children,
    className,
    footer,
    notifications,
    announcements,
    notificationsContent,
    announcementsContent,
    isFixed = true,
    onLogoClick,
}) => {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isAnnouncementsOpen, setIsAnnouncementsOpen] = useState(false);

    return (
        <div
            className={clsx(
                "ui-sidebar",
                isFixed ? "fixed" : "relative",
                "flex h-full w-16 flex-col overflow-y-auto bg-black py-2 px-1 text-white md:w-24 xl:w-50",
                className,
            )}
        >
            <div className="flex p-2 sm:justify-center xl:justify-between">
                <div className={clsx("sm:text-center", announcements ? null : "hidden")}>
                    <Counter
                        className="mr-2 text-sm"
                        onClick={(e) => {
                            setIsAnnouncementsOpen(true);
                            e.stopPropagation();
                        }}
                        style={{
                            background: "linear-gradient(138.65deg, #583DFF 19.59%, #F849C7 62.96%, #FFC03D 97.07%)",
                        }}
                    >
                        <AnnounceIcon className="mr-1 sm:hidden xl:block" />
                        {announcements}
                    </Counter>
                </div>

                <div className={clsx("sm:text-center", notifications ? null : "hidden")}>
                    <Counter
                        className="text-sm"
                        onClick={(e) => {
                            setIsNotificationsOpen(true);
                            e.stopPropagation();
                        }}
                    >
                        <BellIcon className="sm:hidden xl:block" />
                        {notifications}
                    </Counter>
                </div>
            </div>

            <Drawer
                title="Announcements"
                content={announcementsContent}
                isOpen={isAnnouncementsOpen}
                onClose={() => setIsAnnouncementsOpen(false)}
            />

            <Drawer
                title="Notifications & Pending items"
                content={notificationsContent}
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
            />

            <div className="mt-4 mb-10 text-center">
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
    announcements: PropTypes.number,
    isFixed: PropTypes.bool,
    onLogoClick: PropTypes.func.isRequired,
    notificationsContent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    announcementsContent: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Sidebar.Account = SidebarAccount;
Sidebar.Button = SidebarButton;
Sidebar.Footer = SidebarFooter;
Sidebar.Link = SidebarLink;
Sidebar.Menu = SidebarMenu;
Sidebar.Heading = SidebarHeading;
