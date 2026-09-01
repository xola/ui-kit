import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { useSidebar } from "./SidebarContext";

export const SidebarButton = ({ icon: Icon, label, className, ...rest }) => {
    const { showIcons, showText } = useSidebar();

    return (
        <button
            type="button"
            className={clsx(
                "ui-sidebar-button flex w-full min-w-0 cursor-pointer items-center rounded py-2 hover:bg-gray-darker",
                showText ? "px-4" : "justify-center px-2",
                className,
            )}
            // Not `title`: consumers wrap sidebar items in Sidebar.Menu (tippy), and a native
            // title on the same node renders a second tooltip alongside it.
            aria-label={showText ? undefined : label}
            {...rest}
        >
            <div className={clsx("shrink-0 p-1.5", !showIcons && "hidden")}>
                <Icon className="h-4 w-4" />
            </div>

            <span className={clsx("min-w-0 truncate", !showText && "hidden", showIcons && "ml-2")}>{label}</span>
        </button>
    );
};

SidebarButton.displayName = "Sidebar.Button";

SidebarButton.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
};
