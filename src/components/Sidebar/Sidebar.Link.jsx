import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { ChevronRightIcon } from "../../icons/ChevronRightIcon";
import { Dot } from "../..";

export const SidebarLink = ({ isActive = false, icon: Icon, children, isSubMenuItem, ...rest }) => {
    return (
        <button
            type="button"
            className={clsx(
                "ui-sidebar-link",
                "flex w-full items-center rounded leading-none transition-colors xl:justify-start",
                {
                    "bg-primary text-white hover:bg-primary-dark": isActive,
                    "text-gray hover:bg-gray-darker": !isActive,
                    "justify-start px-6 py-2": isSubMenuItem,
                    "justify-center py-3 xl:px-6": !isSubMenuItem,
                },
            )}
            {...rest}
        >
            {isSubMenuItem ? (
                <Dot className={clsx("mr-3", { "bg-white": isActive, "bg-gray": !isActive })} />
            ) : (
                <Icon className="h-5 w-5 xl:mr-3" />
            )}
            <span className={clsx("hidden px-1 xl:inline", { "!inline text-left": isSubMenuItem })}>{children}</span>
            {isSubMenuItem ? null : <ChevronRightIcon className="ml-auto hidden h-3 w-3 xl:inline" />}
        </button>
    );
};

SidebarLink.displayName = "Sidebar.Link";

SidebarLink.propTypes = {
    isActive: PropTypes.bool,
    icon: PropTypes.func,
    children: PropTypes.node.isRequired,
    isSubMenuItem: PropTypes.bool,
};

export const SidebarSeparator = ({ className }) => {
    return <hr className={clsx("mx-3 my-4 border-gray-lighter/20", className)} />;
};

SidebarSeparator.displayName = "Sidebar.Separator";

SidebarSeparator.propTypes = {
    className: PropTypes.string,
};
