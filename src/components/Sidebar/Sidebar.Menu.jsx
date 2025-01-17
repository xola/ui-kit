import Tippy from "@tippyjs/react";
import PropTypes from "prop-types";
import React from "react";
import cn from "../../helpers/classnames";
import styles from "./Sidebar.Menu.module.css";

// eslint-disable-next-line no-undef
const appendTo = typeof window === "undefined" ? undefined : window.document.body;

export const SidebarMenu = ({ children, content, ...rest }) => {
    return (
        <Tippy
            interactive
            trigger="mouseenter" // Required otherwise menu will be truncated by the sidebar.
            hideOnClick="toggle"
            appendTo={appendTo}
            placement="right"
            offset={[0, 4]}
            arrow={false}
            // https://atomiks.github.io/tippyjs/v6/all-props/#interactivedebounce
            interactiveDebounce={50} // Alternatively try interactiveBorder
            className={cn(
                "ui-sidebar-menu",
                styles.main,
                "!rounded-none bg-black bg-opacity-90 p-2 backdrop-blur-sm backdrop-filter",
            )}
            content={content}
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
