/* eslint-disable no-undef */
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

const SIDEBAR_WIDTHS = {
    SM: 64, // Small (mobile)
    MD: 134, // Medium (tablet)
    LG: 174, // Large (small desktop)
    XL: 200, // Extra large (desktop)
};

// Constants for breakpoints (matching Tailwind defaults)
const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
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
    onSidebarResize,
}) => {
    // Initialize width from localStorage or use default responsive values
    const [width, setWidth] = useState(() => {
        if (typeof window !== "undefined") {
            const savedWidth = localStorage.getItem("sidebarWidth");
            return savedWidth ? Number.parseInt(savedWidth, 10) : getMaxWidth();
        }

        return 200; // Default for SSR
    });

    const [windowWidth, setWindowWidth] = useState(typeof window === "undefined" ? 1280 : window.innerWidth);

    const [isHovered, setIsHovered] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef(null);

    const { announcements: leftDrawer, notices: rightDrawer } = notifications ?? {};
    const hideRightDrawer = rightDrawer?.count <= 0 || !rightDrawer;
    const isStickyHeaderFooter = isStickyHeader && isStickyFooter;

    // Get max width based on window size
    const getMaxWidth = useCallback(() => {
        if (windowWidth >= BREAKPOINTS.XL) return SIDEBAR_WIDTHS.XL;
        if (windowWidth >= BREAKPOINTS.LG) return SIDEBAR_WIDTHS.LG;
        if (windowWidth >= BREAKPOINTS.MD) return SIDEBAR_WIDTHS.MD;
        return SIDEBAR_WIDTHS.SM;
    }, [windowWidth]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            const maxWidth = getMaxWidth();
            setWidth(maxWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [width, getMaxWidth]);

    // Handle resizing
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing || !sidebarRef.current) return;

            const newWidth = Math.min(Math.max(e.clientX, 64), 200); // Constrain between 64px and 200px
            setWidth(newWidth);
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };

        if (isResizing) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            document.body.style.cursor = "ew-resize";
            document.body.style.userSelect = "none";
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing]);

    useEffect(() => {
        if (typeof window !== "undefined" && width) {
            const timer = setTimeout(() => {
                localStorage.setItem("sidebarWidth", width.toString());
                onSidebarResize?.(width);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [width, onSidebarResize]);

    const handleResizeStart = (e) => {
        e.preventDefault();
        setIsResizing(true);
    };

    return (
        <div
            ref={sidebarRef}
            className={clsx(
                sidebarScroll,
                "ui-sidebar",
                isFixed ? "fixed" : "relative",
                "z-20 flex h-full flex-col  bg-black px-1 py-2 text-white transition-all duration-300 ",
                (isHovered || isResizing) && "box-border border-r-4 border-yellow",
                className,
            )}
            style={{ width: `${width}px` }}
        >
            {/* Resize handle */}
            <div
                className="absolute -right-3 top-0 bottom-0 z-10 w-4 cursor-ew-resize"
                onMouseDown={handleResizeStart}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
            {leftDrawer || rightDrawer ? (
                <div
                    className={clsx(
                        "flex w-full gap-2 p-2",
                        width <= 78 && "flex-col",
                        width < 134 ? "justify-center" : "justify-between",
                        isStickyHeader && "sticky top-0 z-50 bg-black",
                    )}
                >
                    {leftDrawer && (
                        <div className={clsx("cursor-pointer text-center", leftDrawer.hide && "hidden")}>
                            <Counter
                                style={{
                                    ...LeftDrawerCountStyle,
                                    minWidth: width > 168 ? "48px" : "30px",
                                    width: width > 168 ? "48px" : "30px",
                                    minHeight: "20px",
                                    height: "20px",
                                    display: "inline-flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={() => handleDrawerStateChange("left")}
                            >
                                <AnnounceIcon className={clsx(width <= 168 && "hidden")} />
                                {leftDrawer.count}
                            </Counter>
                        </div>
                    )}

                    {rightDrawer && (
                        <div className={clsx("cursor-pointer text-center", hideRightDrawer && "hidden")}>
                            <Counter
                                className="text-sm"
                                style={{
                                    minWidth: width > 168 ? "48px" : "30px",
                                    width: width > 168 ? "48px" : "30px",
                                    minHeight: "20px",
                                    height: "20px",
                                    display: "inline-flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={() => handleDrawerStateChange("right")}
                            >
                                <BellIcon className={clsx(width <= 168 && "hidden")} />
                                {rightDrawer.count}
                            </Counter>
                        </div>
                    )}
                </div>
            ) : null}

            {leftDrawer && (
                <Drawer
                    classNames={{ dialogContent: `left-[${width}px]` }}
                    sideIndent={width}
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
                    classNames={{ dialogContent: `left-[${width}px]` }}
                    position="left"
                    sideIndent={width}
                    size="xl"
                    title={rightDrawer.title}
                    content={rightDrawer.content}
                    isOpen={isRightDrawerOpen}
                    onClose={(e) => !!e && handleDrawerStateChange("right")}
                />
            )}

            <div className={clsx("flex-grow space-y-2", isStickyHeaderFooter && "overflow-y-auto")}>
                {width > 60 && (
                    <div className="text-center">
                        {logo
                            ? React.cloneElement(logo, {
                                  className: clsx(
                                      "inline-block h-12 w-12",
                                      width > 160 && "h-30 w-30",
                                      logo.props.className,
                                  ),
                              })
                            : width > 90 && (
                                  <XolaLogoSimple
                                      className={clsx(
                                          "inline-block h-12 w-12 ",
                                          width > 160 && "h-30 w-30",
                                          onLogoClick && "cursor-pointer transition-opacity hover:opacity-80",
                                      )}
                                      onClick={onLogoClick}
                                  />
                              )}
                    </div>
                )}

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
