import * as RadixTooltip from "@radix-ui/react-tooltip";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useRef, useState } from "react";
import { isFocusVisible } from "../helpers/browser";
import { BackdropOwnerContext, getOpenLayerProps } from "../helpers/backdrop";
import cn from "../helpers/classnames";
import { getMaxWidth } from "../helpers/maxWidth";
import { ARROW_HEIGHT, ARROW_WIDTH, toSideAlign, toSideOffset } from "../helpers/placement";
import { NO_REPLACEMENT, warnRemovedProps } from "../helpers/warnRemovedProps";
import { Context } from "./Provider";

/** Tippy props Tooltip dropped in 3.8, mapped to the replacement text `warnRemovedProps` prints. */
export const TOOLTIP_REMOVED_PROPS = {
    visible: "use 'open'",
    enabled: "use 'disabled'",
    allowHTML: "pass JSX as 'content'",
    offset: "use 'skidding' and 'distance'",
    animation: "delete it, there is one built-in fade",
    appendTo: "delete it, the tooltip portals to document.body",
    trigger: "delete it, the tooltip opens on hover and focus; use 'open' to control it",
    arrow: NO_REPLACEMENT,
    zIndex: NO_REPLACEMENT,
    duration: NO_REPLACEMENT,
    minWidth: NO_REPLACEMENT,
    onCreate: NO_REPLACEMENT,
    onShown: NO_REPLACEMENT,
    hideOnClick: NO_REPLACEMENT,
    interactive: NO_REPLACEMENT,
    followCursor: NO_REPLACEMENT,
    interactiveBorder: NO_REPLACEMENT,
};

/**
 * Radix skips its trigger handler for a default-prevented event. Its open path closes every other open tooltip and
 * resets the provider's skip delay, so a pointermove or focus that must not open the tooltip stops before it reaches it.
 */
const preventOpen = (event) => event.preventDefault();

/**
 * Tooltip on a `<span>` around `children`. The span is the hover and focus target, so a disabled button inside still
 * shows the tooltip.
 */
