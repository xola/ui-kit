import { useMemoizedFn, useMount, useUnmount } from "ahooks";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef, useRef, useState } from "react";
import { isDevelopment } from "../../helpers/environment";
import { XolaLogoSimple } from "../../icons";
import { SidebarAccount } from "./Sidebar.Account";
import { SidebarButton } from "./Sidebar.Button";
import { SidebarFooter } from "./Sidebar.Footer";
import { SidebarHeading } from "./Sidebar.Heading";
import { SidebarLink, SidebarSeparator } from "./Sidebar.Link";
import { SidebarMenu, hideAllSidebarMenus } from "./Sidebar.Menu";
import { SidebarNotifications } from "./Sidebar.Notifications";
import { SidebarVariantContext, SidebarWidthContext } from "./SidebarContext";
import sidebarScroll from "./SidebarScroll.module.css";
import { SIDEBAR_AUTO_COLLAPSE_VIEWPORT, SIDEBAR_WIDTH, clampWidth, snapWidth } from "./sidebarWidth";
import { useSidebarWidthState } from "./useSidebarWidthState";

const RESIZE_STEP = 8;
const RESIZE_STEP_LARGE = 32;

// Storybook renders several sidebars on one page, so two instances sharing a cssVariableTarget is
// a real, survivable scenario, not a misuse to throw on. Module-level so the check spans instances.
const cssVariableTargets = new Set();

