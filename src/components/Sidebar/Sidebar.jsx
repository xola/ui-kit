import {
    useEventListener,
    useLatest,
    useMemoizedFn,
    useMount,
    useThrottleFn,
    useUnmount,
    useUpdateEffect,
} from "ahooks";
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
    SIDEBAR_AUTO_COLLAPSE_VIEWPORT,
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

// A server render has no viewport to measure, so it assumes a desktop width and never collapses.
const SSR_VIEWPORT_WIDTH = 1280;

const RESIZE_STEP = 8;
const RESIZE_STEP_LARGE = 32;
const RESIZE_PUBLISH_THROTTLE_MS = 100;

// Computed once at module load: guards every window/document read this file does at render or
// initializer time so a server render resolves to browser defaults instead of throwing.
const isServer = typeof window === "undefined";

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

// One place builds the suffixes: reads and writes desync silently if any call site typos one.
const storageKeysFor = (storageKey) =>
    storageKey ? { width: storageKey, preferred: `${storageKey}:preferred`, intent: `${storageKey}:intent` } : null;

const hasStoredIntent = (storageKey) => {
    const keys = storageKeysFor(storageKey);

    return !isServer && Boolean(keys) && window.localStorage.getItem(keys.intent) === "1";
};

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
        // `process` isn't declared here: consumers' bundlers (webpack, Vite) statically replace
        // process.env.NODE_ENV, the same pattern react/prop-types rely on for dev-only warnings.
        // eslint-disable-next-line no-undef
        if (process.env.NODE_ENV !== "production" && variant !== undefined && isCollapsed !== undefined) {
            console.warn("UI Kit: Sidebar received both `variant` and `isCollapsed`; `variant` wins.");
        }

        // Checked against the raw prop above (undefined unless the consumer passed it), then
        // defaulted here: defaulting in the destructure would make `isCollapsed !== undefined`
        // always true and fire the warning above on every render.
        const isCollapsedProperty = isCollapsed ?? false;

        // Resolved here, not as a destructure default, so the fallback only runs in a browser.
        // `null` is an explicit opt-out and is left alone; only an absent prop gets the default.
        const resolvedCssVariableTarget =
            cssVariableTarget === undefined ? (isServer ? undefined : document.documentElement) : cssVariableTarget;

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
        });

        useUnmount(() => {
            if (resolvedCssVariableTarget) {
                cssVariableTargets.delete(resolvedCssVariableTarget);
            }
        });

        const effectiveMaxWidth = Math.min(
            maxWidth,
            ceilingForVariant(
                variant ?? (isCollapsedProperty ? SIDEBAR_VARIANT.ICONS : SIDEBAR_VARIANT.ICONS_AND_TEXT),
            ),
        );

        // The ceiling the toggle must restore into. Unlike `effectiveMaxWidth`, this never folds in
        // the *current* `isCollapsed` value: resolving a toggle-to-expand against a ceiling that is
        // itself pinned to `minWidth` by the collapse being escaped would clamp the restored width
        // right back down to `minWidth`, stranding the sidebar collapsed forever. `variant` still
        // applies here, since it is a real, permanent ceiling rather than the two-state control
        // `isCollapsed` is.
        const uncollapsedMaxWidth = Math.min(maxWidth, ceilingForVariant(variant ?? SIDEBAR_VARIANT.ICONS_AND_TEXT));

        // `storageKey` alone holds the rendered width (consumers read it for layout during their
        // own first render), which can itself be an auto-collapsed 64. `:preferred` holds the
        // user's actual chosen width so a later expand restores it instead of the collapsed value.
        const readStoredWidth = () => {
            if (!storageKey || isServer) {
                return null;
            }

            const keys = storageKeysFor(storageKey);

            return window.localStorage.getItem(keys.preferred) ?? window.localStorage.getItem(keys.width);
        };

        const [width, setWidth] = useState(() => {
            const resolved = resolveMountWidth({
                storedWidth: readStoredWidth(),
                hasIntent: hasStoredIntent(storageKey),
                viewportWidth: isServer ? SSR_VIEWPORT_WIDTH : window.innerWidth,
                minWidth,
                maxWidth: effectiveMaxWidth,
                autoCollapseBelow,
            });

            // Written here, not in an effect: consumers read this key during their own first render
            // (x2-seller Page.tsx:42), so a post-paint write leaves them offsetting against a stale width.
            if (storageKey && !isServer) {
                window.localStorage.setItem(storageKeysFor(storageKey).width, String(resolved));
            }

            return resolved;
        });

        // Seeded from the stored width, not null: mounting below the auto-collapse threshold with
        // no in-session history must still know what to restore on the first upward crossing.
        const [lastExpandedWidth, setLastExpandedWidth] = useState(() => {
            const clamped = clampWidth(readStoredWidth(), minWidth, effectiveMaxWidth);
            return clamped > minWidth ? clamped : null;
        });

        const wasBelowRef = useRef(!isServer && window.innerWidth < (autoCollapseBelow ?? 0));
        // Seeded from the persisted flag: a reload below the threshold has no in-session drag/toggle
        // to set this, but the user's earlier intent still applies.
        const hasIntentBelowRef = useRef(hasStoredIntent(storageKey));
        const currentVariant = variantForWidth(width);
        const isWidthCollapsed = width <= minWidth;

        const [isHovered, setIsHovered] = useState(false);
        const [isResizing, setIsResizing] = useState(false);

        const { announcements: leftDrawer, notices: rightDrawer } = notifications ?? {};
        const hideRightDrawer = rightDrawer?.count <= 0 || !rightDrawer;
        const isStickyHeaderFooter = isStickyHeader && isStickyFooter;

        // useMemoizedFn: one stable reference whose body still reads the current width and bounds,
        // so the listener subscribes once and can never act on a stale width.
        const handleViewportResize = useMemoizedFn(() => {
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

            // Skip the setters when nothing crossed: a resize that changes no width queues no render.
            if (next.width === width && next.lastExpandedWidth === lastExpandedWidth) {
                return;
            }

            setWidth(next.width);
            setLastExpandedWidth(next.lastExpandedWidth);
        });

        // `enable` rather than a guard inside the handler: a null autoCollapseBelow means the
        // consumer opted out of the viewport rule, so no listener is attached at all.
        useEventListener("resize", handleViewportResize, { enable: autoCollapseBelow != null });

        // Memoized: a consumer passing an inline onSidebarResize/onVariantChange would otherwise
        // change identity every render and re-fire these effects on every parent re-render, re-
        // writing localStorage and re-setting the CSS variable with no actual width/variant change.
        const notifySidebarResize = useMemoizedFn((value) => onSidebarResize?.(value));
        const notifyVariantChange = useMemoizedFn((value) => onVariantChange?.(value));
        const notifyCollapsedChange = useMemoizedFn((value) => onCollapsedChange?.(value));

        // The custom property drives consumer layout live, so it stays synchronous. The
        // localStorage write and the resize callback are throttled below: a drag fires this effect
        // once per pointermove, and an unthrottled callback would re-render every consumer that
        // stores the width once per pixel dragged.
        useEffect(() => {
            if (resolvedCssVariableTarget) {
                resolvedCssVariableTarget.style.setProperty("--ui-sidebar-width", `${width}px`);
            }
        }, [width, resolvedCssVariableTarget]);

        // A flushed gesture and the width effect's trailing call can carry the same width, and a
        // repeat publish would re-write storage and wake every consumer for no change.
        const lastPublishedWidthRef = useRef(null);

        const publishWidth = useMemoizedFn((value) => {
            if (lastPublishedWidthRef.current === value) {
                return;
            }

            lastPublishedWidthRef.current = value;

            if (storageKey) {
                window.localStorage.setItem(storageKeysFor(storageKey).width, String(value));
            }

            notifySidebarResize(String(value));
        });

        const { run: runPublishWidth, flush: flushPublishWidth } = useThrottleFn(publishWidth, {
            wait: RESIZE_PUBLISH_THROTTLE_MS,
        });

        useEffect(() => {
            runPublishWidth(width);
        }, [width, runPublishWidth]);

        useEffect(() => {
            notifyVariantChange(currentVariant);
        }, [currentVariant, notifyVariantChange]);

        // useUpdateEffect, not useEffect: a sidebar that mounts already collapsed must not announce
        // a change that never happened.
        useUpdateEffect(() => {
            notifyCollapsedChange(isWidthCollapsed);
        }, [isWidthCollapsed, notifyCollapsedChange]);

        // These are only ever read at the moment the prop flips, never a reason to re-run, so a ref
        // keeps them out of the dependency list and off the per-drag-frame path.
        const latestCollapseState = useLatest({
            width,
            lastExpandedWidth,
            isWidthCollapsed,
            minWidth,
            uncollapsedMaxWidth,
        });

        useUpdateEffect(() => {
            const current = latestCollapseState.current;

            // Width may already agree with the new prop when an internal width change (keyboard,
            // drag, auto-collapse) is what moved it and the consumer mirrored that into `isCollapsed`.
            // Re-running resolveToggleWidth then would read the updated width and toggle it a second
            // time, so only apply the transition when width and prop actually disagree.
            if (isCollapsedProperty === current.isWidthCollapsed) {
                return;
            }

            // A controlled consumer flips this prop instead of clicking the toggle. resolveToggleWidth
            // branches on the current width, not on which direction changed, so reusing it here keeps
            // controlled and uncontrolled collapse landing in identical width/lastExpandedWidth state.
            // Resolved against `uncollapsedMaxWidth`, not `effectiveMaxWidth`, so expanding out of a
            // collapse isn't clamped by the very ceiling the collapse imposed.
            const next = resolveToggleWidth({
                width: current.width,
                lastExpandedWidth: current.lastExpandedWidth,
                minWidth: current.minWidth,
                maxWidth: current.uncollapsedMaxWidth,
            });

            setWidth(next.width);
            setLastExpandedWidth(next.lastExpandedWidth);
        }, [isCollapsedProperty, latestCollapseState]);

        const variantValue = useMemo(() => variantContextValue(currentVariant), [currentVariant]);

        // Marks that the user has made an explicit width choice, so a later mount below
        // autoCollapseBelow restores it instead of re-auto-collapsing (resolveMountWidth's
        // hasIntent) and a later upward crossing doesn't overwrite an already-chosen width
        // (resolveCrossingWidth's hasIntentBelow). Writes `:preferred` synchronously with the width
        // being recorded rather than relying on a later effect: `setWidth` bails out with no
        // re-render when the value is unchanged (a no-op drag release, `End` already at max), so an
        // effect gated on width change would never run and a stale "user changed it" flag would
        // latch true until the next unrelated width change wrote `:preferred` in its place.
        const recordIntent = useMemoizedFn((chosenWidth) => {
            if (window.innerWidth < (autoCollapseBelow ?? 0)) {
                hasIntentBelowRef.current = true;
            }

            if (!storageKey) {
                return;
            }

            const keys = storageKeysFor(storageKey);

            window.localStorage.setItem(keys.intent, "1");
            window.localStorage.setItem(keys.preferred, String(chosenWidth));
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
        // Every explicit width gesture lands here. `runPublishWidth` seeds the throttle with the
        // settled value before `flush`, because the effect that would otherwise feed it runs after
        // commit: flushing first publishes whatever the last pointermove left in the throttle.
        const commitWidth = useMemoizedFn((next) => {
            // Recorded even when the width is unchanged: pressing End at max is still an explicit
            // choice, and that intent decides whether a later mount auto-collapses.
            recordIntent(next);

            if (next === width) {
                return;
            }

            setWidth(next);
            runPublishWidth(next);
            flushPublishWidth();
        });

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
            commitWidth(nextWidth);
        });

        const handleDoubleClickReset = useMemoizedFn(() => {
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
    footer: PropTypes.element,
    isFixed: PropTypes.bool,
    isStickyHeader: PropTypes.bool,
    isStickyFooter: PropTypes.bool,
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
