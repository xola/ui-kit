import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { ChevronRightIcon } from "../../icons";
import { Avatar } from "../Avatar";
import { useSidebar } from "./SidebarContext";

export const SidebarAccount = ({
    name,
    description,
    image,
    icon = <ChevronRightIcon />,
    isResponsive,
    className,
    ...rest
}) => {
    const { showText } = useSidebar();
    const accountImage = image ?? <Avatar size="tiny" name={name} />;

    // `process` isn't declared here: consumers' bundlers (webpack, Vite) statically replace
    // process.env.NODE_ENV, the same pattern react/prop-types rely on for dev-only warnings.
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== "production" && isResponsive !== undefined) {
        console.warn(
            "UI Kit: Sidebar.Account no longer needs `isResponsive`; the sidebar's variant drives this. Remove the prop.",
        );
    }

    return (
        <button
            type="button"
            className={clsx(
                "ui-sidebar-account",
                "flex h-12 w-full cursor-pointer items-center rounded px-4 py-3 hover:bg-gray-darker",
                showText ? "justify-start" : "justify-center",
                className,
            )}
            {...rest}
        >
            <div className="shrink-0">{accountImage}</div>

            {showText && (
                <div className="ml-2 min-w-0 text-left">
                    <div className="truncate text-base">{name}</div>
                    {description && <div className="truncate text-sm text-gray-dark">{description}</div>}
                </div>
            )}

            {showText && <span className="ml-auto">{icon}</span>}
        </button>
    );
};

SidebarAccount.displayName = "Sidebar.Account";

SidebarAccount.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.node,
    icon: PropTypes.node,
    // Deprecated no-op, retained so existing consumers keep compiling. Warns in development.
    isResponsive: PropTypes.bool,
    className: PropTypes.string,
};
