import Tippy from "@tippyjs/react";
import React, { createContext, useContext } from "react";
import cn from "../../helpers/classnames";
import styles from "./Sidebar.Menu.module.css";

const appendTo = typeof window === "undefined" ? undefined : window.document.body;

const SidebarMenuContext = createContext<{ hasSubmenu: boolean }>({ hasSubmenu: false });

export const useSidebarMenu = () => useContext(SidebarMenuContext);

export interface SidebarMenuProps {
    [key: string]: any;
    content: React.ReactNode;
    children: React.ReactNode;
}

export const SidebarMenu = ({ content, children, ...rest }: SidebarMenuProps) => {
    return (
        <SidebarMenuContext.Provider value={{ hasSubmenu: true }}>
            <Tippy
                interactive
                trigger="mouseenter" // Required otherwise menu will be truncated by the sidebar.
                hideOnClick="toggle"
                appendTo={appendTo}
                placement="right"
                offset={[0, 4]}
                arrow={false}
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
        </SidebarMenuContext.Provider>
    );
};

SidebarMenu.displayName = "Sidebar.Menu";
