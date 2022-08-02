import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { XolaLogoCircle } from "../../images/XolaLogoCircle";
import { Counter } from "../Counter";
import { SidebarAccount } from "./Sidebar.Account";
import { SidebarButton } from "./Sidebar.Button";
import { SidebarFooter } from "./Sidebar.Footer";
import { SidebarLink } from "./Sidebar.Link";
import { SidebarMenu } from "./Sidebar.Menu";
import { SidebarHeading } from "./Sidebar.Heading";
import { BellIcon } from "../../icons/BellIcon";
import { AnnounceIcon } from "../../icons/AnnounceIcon";

export const Sidebar = ({ children, className, footer, components = {}, isFixed = true, onLogoClick }) => {
    const style = useMemo(
        () => ({
            background: "linear-gradient(138.65deg, #583DFF 19.59%, #F849C7 62.96%, #FFC03D 97.07%)",
        }),
        [],
    );

    return (
        <div
            className={clsx(
                "ui-sidebar",
                isFixed ? "fixed" : "relative",
                "flex h-full w-16 flex-col overflow-y-auto bg-black py-2 px-1 text-white md:w-24 xl:w-50",
                className,
            )}
        >
            <div className="flex p-2 sm:justify-center xl:justify-between">
                <div className={clsx("cursor-pointer sm:text-center", components.Left.count ? null : "hidden")}>
                    <Counter className="mr-2 text-sm" onClick={components.Left.clickHandler} style={style}>
                        <AnnounceIcon className="mr-1 sm:hidden xl:block" />
                        {components.Left.count}
                    </Counter>
                </div>

                <div className={clsx("cursor-pointer sm:text-center", components.Right.count ? null : "hidden")}>
                    <Counter className="text-sm" onClick={components.Right.clickHandler}>
                        <BellIcon className="sm:hidden xl:block" />
                        {components.Right.count}
                    </Counter>
                </div>
            </div>

            {components.Left.content ? <components.Left.content /> : null}
            {components.Right.content ? <components.Right.content /> : null}

            <div className="mt-4 mb-10 text-center">
                <XolaLogoCircle
                    className={clsx(
                        "inline-block h-12 w-12 xl:h-24 xl:w-24",
                        onLogoClick && "cursor-pointer transition-opacity hover:opacity-80",
                    )}
                    onClick={onLogoClick}
                />
            </div>

            <div className="flex-grow space-y-2">{children}</div>
            {footer}
        </div>
    );
};

Sidebar.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    footer: PropTypes.element.isRequired,
    isFixed: PropTypes.bool,
    onLogoClick: PropTypes.func.isRequired,
    components: PropTypes.shape({
        Left: PropTypes.shape({
            count: PropTypes.number,
            content: PropTypes.oneOfType([PropTypes.node]),
            clickHandler: PropTypes.func,
        }),
        Right: PropTypes.shape({
            count: PropTypes.number,
            content: PropTypes.oneOfType([PropTypes.node]),
            clickHandler: PropTypes.func,
        }),
    }),
};

Sidebar.Account = SidebarAccount;
Sidebar.Button = SidebarButton;
Sidebar.Footer = SidebarFooter;
Sidebar.Link = SidebarLink;
Sidebar.Menu = SidebarMenu;
Sidebar.Heading = SidebarHeading;