export const Tooltip = ({
    disabled = false,
    open,
    content,
    children,
    placement = "top",
    delay = 0,
    skidding = 0,
    distance = 10,
    maxWidth = 350,
    role = "tooltip",
    className,
    contentClassName,
    onOpenChange,
    onClickOutside,
    ...removedProps
}) => {
    warnRemovedProps("Tooltip", removedProps, TOOLTIP_REMOVED_PROPS);

    const triggerRef = useRef();
    const pointerTypeRef = useRef();
    const isOpenAtPressRef = useRef(false);
    const isOpenRequestStaleRef = useRef(false);
    const [isLocalOpen, setIsLocalOpen] = useState(false);
    const { hasTooltipProvider } = useContext(Context);
    const backdropOwner = useContext(BackdropOwnerContext);

    const { side, align } = toSideAlign(placement);
    const hasContent = Boolean(content) || content === 0;
    const isTooltipShown = hasContent && !disabled;
    const openDelay = Array.isArray(delay) ? (delay[0] ?? 0) : delay;

    /**
     * Root stays controlled for its whole life. Switching Radix between controlled and uncontrolled warns, and its
     * own state would reopen a bubble re-enabled after the pointer left. Local state follows what is shown, so a
     * tooltip held closed through `open` and then released stays closed until the next hover.
     */
    const isOpen = isTooltipShown && (open ?? isLocalOpen);
    if (isOpen !== isLocalOpen) {
        setIsLocalOpen(isOpen);
    }

    /**
     * Radix does not cancel a delayed open it started when the tooltip stops being able to show, and its timer fires
     * later. An open request counts only after a hover, keyboard focus or tap that could open the tooltip again.
     */
    useEffect(() => {
        if (!isTooltipShown) {
            isOpenRequestStaleRef.current = true;
        }
    }, [isTooltipShown]);

    const handleOpenChange = (nextOpen) => {
        const isOpenRejected = nextOpen && (!isTooltipShown || isOpenRequestStaleRef.current);
        if (isOpenRejected) {
            return;
        }

        setIsLocalOpen(nextOpen);
        onOpenChange?.(nextOpen);
    };

    const isOnTarget = (event) => triggerRef.current?.contains(event.target);

    /**
     * React bubbles events from portaled children up the component tree, so a Modal the target renders would hover and
     * focus the target from outside it, and the bubble would show over that Modal.
     */
    const isOpenableFrom = (event) => isTooltipShown && isOnTarget(event);

    const handleTriggerPointerMove = (event) => {
        if (!isOpenableFrom(event)) {
            preventOpen(event);
            return;
        }

        isOpenRequestStaleRef.current = false;
    };

    /**
     * Only keyboard focus opens the tooltip. Headless UI focuses from script, into a dialog as it opens and back to the
     * opener as it closes, and `:focus-visible` matches that focus only when the previous focus came from the keyboard.
     * A tap's focus opens nothing: Radix's click handler would close the tooltip again, so the tap's click decides.
     */
    const handleTriggerFocus = (event) => {
        const isKeyboardFocus = isFocusVisible(event.target);
        const isTouchPress = pointerTypeRef.current === "touch";
        const isOpenable = isOpenableFrom(event) && isKeyboardFocus && !isTouchPress;
        if (!isOpenable) {
            preventOpen(event);
            return;
        }

        isOpenRequestStaleRef.current = false;
    };

    /**
     * Radix Tooltip ignores touch, so a tap on the target toggles the tooltip, as Tippy's did. Radix closes an open
     * tooltip on the press itself, so the press records whether it was open, and the click opens one that was closed.
     * The click is not prevented or stopped: it still reaches the wrapped control.
     */
    const handleTriggerPointerDown = (event) => {
        pointerTypeRef.current = event.pointerType;
        isOpenAtPressRef.current = isOpen;
    };

    /** A press the browser cancels, e.g. a scroll starting on the target, gets no click to clear its pointer type. */
    const handleTriggerPointerCancel = () => {
        pointerTypeRef.current = undefined;
    };

    const handleTriggerClick = (event) => {
        const isTapWhileClosed = pointerTypeRef.current === "touch" && !isOpenAtPressRef.current;
        pointerTypeRef.current = undefined;
        if (!isTapWhileClosed || !isOpenableFrom(event)) {
            return;
        }

        isOpenRequestStaleRef.current = false;
        handleOpenChange(true);
    };

    /**
     * The content, and Radix's outside-press and Escape listeners with it, stay mounted through the fade-out. A closed
     * tooltip ignores them, or a second press would reach a toggle-style `onClickOutside` and reopen it. A press on the
     * target is left to the target.
     */
    const handlePointerDownOutside = (event) => {
        const isTargetPress = isOnTarget(event);
        if (!isOpen || isTargetPress) {
            return;
        }

        onClickOutside?.();
    };

    /**
     * Radix default-prevents the Escape it handles, so an enclosing Modal or Drawer never sees it. A tooltip controlled
     * without `onOpenChange` would then stay open and take every Escape, and `onClickOutside` is the only close request
     * its consumer handles. Only while open, for the same fade-out reason as presses.
     */
    const handleEscapeKeyDown = () => {
        const isCloseOnlyThroughClickOutside = isOpen && open !== undefined && !onOpenChange;
        if (isCloseOnlyThroughClickOutside) {
            onClickOutside?.();
        }
    };

    // Forced closed rather than bare children, so toggling `disabled` does not remount the target
    const tooltip = (
        <RadixTooltip.Root
            disableHoverableContent
            open={isOpen}
            delayDuration={openDelay}
            onOpenChange={handleOpenChange}
        >
            <RadixTooltip.Trigger
                asChild
                ref={triggerRef}
                onFocus={handleTriggerFocus}
                onPointerMove={handleTriggerPointerMove}
                onPointerDown={handleTriggerPointerDown}
                onPointerCancel={handleTriggerPointerCancel}
                onClick={handleTriggerClick}
            >
                <span className={className}>{children}</span>
            </RadixTooltip.Trigger>
            <RadixTooltip.Portal>
                <RadixTooltip.Content
                    role={role}
                    side={side}
                    align={align}
                    sideOffset={toSideOffset(distance)}
                    alignOffset={skidding}
                    // maxWidth is a runtime prop (number or CSS string), which a Tailwind class cannot express
                    style={{ maxWidth: getMaxWidth(maxWidth) }}
                    className={cn(
                        // Padding, line height and z-index match Tippy's default theme, which consumers laid out around
                        "ui-tooltip z-[9999] rounded bg-black px-[9px] py-[5px] text-base leading-[1.4] text-white outline-none",
                        "data-[state=closed]:animate-fade-out data-[state=delayed-open]:animate-fade-in data-[state=instant-open]:animate-fade-in",
                    )}
                    {...getOpenLayerProps(isOpen, backdropOwner)}
                    onEscapeKeyDown={handleEscapeKeyDown}
                    onPointerDownOutside={handlePointerDownOutside}
                >
                    {contentClassName ? <span className={contentClassName}>{content}</span> : content}
                    <RadixTooltip.Arrow width={ARROW_WIDTH} height={ARROW_HEIGHT} className="fill-black" />
                </RadixTooltip.Content>
            </RadixTooltip.Portal>
        </RadixTooltip.Root>
    );

    return hasTooltipProvider ? tooltip : <RadixTooltip.Provider>{tooltip}</RadixTooltip.Provider>;
};

Tooltip.propTypes = {
    disabled: PropTypes.bool,
    open: PropTypes.bool,
    content: PropTypes.node,
    children: PropTypes.node.isRequired,
    placement: PropTypes.string,
    delay: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    skidding: PropTypes.number,
    distance: PropTypes.number,
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    role: PropTypes.string,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    onOpenChange: PropTypes.func,
    onClickOutside: PropTypes.func,
};
