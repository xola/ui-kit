import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { AnnounceIcon } from "../../icons/AnnounceIcon";
import { BellIcon } from "../../icons/BellIcon";
import { XolaLogoCircle } from "../../images/XolaLogoCircle";
import { Counter } from "../Counter";
import { Drawer } from "../Drawer";
import { SidebarAccount } from "./Sidebar.Account";
import { SidebarButton } from "./Sidebar.Button";
import { SidebarFooter } from "./Sidebar.Footer";
import { SidebarHeading } from "./Sidebar.Heading";
import { SidebarLink, SidebarSeparator } from "./Sidebar.Link";
import { SidebarMenu } from "./Sidebar.Menu";

const LeftDrawerCountStyle = {
    // From Figma
    background: "linear-gradient(138.65deg, #583DFF 19.59%, #F849C7 62.96%, #FFC03D 97.07%)",
};

export const Sidebar = ({ children, className, footer, notifications, isFixed = true, onLogoClick }) => {
    const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
    const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
    const toggleLeftDrawer = () => {
        if (!isLeftDrawerOpen) {
            // Close the right drawer when you open the left
            setIsRightDrawerOpen(false);
        }

        setIsLeftDrawerOpen(!isLeftDrawerOpen);
    };

    const toggleRightDrawer = () => {
        if (!isRightDrawerOpen) {
            // Close the left drawer when you open the right
            setIsLeftDrawerOpen(false);
        }

        setIsRightDrawerOpen(!isRightDrawerOpen);
    };

    const { announcements: leftDrawer, notices: rightDrawer } = notifications ?? {};
    const hideRightDrawer = rightDrawer?.count <= 0 || !rightDrawer;

    const handleOnClose = (direction, closeDrawer) => {
        if (direction === "left") {
            if (closeDrawer) {
                setIsLeftDrawerOpen(false);
            }

            leftDrawer.onClose?.();
        } else {
            if (closeDrawer) {
                setIsRightDrawerOpen(false);
            }

            rightDrawer.onClose?.();
        }
    };

    return (
        <div
            className={clsx(
                "ui-sidebar",
                isFixed ? "fixed" : "relative",
                "z-50 flex h-full w-16 flex-col overflow-y-auto bg-black py-2 px-1 text-white md:w-24 xl:w-50",
                className,
            )}
        >
            {leftDrawer || rightDrawer ? (
                <div className="flex w-full p-2 sm:justify-center sm:space-x-2 xl:justify-between">
                    {leftDrawer && (
                        <div className={clsx("cursor-pointer sm:text-center", leftDrawer.hide && "hidden")}>
                            <Counter style={LeftDrawerCountStyle} onClick={toggleLeftDrawer}>
                                <AnnounceIcon className="mr-1 sm:hidden xl:block" />
                                {leftDrawer.count}
                            </Counter>
                        </div>
                    )}

                    {rightDrawer && (
                        <div className={clsx("ml-auto cursor-pointer sm:text-center", hideRightDrawer && "hidden")}>
                            <Counter className="text-sm" onClick={toggleRightDrawer}>
                                <BellIcon className="sm:hidden xl:block" />
                                {rightDrawer.count}
                            </Counter>
                        </div>
                    )}
                </div>
            ) : null}

            {leftDrawer && (
                <Drawer
                    classNames={{ dialog: "md:left-24 xl:left-50" }}
                    position="left"
                    title={leftDrawer.title}
                    content={leftDrawer.content}
                    isOpen={isLeftDrawerOpen}
                    onClose={(e) => handleOnClose("left", !!e)}
                />
            )}

            {rightDrawer && (
                <Drawer
                    classNames={{ dialog: "md:left-24 xl:left-50" }}
                    position="left"
                    title={rightDrawer.title}
                    content={rightDrawer.content}
                    isOpen={isRightDrawerOpen}
                    onClose={(e) => handleOnClose("right", !!e)}
                />
            )}

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
    isFixed: PropTypes.bool,
    onLogoClick: PropTypes.func.isRequired,
    notifications: PropTypes.shape({
        announcements: PropTypes.shape({
            count: PropTypes.number,
            content: PropTypes.node,
            title: PropTypes.string,
            hide: PropTypes.bool,
            onClose: PropTypes.func,
        }),
        notices: PropTypes.shape({
            count: PropTypes.number,
            content: PropTypes.node,
            title: PropTypes.string,
            onClose: PropTypes.func,
        }),
    }),
};

Sidebar.Account = SidebarAccount;
Sidebar.Button = SidebarButton;
Sidebar.Footer = SidebarFooter;
Sidebar.Link = SidebarLink;
Sidebar.Separator = SidebarSeparator;
Sidebar.Menu = SidebarMenu;
Sidebar.Heading = SidebarHeading;
