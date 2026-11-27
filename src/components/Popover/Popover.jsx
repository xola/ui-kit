import * as RadixHoverCard from "@radix-ui/react-hover-card";
import * as RadixPopover from "@radix-ui/react-popover";
import PropTypes from "prop-types";
import React, { Children, useContext, useRef, useState } from "react";
import { isFocusVisible } from "../../helpers/browser";
import { BackdropOwnerContext, useOpenLayerProps } from "../../helpers/backdrop";
import { getChildrenByType } from "../../helpers/children";
import cn from "../../helpers/classnames";
import { getMaxWidth } from "../../helpers/maxWidth";
import { ARROW_HEIGHT, ARROW_WIDTH, toSideAlign, toSideOffset } from "../../helpers/placement";
import { NO_REPLACEMENT, USE_ON_OPEN_CHANGE, warnRemovedProps } from "../../helpers/warnRemovedProps";
import styles from "./Popover.module.css";
import scrollFix from "./PopoverScroll.module.css";

/** Tippy props Popover dropped in 3.8, mapped to the replacement text `warnRemovedProps` prints. */
export const POPOVER_REMOVED_PROPS = {
    arrow: NO_REPLACEMENT,
    visible: "use 'open'",
    zIndex: NO_REPLACEMENT,
    duration: NO_REPLACEMENT,
    minWidth: NO_REPLACEMENT,
    enabled: "use 'disabled'",
    onHide: USE_ON_OPEN_CHANGE,
    onShow: USE_ON_OPEN_CHANGE,
    hideOnClick: NO_REPLACEMENT,
    interactive: NO_REPLACEMENT,
    onMount: USE_ON_OPEN_CHANGE,
    onShown: USE_ON_OPEN_CHANGE,
    followCursor: NO_REPLACEMENT,
    onCreate: USE_ON_OPEN_CHANGE,
    onHidden: USE_ON_OPEN_CHANGE,
    interactiveBorder: NO_REPLACEMENT,
    offset: "use 'skidding' and 'distance'",
    trigger: `use 'openOn' ("hover" or "click")`,
    animation: "delete it, there is one built-in fade",
    appendTo: "delete it, the popover portals to document.body",
    isLazy: "delete it, the content mounts only while the popover is open",
};

/**
 * Tippy kept an interactive popover open while the pointer crossed the gap to it. HoverCard only has its close delay
 * for that, so even a zero `delay` leaves this long to reach the content.
 */
const HOVER_CLOSE_GRACE = 100;

/**
 * Radix skips its handler for a default-prevented event, so a hover popover stops a pointerenter or focus it must not
 * open on before HoverCard schedules an open. On auto-focus it keeps focus where the user had it; Tippy never moved
 * focus either.
 */
const preventDefault = (event) => event.preventDefault();

/** Focus moving into a portaled dialog or popper has not left the overlay stack. */
const OVERLAY_FOCUS_TARGET_SELECTOR = "[role='dialog'], [data-headlessui-portal], [data-radix-popper-content-wrapper]";

/** Two triangles 1px apart redraw Tippy's bordered arrow. The white one also covers the box border where they meet. */
const arrowShape = (
    <svg viewBox="0 0 16 8" className="overflow-visible">
        <polygon points="0,-1 16,-1 8,7" className={styles.arrowBorder} />
        <polygon points="0,-2 16,-2 8,6" className={styles.arrow} />
    </svg>
);

const Content = ({ className, children }) => <div className={cn("ui-popover-content", className)}>{children}</div>;

Content.displayName = "Popover.Content";
Content.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

/**
 * Popover on a `<span>` around the target children. A `<Popover.Content>` child is the popover body.
 */
