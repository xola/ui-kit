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
    className,
    ...rest
}) => {
    const accountImage = image ?? <Avatar size="tiny" name={name} />;

    return (
        <button
            type="button"
            className={clsx(
                "ui-sidebar-account",
                "flex items-center justify-center xl:justify-start py-3 px-4 w-full rounded cursor-pointer hover:bg-gray-darker",
                className,
            )}
            {...rest}
        >
            <div className="flex-shrink-0">{accountImage}</div>

            {/* Adding `min-w-0` on the flex item prevents the overflow for wider text. */}
            <div className={clsx("ml-2 text-left min-w-0", isResponsive && "hidden xl:inline")}>
                <div className="text-base truncate">{name}</div>
                {description ? <div className="text-sm text-gray-dark truncate">{description}</div> : null}
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
