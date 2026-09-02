import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { useSidebar } from "./SidebarContext";

export const SidebarButton = ({ icon: Icon, label, appearance = "plain", className, ...rest }) => {
    const { showIcons, showText } = useSidebar();
    const isSolid = appearance === "solid";

    return (
        <button
            type="button"
            className={clsx(
                "ui-sidebar-button flex min-w-0 cursor-pointer items-center rounded",
                isSolid
                    ? "mx-2 mb-4 bg-white py-1.5 text-base font-semibold text-gray-darker hover:bg-gray-lighter"
                    : "w-full py-2 hover:bg-gray-darker",
                showText && (isSolid ? "px-3" : "px-4"),
                !showText && "justify-center px-2",
                className,
            )}
            // Not `title`: consumers wrap sidebar items in Sidebar.Menu (tippy), and a native
            // title on the same node renders a second tooltip alongside it.
            aria-label={showText ? undefined : label}
            {...rest}
        >
            <div className={clsx("shrink-0", isSolid ? "p-0.5" : "p-1.5", !showIcons && "hidden")}>
                <Icon className={clsx("shrink-0", isSolid ? "h-5 w-5" : "h-4 w-4")} />
            </div>

            <span
                className={clsx(
                    "min-w-0 truncate",
                    !showText && "hidden",
                    showIcons && (isSolid ? "ml-3" : "ml-2"),
                    isSolid && "whitespace-nowrap",
                )}
            >
                {label}
            </span>
        </button>
    );
};

SidebarButton.displayName = "Sidebar.Button";

SidebarButton.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    // "solid" is the filled, card-like treatment a consumer uses to lift one action out of the
    // list, such as the seller app's Scan QR control. It carries a larger icon to match.
    appearance: PropTypes.oneOf(["plain", "solid"]),
    className: PropTypes.string,
};
