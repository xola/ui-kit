import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { AnnounceIcon, BellIcon, XolaLogoSimple } from "../../icons";
import { Counter } from "../Counter";
import { Drawer } from "../Drawer";
import { SidebarAccount } from "./Sidebar.Account";
import { SidebarButton } from "./Sidebar.Button";
import { SidebarFooter } from "./Sidebar.Footer";
import { SidebarHeading } from "./Sidebar.Heading";
import { SidebarLink, SidebarSeparator } from "./Sidebar.Link";
import { SidebarMenu } from "./Sidebar.Menu";
import { SidebarVariantContext, SidebarWidthContext, variantContextValue } from "./SidebarContext";
import sidebarScroll from "./SidebarScroll.module.css";
import {
    SIDEBAR_VARIANT,
    SIDEBAR_WIDTH,
    ceilingForVariant,
    resolveCrossingWidth,
    resolveMountWidth,
    variantForWidth,
} from "./sidebarWidth";

const LeftDrawerCountStyle = {
    // From Figma
    background: "linear-gradient(138.65deg, #583DFF 19.59%, #F849C7 62.96%, #FFC03D 97.07%)",
};

export const Sidebar = forwardRef(
    (
        {
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
            variant,
            isCollapsed = false,
            // Gates the collapse toggle button added in Task 9; destructured now so its default
            // exists before that lands.
            // eslint-disable-next-line no-unused-vars
            isCollapsible = false,
            minWidth = SIDEBAR_WIDTH.MIN,
            maxWidth = SIDEBAR_WIDTH.MAX,
            autoCollapseBelow = null,
            storageKey = null,
            cssVariableTarget = null,
            // Called from the collapse toggle handler added in Task 9; destructured now so it
            // exists on the public signature already.
            // eslint-disable-next-line no-unused-vars
            onCollapsedChange,
            onVariantChange,
        },
        ref,
    ) => {
        const effectiveMaxWidth = Math.min(
            maxWidth,
            ceilingForVariant(variant ?? (isCollapsed ? SIDEBAR_VARIANT.ICONS : SIDEBAR_VARIANT.ICONS_AND_TEXT)),
        );

        const [width, setWidth] = useState(() => {
            const resolved = resolveMountWidth({
                storedWidth: storageKey ? window.localStorage.getItem(storageKey) : null,
                hasIntent: storageKey ? window.localStorage.getItem(`${storageKey}:intent`) === "1" : false,
                viewportWidth: window.innerWidth,
                minWidth,
                maxWidth: effectiveMaxWidth,
                autoCollapseBelow,
            });

            // Written here, not in an effect: consumers read this key during their own first render
            // (x2-seller Page.tsx:42), so a post-paint write leaves them offsetting against a stale width.
            if (storageKey) {
                window.localStorage.setItem(storageKey, String(resolved));
            }

            return resolved;
        });

        const [lastExpandedWidth, setLastExpandedWidth] = useState(null);
        const wasBelowRef = useRef(window.innerWidth < (autoCollapseBelow ?? 0));
        const hasIntentBelowRef = useRef(false);
        const currentVariant = variantForWidth(width);

        const [isHovered, setIsHovered] = useState(false);
        const [isResizing, setIsResizing] = useState(false);

        const { announcements: leftDrawer, notices: rightDrawer } = notifications ?? {};
        const hideRightDrawer = rightDrawer?.count <= 0 || !rightDrawer;
        const isStickyHeaderFooter = isStickyHeader && isStickyFooter;

        useEffect(() => {
            if (autoCollapseBelow == null) {
                return undefined;
            }

            const handleResize = () => {
                const isBelow = window.innerWidth < autoCollapseBelow;
                const next = resolveCrossingWidth({
                    width,
                    lastExpandedWidth,
                    wasBelow: wasBelowRef.current,
                    isBelow,
                    hasIntentBelow: hasIntentBelowRef.current,
                    minWidth,
                    maxWidth: effectiveMaxWidth,
                });

                wasBelowRef.current = isBelow;
                setWidth(next.width);
                setLastExpandedWidth(next.lastExpandedWidth);
            };

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, [autoCollapseBelow, width, lastExpandedWidth, minWidth, effectiveMaxWidth]);

        useEffect(() => {
            if (storageKey) {
                window.localStorage.setItem(storageKey, String(width));
            }

            if (cssVariableTarget) {
                cssVariableTarget.style.setProperty("--ui-sidebar-width", `${width}px`);
            }

            onSidebarResize?.(String(width));
        }, [width, storageKey, cssVariableTarget, onSidebarResize]);

        useEffect(() => {
            onVariantChange?.(currentVariant);
        }, [currentVariant, onVariantChange]);

        const variantValue = useMemo(() => variantContextValue(currentVariant), [currentVariant]);

        // Task 9 replaces this with pointer-capture based resizing; kept as a mousedown-only
        // affordance here so the handle isn't dead between the two commits.
        const handleResizeStart = (e) => {
            e.preventDefault();
            setIsResizing(true);

            if (window.innerWidth < (autoCollapseBelow ?? 0)) {
                hasIntentBelowRef.current = true;
            }
        };

        return (
            <SidebarVariantContext.Provider value={variantValue}>
                <SidebarWidthContext.Provider value={width}>
                    <div
                        ref={ref}
                        className={clsx(
                            sidebarScroll,
                            "ui-sidebar",
                            isFixed ? "fixed" : "relative",
                            "z-20 flex h-full flex-col  border-r-4 border-black bg-black px-1 py-2 text-white transition-all duration-300",
                            (isHovered || isResizing) && "box-border !border-r-4 !border-yellow",
                            className,
                        )}
                        style={{ width: `${width}px` }}
                    >
                        {/* Resize handle */}
                        <div
                            className="absolute -right-3 bottom-0 top-0 z-10 w-4 cursor-ew-resize"
                            onMouseDown={handleResizeStart}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        />
                        {leftDrawer || rightDrawer ? (
                            <div
                                className={clsx(
                                    "flex w-full gap-2 p-2",
                                    variantValue.isCollapsed && "flex-col",
                                    variantValue.isCollapsed ? "justify-center" : "justify-between",
                                    isStickyHeader && "sticky top-0 z-50 bg-black",
                                )}
                            >
                                {leftDrawer && (
                                    <div className={clsx("cursor-pointer text-center", leftDrawer.hide && "hidden")}>
                                        <Counter
                                            style={{
                                                ...LeftDrawerCountStyle,
                                                minWidth: variantValue.isCollapsed ? "30px" : "48px",
                                                width: variantValue.isCollapsed ? "30px" : "48px",
                                                minHeight: "20px",
                                                height: "20px",
                                                display: "inline-flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                            onClick={() => handleDrawerStateChange("left")}
                                        >
                                            <AnnounceIcon className={clsx(variantValue.isCollapsed && "hidden")} />
                                            {leftDrawer.count}
                                        </Counter>
                                    </div>
                                )}

                                {rightDrawer && (
                                    <div className={clsx("cursor-pointer text-center", hideRightDrawer && "hidden")}>
                                        <Counter
                                            className="text-sm"
                                            style={{
                                                minWidth: variantValue.isCollapsed ? "30px" : "48px",
                                                width: variantValue.isCollapsed ? "30px" : "48px",
                                                minHeight: "20px",
                                                height: "20px",
                                                display: "inline-flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                            onClick={() => handleDrawerStateChange("right")}
                                        >
                                            <BellIcon className={clsx(variantValue.isCollapsed && "hidden")} />
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
                            <div className="text-center">
                                {logo ?? (
                                    <XolaLogoSimple
                                        className={clsx(
                                            "inline-block h-12 w-12",
                                            variantValue.showText && "h-30 w-30",
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
                </SidebarWidthContext.Provider>
            </SidebarVariantContext.Provider>
        );
    },
);

Sidebar.displayName = "Sidebar";

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