export const Popover = ({
    disabled = false,
    open,
    openOn,
    placement = "top",
    delay = 0,
    skidding = 0,
    distance = 10,
    maxWidth = 350,
    content,
    className,
    children,
    onOpenChange,
    onClickOutside,
    ...removedProps
}) => {
    warnRemovedProps("Popover", removedProps, POPOVER_REMOVED_PROPS);

    const triggerRef = useRef();
    const backdropOwner = useContext(BackdropOwnerContext);
    const isPortaledClickRef = useRef(false);
    const isPressClosedRef = useRef(false);
    const [isLocalOpen, setIsLocalOpen] = useState(false);

    /**
     * Without `openOn`, a popover controlled from its first render gets the click primitive: Tippy ignored triggers once
     * `visible` was set, and HoverCard takes its content out of the tab order. Read once, so a later `open` change
     * never swaps the primitive and remounts the target.
     */
    const isControlledAtMount = useRef(open !== undefined).current;
    const isClickOpened = openOn ? openOn === "click" : isControlledAtMount;
    const Primitive = isClickOpened ? RadixPopover : RadixHoverCard;
    const { side, align } = toSideAlign(placement);
    const [openDelay = 0, closeDelay = 0] = Array.isArray(delay) ? delay : [delay, delay];
    const popoverContent = content === undefined ? getChildrenByType(children, Content) : content;
    const target = Children.toArray(children).filter((child) => child.type !== Content);

    /**
     * Root stays controlled for its whole life. Switching Radix between controlled and uncontrolled warns, and its own
     * state would reopen a popover re-enabled after the pointer left. Local state follows what is shown, so a popover
     * held closed through `open` and then released stays closed until the next hover.
     */
    const isOpen = !disabled && (open ?? isLocalOpen);
    if (isOpen !== isLocalOpen) {
        setIsLocalOpen(isOpen);
    }

    const handleOpenChange = (nextOpen) => {
        const isPortaledClick = isPortaledClickRef.current;
        isPortaledClickRef.current = false;
        if (isPortaledClick) {
            return;
        }

        const isReopenAfterPress = nextOpen && isPressClosedRef.current;
        if (disabled || isReopenAfterPress) {
            return;
        }

        setIsLocalOpen(nextOpen);
        onOpenChange?.(nextOpen);
    };

    /**
     * React bubbles events from portaled children up the component tree, so a Modal rendered inside the target would
     * hover and focus it from outside its DOM. Only the target's own DOM counts.
     */
    const isOnTarget = (event) => triggerRef.current?.contains(event.target);

    /**
     * HoverCard never closes on a press of the target, so a Modal or Drawer opened from it would sit under the popover.
     * Reopening waits for pointer re-entry or keyboard navigation away, since the press and the Modal closing both
     * focus the target. Touch is excluded: a tap leaves a keyboard-opened popover open.
     */
    const handleTargetPointerDown = (event) => {
        const isMousePress = event.pointerType !== "touch" && isOnTarget(event);
        if (!isMousePress) {
            return;
        }

        isPressClosedRef.current = true;
        if (isOpen) {
            handleOpenChange(false);
        }
    };

    const handleTargetPointerEnter = (event) => {
        if (disabled || !isOnTarget(event)) {
            preventDefault(event);
            return;
        }

        isPressClosedRef.current = false;
    };

    const handleTargetBlur = (event) => {
        const overlayFocusTarget = event.relatedTarget?.closest(OVERLAY_FOCUS_TARGET_SELECTOR);
        if (isOnTarget(event) && !overlayFocusTarget) {
            isPressClosedRef.current = false;
        }
    };

    /**
     * Only keyboard focus opens a hover popover. Dialogs focus from script on open and restore it on close, and
     * `:focus-visible` matches that only when the previous focus came from the keyboard.
     */
    const handleTargetFocus = (event) => {
        const isOpenable = !disabled && isOnTarget(event) && isFocusVisible(event.target);
        if (!isOpenable) {
            preventDefault(event);
        }
    };

    /**
     * Radix's outside-press and Escape listeners stay mounted through the fade-out. A closed popover ignores them, or a
     * second press would reach a toggle-style `onClickOutside` and reopen it. A press on the target is left to the
     * target: Radix Popover toggles on it, and `handleTargetPointerDown` closes a hover popover.
     */
    const handlePointerDownOutside = (event) => {
        if (!isOpen) {
            return;
        }

        const isTargetPress = isOnTarget(event);
        if (isTargetPress) {
            event.preventDefault();
            return;
        }

        onClickOutside?.();
    };

    /**
     * Radix default-prevents the Escape it handles, so an enclosing Modal never sees it. A popover controlled without
     * `onOpenChange` would then stay open, and `onClickOutside` is the only close request its consumer handles.
     */
    const handleEscapeKeyDown = () => {
        const isCloseOnlyThroughClickOutside = isOpen && open !== undefined && !onOpenChange;
        if (isCloseOnlyThroughClickOutside) {
            onClickOutside?.();
        }
    };

    const handleFocusOutside = (event) => {
        if (!isOpen) {
            return;
        }

        event.preventDefault();
        if (isOnTarget(event)) {
            return;
        }

        onClickOutside?.();
        handleOpenChange(false);
    };

    const handleTargetClick = (event) => {
        isPortaledClickRef.current = !isOnTarget(event);
    };

    /** A backdrop press makes the same close request an outside press does: the callback plus Radix's own close. */
    const dismissLayer = () => {
        onClickOutside?.();
        handleOpenChange(false);
    };
    const layerProps = useOpenLayerProps(isOpen, backdropOwner, dismissLayer);

    const hoverTriggerHandlers = {
        onBlur: handleTargetBlur,
        onFocus: handleTargetFocus,
        onPointerDown: handleTargetPointerDown,
        onPointerEnter: handleTargetPointerEnter,
    };
    const triggerHandlers = isClickOpened ? { onClick: handleTargetClick } : hoverTriggerHandlers;
    const rootDelays = isClickOpened ? {} : { openDelay, closeDelay: Math.max(closeDelay, HOVER_CLOSE_GRACE) };
    const contentFocus = isClickOpened
        ? { onOpenAutoFocus: preventDefault, onCloseAutoFocus: preventDefault, onFocusOutside: handleFocusOutside }
        : {};

    return (
        <Primitive.Root open={isOpen} onOpenChange={handleOpenChange} {...rootDelays}>
            <Primitive.Trigger asChild ref={triggerRef} {...triggerHandlers}>
                <span>{target}</span>
            </Primitive.Trigger>
            <Primitive.Portal>
                <Primitive.Content
                    side={side}
                    align={align}
                    sideOffset={toSideOffset(distance)}
                    alignOffset={skidding}
                    // maxWidth is a runtime prop (number or CSS string), which a Tailwind class cannot express
                    style={{ maxWidth: getMaxWidth(maxWidth) }}
                    className={cn(
                        "ui-popover",
                        scrollFix,
                        styles.main,
                        // Font size, line height and z-index match the Tippy box consumers laid out around
                        "z-50 !rounded-lg !border-gray-light text-base leading-[1.4] text-black shadow-xl outline-none",
                        "data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in",
                        className,
                    )}
                    {...layerProps}
                    onEscapeKeyDown={handleEscapeKeyDown}
                    onPointerDownOutside={handlePointerDownOutside}
                    {...contentFocus}
                >
                    {popoverContent}
                    <Primitive.Arrow asChild width={ARROW_WIDTH} height={ARROW_HEIGHT}>
                        {arrowShape}
                    </Primitive.Arrow>
                </Primitive.Content>
            </Primitive.Portal>
        </Primitive.Root>
    );
};

Popover.propTypes = {
    disabled: PropTypes.bool,
    open: PropTypes.bool,
    openOn: PropTypes.oneOf(["hover", "click"]),
    placement: PropTypes.string,
    delay: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    skidding: PropTypes.number,
    distance: PropTypes.number,
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    content: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onOpenChange: PropTypes.func,
    onClickOutside: PropTypes.func,
};

Popover.Content = Content;
