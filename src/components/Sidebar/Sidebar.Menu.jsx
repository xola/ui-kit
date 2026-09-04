import Tippy from "@tippyjs/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Sidebar.Menu.module.css";

const appendTo = typeof window === "undefined" ? undefined : window.document.body;

// The menu is far taller than its trigger, so reaching an item means cutting diagonally across a
// corner that belongs to neither element. Tippy's 2px default border hides the menu there.
const INTERACTIVE_BORDER = 24;
const INTERACTIVE_DEBOUNCE = 75;

// Show waits out a transit: reaching an item can cross a neighbouring link, which would
// otherwise steal the menu. Hide forgives an overshoot.
const DELAY = [150, 100];

export const SidebarMenu = ({ children, content, ...rest }) => {
    return (
        <Tippy
            interactive
            arrow={false}
            trigger="mouseenter" // Required otherwise menu will be truncated by the sidebar.
            hideOnClick="toggle"
            appendTo={appendTo}
            placement="right"
            offset={[0, 4]}
            interactiveBorder={INTERACTIVE_BORDER}
            interactiveDebounce={INTERACTIVE_DEBOUNCE}
            delay={DELAY}
            content={content}
            className={clsx(
                "ui-sidebar-menu",
                styles.main,
                "!rounded-none bg-black bg-opacity-90 p-2 backdrop-blur-sm backdrop-filter",
            )}
            {...rest}
        >
            <span className="block">{children}</span>
        </Tippy>
    );
};

SidebarMenu.displayName = "Sidebar.Menu";

SidebarMenu.propTypes = {
    children: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
};
