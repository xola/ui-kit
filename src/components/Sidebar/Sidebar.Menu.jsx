import Tippy from "@tippyjs/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Sidebar.Menu.module.css";

export const SidebarMenu = ({ children, content, ...rest }) => {
    return (
        <Tippy
            interactive
            trigger="click" // Required otherwise menu will be truncated by the sidebar.
            appendTo={document.body}
            placement="right"
            offset={[0, 8]}
            arrow={false}
            className={clsx(
                "ui-sidebar-menu",
                styles.main,
                "!rounded-none bg-black bg-opacity-90 backdrop-filter backdrop-blur-sm p-2 w-56",
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
