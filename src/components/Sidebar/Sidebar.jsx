import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { AnnounceIcon, BellIcon, XolaLogoSimple } from "../../icons";
import { Counter } from "../Counter";
import { Drawer } from "../Drawer";
import { SidebarAccount } from "./Sidebar.Account";
import { SidebarButton } from "./Sidebar.Button";
import { SidebarFooter } from "./Sidebar.Footer";
import { SidebarHeading } from "./Sidebar.Heading";
import { SidebarLink, SidebarSeparator } from "./Sidebar.Link";
import { SidebarMenu } from "./Sidebar.Menu";
import sidebarScroll from "./SidebarScroll.module.css";

const LeftDrawerCountStyle = {
    // From Figma
    background: "linear-gradient(138.65deg, #583DFF 19.59%, #F849C7 62.96%, #FFC03D 97.07%)",
};

export const Sidebar = ({
    logo,
    children,
    className,
    footer,
    notifications,
    isFixed = true,
    onLogoClick,
    isStickyHeader = true,
    isStickyFooter = true,
    isLeftDrawerOpen,
    isRightDrawerOpen,
    handleDrawerStateChange,
}) => {
    const { announcements: leftDrawer, notices: rightDrawer } = notifications ?? {};
    const hideRightDrawer = rightDrawer?.count <= 0 || !rightDrawer;
    const isStickyHeaderFooter = isStickyHeader && isStickyFooter;

    return (
        <div
            className={clsx(
                sidebarScroll,
                "ui-sidebar",
                isFixed ? "fixed" : "relative",
                !isStickyHeaderFooter && "overflow-y-auto",
                "z-20 flex h-full w-16 flex-col bg-black px-1 py-2 text-white md:w-24 xl:w-50",
                className,
            )}
        >
            {leftDrawer || rightDrawer ? (
                <div
                    className={clsx(
                        "flex w-full p-2 sm:justify-center sm:space-x-2 xl:justify-between",
                        isStickyHeader && "sticky top-0 z-50 bg-black",
                    )}
                >
                    {leftDrawer && (
                        <div className={clsx("cursor-pointer sm:text-center", leftDrawer.hide && "hidden")}>
                            <Counter style={LeftDrawerCountStyle} onClick={() => handleDrawerStateChange("left")}>
                                <AnnounceIcon className="mr-1 sm:hidden xl:block" />
                                {leftDrawer.count}
                            </Counter>
                        </div>
                    )}

                    {rightDrawer && (
                        <div className={clsx("ml-auto cursor-pointer sm:text-center", hideRightDrawer && "hidden")}>
                            <Counter className="text-sm" onClick={() => handleDrawerStateChange("right")}>
                                <BellIcon className="sm:hidden xl:block" />
                                {rightDrawer.count}
                            </Counter>
                        </div>
                    )}
                </div>
            ) : null}

            {leftDrawer && (
                <Drawer
                    classNames={{ dialogContent: "md:left-24 xl:left-50" }}
                    position="left"
                    size="xl"
                    title={leftDrawer.title}
                    content={leftDrawer.content}
                    isOpen={isLeftDrawerOpen}
                    onClose={(e) => !!e && handleDrawerStateChange("left")}
                />
            )}

            {rightDrawer && (
                <Drawer
                    classNames={{ dialogContent: "md:left-24 xl:left-50" }}
                    position="left"
                    size="xl"
                    title={rightDrawer.title}
                    content={rightDrawer.content}
                    isOpen={isRightDrawerOpen}
                    onClose={(e) => !!e && handleDrawerStateChange("right")}
                />
            )}

            <div className={clsx("flex-grow space-y-2", isStickyHeaderFooter && "overflow-y-auto")}>
                <div className="text-center">
                    {logo ?? (
                        <XolaLogoSimple
                            className={clsx(
                                "inline-block h-12 w-12 xl:h-30 xl:w-30",
                                onLogoClick && "cursor-pointer transition-opacity hover:opacity-80",
                            )}
                            onClick={onLogoClick}
                        />
                    )}
                </div>

                <div>{children}</div>
            </div>

            <div className={clsx(isStickyFooter && "sticky bottom-0 bg-black")}>{footer}</div>
        </div>
    );
};

Sidebar.propTypes = {
    logo: PropTypes.node,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    footer: PropTypes.element.isRequired,
    isFixed: PropTypes.bool,
    isStickyHeader: PropTypes.bool,
    isStickyFooter: PropTypes.bool,
    onLogoClick: PropTypes.func.isRequired,
    isLeftDrawerOpen: PropTypes.bool,
    isRightDrawerOpen: PropTypes.bool,
    handleDrawerStateChange: PropTypes.func,
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
