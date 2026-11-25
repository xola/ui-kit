import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { useMemoizedFn } from "ahooks";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import cn from "../../helpers/classnames";
import { warnRemovedProps } from "../../helpers/warnRemovedProps";

const USE_ON_OPEN_CHANGE = "use 'onOpenChange'";

/** Tippy props Sidebar.Menu dropped in 3.8, mapped to the replacement text `warnRemovedProps` prints. */
export const SIDEBAR_MENU_REMOVED_PROPS = {
    visible: "use 'open'",
    onShow: USE_ON_OPEN_CHANGE,
    onHide: USE_ON_OPEN_CHANGE,
    onMount: USE_ON_OPEN_CHANGE,
    onHidden: USE_ON_OPEN_CHANGE,
    onDestroy: USE_ON_OPEN_CHANGE,
};

/**
 * Show waits out a transit: reaching an item can cross a neighbouring link, which would otherwise steal the menu. Hide
 * waits out the same transit from the other side: a tall menu's lower items are reached diagonally across that
 * neighbour, and HoverCard's only grace between leaving the link and entering the menu is this close delay.
 */
const DELAY = [150, 300];

const SIDE_OFFSET = 4;

/**
 * Close requests of every open menu. Each menu is an independent HoverCard, so nothing else stops two being open at
 * once: the one opening asks the rest to close.
 */
const openMenus = new Set();

const closeMenus = (except) => {
    openMenus.forEach((close) => {
        if (close !== except) {
            close();
        }
    });
};

/** Sidebar calls this when a resize starts, so no menu is left over the rail edge being dragged. */
export const hideAllSidebarMenus = () => closeMenus();

/**
 * Flyout beside a sidebar item. Opens on hover, focus, or a tap on the item.
 *
 * @param {boolean?}         props.open          Controls visibility. Leave undefined to open on hover, focus and tap.
 * @param {ReactNode}        props.content       Menu body.
 * @param {number|number[]?} props.delay         Delay in ms before opening and before closing; `[open, close]` sets
 *                                               them apart. Default `[150, 300]`. The close delay is also the time the
 *                                               pointer has to get from the item to the menu.
 * @param {ReactNode}        props.children      Trigger, wrapped in a block `<span>`.
 * @param {Function?}        props.onOpenChange  `(open: boolean) => void`. Called on hover, focus, tap, Escape, a press
 *                                               outside, another menu opening, and a sidebar resize starting.
 */
export const SidebarMenu = ({ open, content, delay = DELAY, children, onOpenChange, ...removedProps }) => {
    warnRemovedProps("Sidebar.Menu", removedProps, SIDEBAR_MENU_REMOVED_PROPS);

    const triggerRef = useRef();
    const pointerTypeRef = useRef();
    const [isLocalOpen, setIsLocalOpen] = useState(false);
    const [openDelay = 0, closeDelay = 0] = Array.isArray(delay) ? delay : [delay, delay];

    /**
     * Root stays controlled for its whole life, and local state follows `open` while it is set, so a menu held closed
     * and then released stays closed until the next hover instead of reopening from stale state.
     */
    const isOpen = open ?? isLocalOpen;
    if (open !== undefined && open !== isLocalOpen) {
        setIsLocalOpen(open);
    }

    const handleOpenChange = (nextOpen) => {
        setIsLocalOpen(nextOpen);
        onOpenChange?.(nextOpen);
    };

    const requestClose = useMemoizedFn(() => handleOpenChange(false));

    useEffect(() => {
        if (isOpen) {
            closeMenus(requestClose);
            openMenus.add(requestClose);
        }

        return () => openMenus.delete(requestClose);
    }, [isOpen, requestClose]);

    const handlePointerDown = (event) => {
        pointerTypeRef.current = event.pointerType;
    };

    /** A press the browser cancels, e.g. a scroll starting on the item, gets no click to clear its pointer type. */
    const handlePointerCancel = () => {
        pointerTypeRef.current = undefined;
    };

    /**
     * HoverCard ignores touch pointers and iOS Safari does not focus a tapped button, so on a touchscreen neither of its
     * open paths runs. A tap opens the menu instead, and a tap outside closes it. Mouse clicks are left alone: hover
     * already opened the menu.
     */
    const handleClick = () => {
        const isTapWhileClosed = pointerTypeRef.current === "touch" && !isOpen;
        pointerTypeRef.current = undefined;

        if (isTapWhileClosed) {
            handleOpenChange(true);
        }
    };

    /** A press on the trigger counts as outside to Radix, which would close the menu the same press keeps open. */
    const handlePointerDownOutside = (event) => {
        const isTriggerPress = triggerRef.current?.contains(event.target);
        if (isTriggerPress) {
            event.preventDefault();
        }
    };

    return (
        <RadixHoverCard.Root
            open={isOpen}
            openDelay={openDelay}
            closeDelay={closeDelay}
            onOpenChange={handleOpenChange}
        >
            <RadixHoverCard.Trigger
                asChild
                ref={triggerRef}
                onPointerDown={handlePointerDown}
                onPointerCancel={handlePointerCancel}
                onClick={handleClick}
            >
                <span className="block">{children}</span>
            </RadixHoverCard.Trigger>
            <RadixHoverCard.Portal>
                <RadixHoverCard.Content
                    side="right"
                    sideOffset={SIDE_OFFSET}
                    className={cn(
                        "ui-sidebar-menu",
                        // Stacking, width cap and type size are the 3.7 values consumer layouts were built around
                        "z-[9999] max-w-[350px] text-base leading-[1.4] text-white outline-none",
                        "bg-black bg-opacity-90 p-2 backdrop-blur-sm backdrop-filter",
                        // No fade-out: a fading menu would still be on screen beside the one replacing it
                        "data-[state=open]:animate-fade-in",
                    )}
                    onPointerDownOutside={handlePointerDownOutside}
                >
                    {content}
                </RadixHoverCard.Content>
            </RadixHoverCard.Portal>
        </RadixHoverCard.Root>
    );
};

SidebarMenu.displayName = "Sidebar.Menu";

SidebarMenu.propTypes = {
    open: PropTypes.bool,
    content: PropTypes.node.isRequired,
    delay: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    children: PropTypes.node.isRequired,
    onOpenChange: PropTypes.func,
};
