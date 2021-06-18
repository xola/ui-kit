import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { ChevronRightIcon } from "../../icons/ChevronRightIcon";
import { Avatar } from "../Avatar";

export const SidebarAccount = ({
    name,
    description,
    image,
    icon = <ChevronRightIcon />,
    isResponsive = false,
    ...rest
}) => {
    const accountImage = image ?? <Avatar size="tiny" name={name} />;

    return (
        <button
            type="button"
            className={clsx(
                "flex justify-center items-center py-3 w-full rounded cursor-pointer hover:bg-gray-darker xl:justify-start",
                isResponsive ? "xl:px-4" : "px-4",
            )}
            {...rest}
        >
            <div className="flex-shrink-0">{accountImage}</div>

            <div className={clsx("ml-2 text-left", isResponsive && "hidden xl:inline")}>
                <div className="truncate">{name}</div>
                {description ? <div className="text-gray-dark text-sm truncate">{description}</div> : null}
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
};
