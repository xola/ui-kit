import * as RadixHoverCard from "@radix-ui/react-hover-card";
import * as RadixPopover from "@radix-ui/react-popover";
import PropTypes from "prop-types";
import React, { Children, useContext, useRef, useState } from "react";
import { isFocusVisible } from "../../helpers/browser";
import { BackdropOwnerContext } from "../../helpers/backdrop";
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
 * Radix skips its trigger handler for a default-prevented event, so a hover popover stops a pointerenter or focus it
 * must not open on before HoverCard schedules an open.
 */
const preventOpen = (event) => event.preventDefault();

/** Tippy never moved focus, and a popover opened while the user types elsewhere must not take it. */
const keepFocus = (event) => event.preventDefault();

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
 *
 * @param {boolean?}         props.disabled        Never shows the popover.
 * @param {boolean?}         props.open            Controls visibility. Leave undefined to open on `openOn`.
 * @param {string?}          props.openOn          "hover" opens on hover and keyboard focus and closes on a mouse press of
 *                                                 the target, "click" opens on click. Default: "click" if `open` is set
 *                                                 on the first render, else "hover". Fixed at mount: changing it later
 *                                                 swaps the primitive and remounts the target.
 * @param {string?}          props.placement       Tippy-style placement, e.g. "top", "bottom-start". "auto" is "top".
 * @param {number|number[]?} props.delay           Hover delay in ms before opening and before closing; `[open, close]`
 *                                                 sets them apart. Closing waits at least 100ms.
 * @param {number?}          props.skidding        Shift along the aligned edge in px, for "-start"/"-end" placements.
 * @param {number?}          props.distance        Gap between target and box in px.
 * @param {number|string?}   props.maxWidth        Box max width. Numbers are px. Capped at the viewport width less 10px.
 * @param {ReactNode?}       props.content         Popover body used instead of the `<Popover.Content>` child.
 * @param {string?}          props.className       Class name of the popover box.
 * @param {ReactNode}        props.children        Target, plus a `<Popover.Content>`.
 * @param {Function?}        props.onOpenChange    `(open: boolean) => void`. Called on hover, click, Escape and so on.
 * @param {Function?}        props.onClickOutside  Called on a press outside the open box and its target. A controlled
 *                                                 popover (`open` set) with no `onOpenChange` also calls it on Escape.
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
    const isPressClosedRef = useRef(false);
    const [isLocalOpen, setIsLocalOpen] = useState(false);

    /**
     * Without `openOn`, a popover controlled from its first render gets the click primitive: Tippy ignored triggers once
     * `visible` was set, and HoverCard takes its content out of the tab order. Read once, so a later `open` change
     * never swaps the primitive and remounts the target.
     */
    const [isControlledAtMount] = useState(open !== undefined);
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
            preventOpen(event);
            return;
        }

        isPressClosedRef.current = false;
    };

    const handleTargetBlur = (event) => {
        const overlayFocusTarget = event.relatedTarget?.closest(
            "[data-headlessui-portal], [data-radix-popper-content-wrapper]",
        );
        if (isOnTarget(event) && !overlayFocusTarget) {
            isPressClosedRef.current = false;
        }
    };

    /**
     * Only keyboard focus opens a hover popover. Headless UI focuses from script into a dialog and back to the opener,
     * and `:focus-visible` matches that only when the previous focus came from the keyboard.
     */
    const handleTargetFocus = (event) => {
        const isOpenable = !disabled && isOnTarget(event) && isFocusVisible(event.target);
        if (!isOpenable) {
            preventOpen(event);
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

        const isTargetPress = triggerRef.current?.contains(event.target);
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
        onClickOutside?.();
        handleOpenChange(false);
    };

    const hoverTriggerHandlers = {
        onBlur: handleTargetBlur,
        onFocus: handleTargetFocus,
        onPointerDown: handleTargetPointerDown,
        onPointerEnter: handleTargetPointerEnter,
    };
    const triggerHandlers = isClickOpened ? {} : hoverTriggerHandlers;
    const rootDelays = isClickOpened ? {} : { openDelay, closeDelay: Math.max(closeDelay, HOVER_CLOSE_GRACE) };
    const contentFocus = isClickOpened
        ? { onOpenAutoFocus: keepFocus, onCloseAutoFocus: keepFocus, onFocusOutside: handleFocusOutside }
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
                    data-backdrop-owner={backdropOwner}
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
