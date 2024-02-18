import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { ChevronRightIcon } from "../../icons/";
import { Avatar } from "../Avatar";

export const SidebarAccount = ({
    name,
    description,
    image,
    icon = <ChevronRightIcon />,
    isResponsive = false,
    className,
    ...rest
}) => {
    const accountImage = image ?? <Avatar size="tiny" name={name} />;

    return (
        <button
            type="button"
            className={clsx(
                "ui-sidebar-account",
                "flex w-full cursor-pointer items-center justify-center rounded px-4 py-3 hover:bg-gray-darker xl:justify-start",
                className,
            )}
            {...rest}
        >
            <div className="flex-shrink-0">{accountImage}</div>

            {/* Adding `min-w-0` on the flex item prevents the overflow for wider text. */}
            <div className={clsx("ml-2 min-w-0 text-left", isResponsive && "hidden xl:inline")}>
                <div className="truncate text-base">{name}</div>
                {description ? <div className="truncate text-sm text-gray-dark">{description}</div> : null}
            </div>

            <span className={clsx("ml-auto", isResponsive && "hidden xl:inline")}>{icon}</span>
        </button>
    );
};

SidebarAccount.displayName = "Sidebar.Account";

SidebarAccount.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.element,
    icon: PropTypes.element,
    isResponsive: PropTypes.bool,
    className: PropTypes.string,
};
