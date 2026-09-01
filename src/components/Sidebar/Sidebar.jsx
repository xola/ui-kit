import { useMemoizedFn } from "ahooks";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { AnnounceIcon, BellIcon, CollapseIcon, XolaLogoSimple } from "../../icons";
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
    clampWidth,
    resolveCrossingWidth,
    resolveMountWidth,
    resolveToggleWidth,
    snapWidth,
    variantForWidth,
} from "./sidebarWidth";

const RESIZE_STEP = 8;
const RESIZE_STEP_LARGE = 32;

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
            isCollapsible = false,
            minWidth = SIDEBAR_WIDTH.MIN,
            maxWidth = SIDEBAR_WIDTH.MAX,
            autoCollapseBelow = null,
            storageKey = null,
            cssVariableTarget = null,
            onCollapsedChange,
            onVariantChange,
        },
        ref,
    ) => {
        const effectiveMaxWidth = Math.min(
            maxWidth,
            ceilingForVariant(variant ?? (isCollapsed ? SIDEBAR_VARIANT.ICONS : SIDEBAR_VARIANT.ICONS_AND_TEXT)),
        );

        // `storageKey` alone holds the rendered width (consumers read it for layout during their
        // own first render), which can itself be an auto-collapsed 64. `:preferred` holds the
        // user's actual chosen width so a later expand restores it instead of the collapsed value.
        const readStoredWidth = () => {
            if (!storageKey) {
                return null;
            }

            return window.localStorage.getItem(`${storageKey}:preferred`) ?? window.localStorage.getItem(storageKey);
        };

        const [width, setWidth] = useState(() => {
            const resolved = resolveMountWidth({
                storedWidth: readStoredWidth(),
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

        // Seeded from the stored width, not null: mounting below the auto-collapse threshold with
        // no in-session history must still know what to restore on the first upward crossing.
        const [lastExpandedWidth, setLastExpandedWidth] = useState(() => {
            const clamped = clampWidth(readStoredWidth(), minWidth, effectiveMaxWidth);
            return clamped > minWidth ? clamped : null;
        });

        const wasBelowRef = useRef(window.innerWidth < (autoCollapseBelow ?? 0));
        // Seeded from the persisted flag: a reload below the threshold has no in-session drag/toggle
        // to set this, but the user's earlier intent still applies.
        const hasIntentBelowRef = useRef(
            storageKey ? window.localStorage.getItem(`${storageKey}:intent`) === "1" : false,
        );
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

                // Native resize events aren't batched in React 17, and this listener's closure goes
                // stale the moment a render commits without React yet having flushed the passive
                // effect that would resubscribe it with fresh width/lastExpandedWidth. A second event
                // arriving in that window would otherwise re-run the no-crossing branch below, which
                // echoes back exactly the (stale) width/lastExpandedWidth it was given, and clobber
                // whatever the first event already queued. Bail instead of calling the setters when
                // nothing actually crossed.
                if (next.width === width && next.lastExpandedWidth === lastExpandedWidth) {
                    return;
                }

                setWidth(next.width);
                setLastExpandedWidth(next.lastExpandedWidth);
            };

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, [autoCollapseBelow, width, lastExpandedWidth, minWidth, effectiveMaxWidth]);

        // Memoized: a consumer passing an inline onSidebarResize/onVariantChange would otherwise
        // change identity every render and re-fire these effects on every parent re-render, re-
        // writing localStorage and re-setting the CSS variable with no actual width/variant change.
        const notifySidebarResize = useMemoizedFn((value) => onSidebarResize?.(value));
        const notifyVariantChange = useMemoizedFn((value) => onVariantChange?.(value));

        useEffect(() => {
            if (storageKey) {
                window.localStorage.setItem(storageKey, String(width));

                if (window.localStorage.getItem(`${storageKey}:intent`) === "1") {
                    window.localStorage.setItem(`${storageKey}:preferred`, String(width));
                }
            }

            if (cssVariableTarget) {
                cssVariableTarget.style.setProperty("--ui-sidebar-width", `${width}px`);
            }

            notifySidebarResize(String(width));
        }, [width, storageKey, cssVariableTarget, notifySidebarResize]);

        useEffect(() => {
            notifyVariantChange(currentVariant);
        }, [currentVariant, notifyVariantChange]);

        // Guarded against mount: `isCollapsed` only seeds `effectiveMaxWidth` on first render (see
        // above), so without this ref check every mount would immediately re-run the collapse
        // transition against the width `resolveMountWidth` already settled on.
        const previousIsCollapsedRef = useRef(isCollapsed);

        useEffect(() => {
            if (previousIsCollapsedRef.current === isCollapsed) {
                return;
            }

            previousIsCollapsedRef.current = isCollapsed;

            // A controlled consumer flips this prop instead of clicking the toggle. resolveToggleWidth
            // branches on the current width, not on which direction changed, so reusing it here keeps
            // controlled and uncontrolled collapse landing in identical width/lastExpandedWidth state.
            const next = resolveToggleWidth({ width, lastExpandedWidth, minWidth, maxWidth: effectiveMaxWidth });

            setWidth(next.width);
            setLastExpandedWidth(next.lastExpandedWidth);
        }, [isCollapsed, width, lastExpandedWidth, minWidth, effectiveMaxWidth]);

        const variantValue = useMemo(() => variantContextValue(currentVariant), [currentVariant]);

        const isWidthCollapsed = width <= minWidth;

        // Marks that the user has made an explicit width choice, so a later mount below
        // autoCollapseBelow restores it instead of re-auto-collapsing (resolveMountWidth's
        // hasIntent) and a later upward crossing doesn't overwrite an already-chosen width
        // (resolveCrossingWidth's hasIntentBelow).
        const recordIntent = useMemoizedFn(() => {
            if (!storageKey) {
                return;
            }

            window.localStorage.setItem(`${storageKey}:intent`, "1");

            if (window.innerWidth < (autoCollapseBelow ?? 0)) {
                hasIntentBelowRef.current = true;
            }
        });

        const handlePointerDown = useMemoizedFn((event) => {
            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            setIsResizing(true);
        });

        const handlePointerMove = useMemoizedFn((event) => {
            if (!isResizing) {
                return;
            }

            setWidth(clampWidth(event.clientX, minWidth, effectiveMaxWidth));
        });

        // Shared by pointerup and pointercancel: a touch gesture reinterpreted as a scroll, a
        // system gesture, or the browser reclaiming the pointer all fire pointercancel INSTEAD of
        // pointerup, and capture is implicitly released before it fires. Skipping this teardown on
        // that path is what latched the resize highlight permanently before this task existed.
        const finishResize = useMemoizedFn((event) => {
            if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
            }

            setIsResizing(false);
            setWidth((current) => snapWidth(current, minWidth, effectiveMaxWidth));
            recordIntent();
        });

        const handleKeyDown = useMemoizedFn((event) => {
            const step = event.shiftKey ? RESIZE_STEP_LARGE : RESIZE_STEP;
            const deltas = { ArrowLeft: -step, ArrowRight: step };

            if (event.key === "Home") {
                setWidth(minWidth);
            } else if (event.key === "End") {
                setWidth(effectiveMaxWidth);
            } else if (deltas[event.key] !== undefined) {
                setWidth((current) => clampWidth(current + deltas[event.key], minWidth, effectiveMaxWidth));
            } else {
                return;
            }

            event.preventDefault();
            recordIntent();
        });

        const handleToggle = useMemoizedFn(() => {
            const next = resolveToggleWidth({ width, lastExpandedWidth, minWidth, maxWidth: effectiveMaxWidth });

            setWidth(next.width);
            setLastExpandedWidth(next.lastExpandedWidth);
            recordIntent();
            onCollapsedChange?.(next.width === minWidth);
        });

        const handleDoubleClickReset = useMemoizedFn(() => {
            setWidth(effectiveMaxWidth);
            recordIntent();
        });

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
                        <div
                            role="separator"
                            aria-orientation="vertical"
                            aria-label="Resize sidebar"
                            aria-valuenow={width}
                            aria-valuemin={minWidth}
                            aria-valuemax={effectiveMaxWidth}
                            tabIndex={0}
                            // w-6 not w-4: WCAG 2.5.8 wants a 24px target, and the bug this fixes is on a touch device.
                            className="absolute -right-3 bottom-0 top-0 z-10 w-6 cursor-ew-resize"
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={finishResize}
                            onPointerCancel={finishResize}
                            onKeyDown={handleKeyDown}
                            onDoubleClick={handleDoubleClickReset}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        />

                        {isCollapsible && (
                            <button
                                type="button"
                                aria-label={isWidthCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                                aria-expanded={!isWidthCollapsed}
                                className="absolute -right-3 top-8 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-gray-darker"
                                onPointerDown={(event) => event.stopPropagation()}
                                onClick={handleToggle}
                            >
                                <CollapseIcon className={clsx("h-3 w-3", isWidthCollapsed && "rotate-180")} />
                            </button>
                        )}

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
