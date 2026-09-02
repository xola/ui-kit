import { useEventListener, useLatest, useMemoizedFn, useThrottleFn, useUpdateEffect } from "ahooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { variantContextValue } from "./SidebarContext";
import {
    SIDEBAR_VARIANT,
    ceilingForVariant,
    clampWidth,
    resolveCrossingWidth,
    resolveMountWidth,
    resolveToggleWidth,
    variantForWidth,
} from "./sidebarWidth";

// A server render has no viewport to measure, so it assumes a desktop width and never collapses.
const SSR_VIEWPORT_WIDTH = 1280;

const RESIZE_PUBLISH_THROTTLE_MS = 100;

// Computed once at module load: guards every window/document read this file does at render or
// initializer time so a server render resolves to browser defaults instead of throwing.
const isServer = typeof window === "undefined";

// One place builds the suffixes: reads and writes desync silently if any call site typos one.
const storageKeysFor = (storageKey) =>
    storageKey ? { width: storageKey, preferred: `${storageKey}:preferred`, intent: `${storageKey}:intent` } : null;

const hasStoredIntent = (storageKey) => {
    const keys = storageKeysFor(storageKey);

    return !isServer && Boolean(keys) && window.localStorage.getItem(keys.intent) === "1";
};

/**
 * Owns the Sidebar's width state machine: mount-width resolution, auto-collapse on viewport
 * crossing, persistence to localStorage, and the throttled/immediate side-effect publishing
 * (CSS custom property, `onSidebarResize`, `onVariantChange`, `onCollapsedChange`).
 */
export const useSidebarWidthState = ({
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
}) => {
    // Resolved here, not as a destructure default, so the fallback only runs in a browser.
    // `null` is an explicit opt-out and is left alone; only an absent prop gets the default.
    const resolvedCssVariableTarget =
        cssVariableTarget === undefined ? (isServer ? undefined : document.documentElement) : cssVariableTarget;

    const effectiveMaxWidth = Math.min(
        maxWidth,
        ceilingForVariant(variant ?? (isCollapsedProperty ? SIDEBAR_VARIANT.ICONS : SIDEBAR_VARIANT.ICONS_AND_TEXT)),
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

    return { width, setWidth, commitWidth, variantValue, effectiveMaxWidth, resolvedCssVariableTarget };
};
