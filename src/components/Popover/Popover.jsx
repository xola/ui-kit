import * as RadixHoverCard from "@radix-ui/react-hover-card";
import * as RadixPopover from "@radix-ui/react-popover";
import PropTypes from "prop-types";
import React, { Children, useRef, useState } from "react";
import { getChildrenByType } from "../../helpers/children";
import cn from "../../helpers/classnames";
import { toSideAlign } from "../../helpers/placement";
import { warnRemovedProps } from "../../helpers/warnRemovedProps";
import styles from "./Popover.module.css";
import scrollFix from "./PopoverScroll.module.css";

const NO_REPLACEMENT = "delete it, there is no replacement";
const USE_ON_OPEN_CHANGE = "use 'onOpenChange'";

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

/** Radix adds the arrow height to `sideOffset`; Tippy's `distance` measured to the box edge, so subtract it. */
const ARROW_HEIGHT = 8;

/**
 * Tippy kept an interactive popover open while the pointer crossed the gap to it. HoverCard only has its close delay
 * for that, so even a zero `delay` leaves this long to reach the content.
 */
const HOVER_CLOSE_GRACE = 100;

/**
 * Radix skips its trigger handler for a default-prevented event, so a disabled hover popover stops pointerenter and
 * focus before HoverCard schedules an open.
 */
const preventOpen = (event) => event.preventDefault();

/** Tippy never moved focus, and a popover opened while the user types elsewhere must not take it. */
const keepFocus = (event) => event.preventDefault();

/** Tippy capped its root to the viewport on top of the box's `maxWidth`, and Radix sizes its wrapper to the box. */
const VIEWPORT_MAX_WIDTH = "calc(100vw - 10px)";

/** Keywords such as "none" are invalid inside `min()`, and under Tippy only the viewport cap limited them. */
const getMaxWidth = (maxWidth) => {
    const length = typeof maxWidth === "number" ? `${maxWidth}px` : String(maxWidth);
    const isLength = /^\d/.test(length);

    return isLength ? `min(${length}, ${VIEWPORT_MAX_WIDTH})` : VIEWPORT_MAX_WIDTH;
};

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
 * @param {string?}          props.openOn          "hover" opens on hover and focus, "click" on click. Default: "click" if
 *                                                 `open` is set on the first render, else "hover".
 * @param {string?}          props.placement       Tippy-style placement, e.g. "top", "bottom-start". "auto" is "top".
 * @param {number|number[]?} props.delay           Hover delay in ms before opening and before closing; `[open, close]`
 *                                                 sets them apart. Closing waits at least 100ms.
 * @param {number?}          props.skidding        Shift along the aligned edge in px, for "-start"/"-end" placements.
 * @param {number?}          props.distance        Gap between target and box in px.
 * @param {number|string?}   props.maxWidth        Box max width. Numbers are px.
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
    const [isLocalOpen, setIsLocalOpen] = useState(false);

    /**
     * Without `openOn`, a popover controlled from its first render gets the click primitive: Tippy ignored triggers once
     * `visible` was set, and HoverCard takes every field in its content out of the tab order. Read once, so `open`
     * changing later never swaps the primitive and remounts the target.
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
     * state would reopen a popover re-enabled after the pointer left.
     */
    const isOpen = !disabled && (open ?? isLocalOpen);
    if (disabled && isLocalOpen) {
        setIsLocalOpen(false);
    }

    const handleOpenChange = (nextOpen) => {
        if (disabled) {
            return;
        }

        setIsLocalOpen(nextOpen);
        onOpenChange?.(nextOpen);
    };

    /**
     * The content, and Radix's outside-press and Escape listeners with it, stay mounted through the fade-out. A closed
     * popover ignores them, or a second press would reach a toggle-style `onClickOutside` and reopen it.
     *
     * A press on the target is left to the target. Radix Popover toggles on it, and HoverCard would dismiss, then reopen
     * on the focus the same press gives the target.
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
     * `onOpenChange` would then stay open, and `onClickOutside` is the only close request its consumer handles. Only
     * while open, for the same fade-out reason as presses.
     */
    const handleEscapeKeyDown = () => {
        const isCloseOnlyThroughClickOutside = isOpen && open !== undefined && !onOpenChange;
        if (isCloseOnlyThroughClickOutside) {
            onClickOutside?.();
        }
    };

    const isHoverBlocked = disabled && !isClickOpened;
    const triggerGuards = isHoverBlocked ? { onFocus: preventOpen, onPointerEnter: preventOpen } : {};
    const rootDelays = isClickOpened ? {} : { openDelay, closeDelay: Math.max(closeDelay, HOVER_CLOSE_GRACE) };
    const contentFocus = isClickOpened ? { onOpenAutoFocus: keepFocus, onCloseAutoFocus: keepFocus } : {};

    return (
        <Primitive.Root open={isOpen} onOpenChange={handleOpenChange} {...rootDelays}>
            <Primitive.Trigger asChild ref={triggerRef} {...triggerGuards}>
                <span>{target}</span>
            </Primitive.Trigger>
            <Primitive.Portal>
                <Primitive.Content
                    side={side}
                    align={align}
                    sideOffset={distance - ARROW_HEIGHT}
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
                    onEscapeKeyDown={handleEscapeKeyDown}
                    onPointerDownOutside={handlePointerDownOutside}
                    {...contentFocus}
                >
                    {popoverContent}
                    <Primitive.Arrow asChild width={16} height={ARROW_HEIGHT}>
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
