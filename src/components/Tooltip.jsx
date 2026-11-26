import * as RadixTooltip from "@radix-ui/react-tooltip";
import PropTypes from "prop-types";
import React, { useContext, useRef, useState } from "react";
import cn from "../helpers/classnames";
import { toSideAlign } from "../helpers/placement";
import { warnRemovedProps } from "../helpers/warnRemovedProps";
import { Context } from "./Provider";

const NO_REPLACEMENT = "delete it, there is no replacement";

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

/** Radix adds the arrow height to `sideOffset`; Tippy's `distance` measured to the bubble edge, so subtract it. */
const ARROW_HEIGHT = 8;

/**
 * Radix skips its trigger handler for a default-prevented event. Its open path closes every other open tooltip and
 * resets the provider's skip delay, so a pointermove or focus that must not open the tooltip stops before it reaches it.
 */
const preventOpen = (event) => event.preventDefault();

/**
 * Tooltip on a `<span>` around `children`. The span is the hover and focus target, so a disabled button inside still
 * shows the tooltip.
 *
 * @param {boolean?}         props.disabled          Never shows the tooltip.
 * @param {boolean?}         props.open              Controls visibility. Leave undefined to open on hover and focus.
 * @param {ReactNode?}       props.content           Tooltip body. "", null and undefined show no tooltip.
 * @param {ReactNode}        props.children          Target, wrapped in a `<span>`.
 * @param {string?}          props.placement         Tippy-style placement, e.g. "top", "bottom-start". "auto" is "top".
 * @param {number|number[]?} props.delay             Open delay in ms. With an array, only the first entry is used.
 * @param {number?}          props.skidding          Shift along the aligned edge in px, for "-start"/"-end" placements.
 * @param {number?}          props.distance          Gap between target and bubble in px.
 * @param {number|string?}   props.maxWidth          Bubble max width. Numbers are px.
 * @param {string?}          props.role              Role of the bubble element. Defaults to "tooltip".
 * @param {string?}          props.className         Class name of the target `<span>`.
 * @param {string?}          props.contentClassName  Class name of a `<span>` around `content`.
 * @param {Function?}        props.onOpenChange      `(open: boolean) => void`. Called on hover, focus, Escape and so on.
 * @param {Function?}        props.onClickOutside    Called on a press outside the open bubble and its target.
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
    const [isLocalOpen, setIsLocalOpen] = useState(false);
    const { hasTooltipProvider } = useContext(Context);

    const { side, align } = toSideAlign(placement);
    const hasContent = Boolean(content) || content === 0;
    const isTooltipShown = hasContent && !disabled;
    const openDelay = Array.isArray(delay) ? (delay[0] ?? 0) : delay;

    /**
     * Root stays controlled for its whole life. Switching Radix between controlled and uncontrolled warns, and its
     * own state would reopen a bubble re-enabled after the pointer left.
     */
    const isOpen = isTooltipShown && (open ?? isLocalOpen);
    if (!isTooltipShown && isLocalOpen) {
        setIsLocalOpen(false);
    }

    const handleOpenChange = (nextOpen) => {
        setIsLocalOpen(nextOpen);
        onOpenChange?.(nextOpen);
    };

    /**
     * React bubbles events from portaled children up the component tree, so a Modal the target renders would hover and
     * focus the target from outside it, and the bubble would show over that Modal.
     */
    const handleTriggerOpenEvent = (event) => {
        const isOpenable = isTooltipShown && triggerRef.current?.contains(event.target);
        if (!isOpenable) {
            preventOpen(event);
        }
    };

    const handlePointerDownOutside = (event) => {
        const isTriggerPress = triggerRef.current?.contains(event.target);
        if (!isTriggerPress) {
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
                onFocus={handleTriggerOpenEvent}
                onPointerMove={handleTriggerOpenEvent}
            >
                <span className={className}>{children}</span>
            </RadixTooltip.Trigger>
            <RadixTooltip.Portal>
                <RadixTooltip.Content
                    role={role}
                    side={side}
                    align={align}
                    sideOffset={distance - ARROW_HEIGHT}
                    alignOffset={skidding}
                    // maxWidth is a runtime prop (number or CSS string), which a Tailwind class cannot express
                    style={{ maxWidth }}
                    className={cn(
                        // Padding, line height and z-index match Tippy's default theme, which consumers laid out around
                        "ui-tooltip z-[9999] rounded bg-black px-[9px] py-[5px] text-base leading-[1.4] text-white outline-none",
                        "data-[state=closed]:animate-fade-out data-[state=delayed-open]:animate-fade-in data-[state=instant-open]:animate-fade-in",
                    )}
                    onPointerDownOutside={handlePointerDownOutside}
                >
                    {contentClassName ? <span className={contentClassName}>{content}</span> : content}
                    <RadixTooltip.Arrow width={16} height={ARROW_HEIGHT} className="fill-black" />
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
