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
                "transition-colors leading-none flex items-center xl:justify-start w-full py-3 rounded",
                {
                    "bg-primary text-white hover:bg-primary-dark": isActive,
                    "hover:bg-gray-darker text-gray": !isActive,
                    "justify-start px-6 leading-p1": isSubMenuItem,
                    "justify-center xl:px-6": !isSubMenuItem,
                },
            )}
            {...rest}
        >
            {isSubMenuItem ? (
                <Dot className={clsx("mr-3", { "bg-white": isActive, "bg-gray": !isActive })} />
            ) : (
                <Icon className="w-5 h-5 xl:mr-3" />
            )}
            <span className={clsx("hidden px-1 xl:inline", { "!inline text-left": isSubMenuItem })}>{children}</span>
            {isSubMenuItem ? null : <ChevronRightIcon className="hidden ml-auto w-3 h-3 xl:inline" />}
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