const widthRange = (props, propertyName, componentName) => {
    const value = props[propertyName];

    if (value === undefined) {
        return null;
    }

    // The variant bands are fixed at 140/174, so a width outside 64-200 produces a sidebar that
    // can never leave one variant. Fail loudly rather than shipping a sidebar stuck in a band.
    if (typeof value !== "number" || value < SIDEBAR_WIDTH.MIN || value > SIDEBAR_WIDTH.MAX) {
        return new Error(
            `UI Kit: ${componentName} \`${propertyName}\` must be a number between ${SIDEBAR_WIDTH.MIN} and ${SIDEBAR_WIDTH.MAX}.`,
        );
    }

    return null;
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
            isLeftDrawerOpen,
            isRightDrawerOpen,
            handleDrawerStateChange,
            onSidebarResize,
            variant,
            isCollapsed,
            minWidth = SIDEBAR_WIDTH.MIN,
            maxWidth = SIDEBAR_WIDTH.MAX,
            autoCollapseBelow = SIDEBAR_AUTO_COLLAPSE_VIEWPORT,
            storageKey = "sidebarWidth",
            cssVariableTarget,
            onCollapsedChange,
            onVariantChange,
        },
        ref,
    ) => {
        // Ref-gated: a drag re-renders this on every pointermove, so an ungated warning repeats.
        const hasWarnedVariantConflict = useRef(false);
        const hasConflictingVariantProps = variant !== undefined && isCollapsed !== undefined;
        if (isDevelopment && hasConflictingVariantProps && !hasWarnedVariantConflict.current) {
            hasWarnedVariantConflict.current = true;
            console.warn("UI Kit: Sidebar received both `variant` and `isCollapsed`; `variant` wins.");
        }

        // Checked against the raw prop above (undefined unless the consumer passed it), then
        // defaulted here: defaulting in the destructure would make `isCollapsed !== undefined`
        // always true and fire the warning above on every render.
        const isCollapsedProperty = isCollapsed ?? false;

        const { width, setWidth, commitWidth, variantValue, effectiveMaxWidth, resolvedCssVariableTarget } =
            useSidebarWidthState({
                storageKey,
                minWidth,
                maxWidth,
                variant,
                isCollapsedProperty,
                autoCollapseBelow,
                cssVariableTarget,
                onSidebarResize,
                onVariantChange,
                onCollapsedChange,
            });

        // Unmount cleanup reads this, not `resolvedCssVariableTarget`: a target whose identity
        // changed mid-life would otherwise leave the mount-time element in the Set forever.
        const registeredTargetRef = useRef(null);

        useMount(() => {
            if (!resolvedCssVariableTarget) {
                return;
            }

            if (cssVariableTargets.has(resolvedCssVariableTarget)) {
                console.warn(
                    "UI Kit: Multiple Sidebars share the same `cssVariableTarget`; each write overwrites the others.",
                );
            }

            cssVariableTargets.add(resolvedCssVariableTarget);
            registeredTargetRef.current = resolvedCssVariableTarget;
        });

        useUnmount(() => {
            if (registeredTargetRef.current) {
                cssVariableTargets.delete(registeredTargetRef.current);
                registeredTargetRef.current = null;
            }
        });

        const [isHovered, setIsHovered] = useState(false);
        const [isResizing, setIsResizing] = useState(false);
        const dragOriginRef = useRef(0);

        const handlePointerDown = useMemoizedFn((event) => {
            event.preventDefault();
            hideAllSidebarMenus();
            event.currentTarget.setPointerCapture(event.pointerId);
            // clientX is viewport-relative, so a sidebar that does not start at x=0 (isFixed={false}
            // inside an offset container) would jump by that offset on the first move.
            dragOriginRef.current = event.currentTarget.parentElement?.getBoundingClientRect().left ?? 0;
            setIsResizing(true);
        });

        const handlePointerMove = useMemoizedFn((event) => {
            if (!isResizing) {
                return;
            }

            setWidth(clampWidth(event.clientX - dragOriginRef.current, minWidth, effectiveMaxWidth));
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

            commitWidth(snapWidth(width, minWidth, effectiveMaxWidth));
        });

        const handleKeyDown = useMemoizedFn((event) => {
            const step = event.shiftKey ? RESIZE_STEP_LARGE : RESIZE_STEP;
            const deltas = { ArrowLeft: -step, ArrowRight: step };

            let nextWidth;

            if (event.key === "Home") {
                nextWidth = minWidth;
            } else if (event.key === "End") {
                nextWidth = effectiveMaxWidth;
            } else if (deltas[event.key] !== undefined) {
                nextWidth = clampWidth(width + deltas[event.key], minWidth, effectiveMaxWidth);
            } else {
                return;
            }

            event.preventDefault();
            hideAllSidebarMenus();
            commitWidth(nextWidth);
        });

        const handleDoubleClickReset = useMemoizedFn(() => {
            hideAllSidebarMenus();
            commitWidth(effectiveMaxWidth);
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
                            "z-20 flex h-full flex-col border-r-4 border-black bg-black px-1 py-2 text-white transition-all duration-300",
                            (isHovered || isResizing) && "box-border !border-r-4 !border-yellow",
                            // Per-pointermove width writes would each restart the 300ms interpolation,
                            // so the rail trails the cursor. Snap on release still animates.
                            isResizing && "!transition-none",
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

                        <SidebarNotifications
                            notifications={notifications}
                            isCollapsed={variantValue.isCollapsed}
                            width={width}
                            isLeftDrawerOpen={isLeftDrawerOpen}
                            isRightDrawerOpen={isRightDrawerOpen}
                            onDrawerStateChange={handleDrawerStateChange}
                        />

                        {/* Outside the scroll container: on a short viewport the branding would
                            otherwise scroll away with the link list. */}
                        <div className="shrink-0 pb-2 text-center">
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

                        <div className="min-h-0 flex-grow space-y-2 overflow-y-auto">{children}</div>

                        <div className="sticky bottom-0 bg-black">{footer}</div>
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
    footer: PropTypes.element,
    isFixed: PropTypes.bool,
    onLogoClick: PropTypes.func,
    isLeftDrawerOpen: PropTypes.bool,
    isRightDrawerOpen: PropTypes.bool,
    handleDrawerStateChange: PropTypes.func,
    onSidebarResize: PropTypes.func,
    variant: PropTypes.oneOf(["icons", "text", "iconsAndText"]),
    minWidth: widthRange,
    maxWidth: widthRange,
    isCollapsed: PropTypes.bool,
    onCollapsedChange: PropTypes.func,
    onVariantChange: PropTypes.func,
    autoCollapseBelow: PropTypes.number,
    storageKey: PropTypes.string,
    cssVariableTarget: PropTypes.object,
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
