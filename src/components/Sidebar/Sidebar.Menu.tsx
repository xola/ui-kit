import Tippy from "@tippyjs/react";
import clsx from "clsx";
import React from "react";
import styles from "./Sidebar.Menu.module.css";

// eslint-disable-next-line no-undef
const appendTo = typeof window === "undefined" ? undefined : window.document.body;

export interface SidebarMenuProps {
    children: React.ReactNode;
    content: React.ReactNode;
    [key: string]: any;
}

export const SidebarMenu = ({ children, content, ...rest }: SidebarMenuProps) => {
    return (
        <Tippy
            interactive
            trigger="mouseenter" // Required otherwise menu will be truncated by the sidebar.
            hideOnClick="toggle"
            appendTo={appendTo}
            placement="right"
            offset={[0, 4]}
            arrow={false}
            className={clsx(
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
