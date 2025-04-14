/* eslint-disable no-undef */
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { ChevronRightIcon } from "../../icons";
import { Dot } from "../Dot/Dot";

export const SidebarLink = ({ isActive = false, icon: Icon, children, isSubMenuItem, align, classNames, ...rest }) => {
    const containerRef = useRef(null);
    const [showText, setShowText] = useState(true);
    const [showIcon, setShowIcon] = useState(true);

    useEffect(() => {
        const checkWidth = () => {
            if (containerRef.current) {
                setShowText(containerRef.current.offsetWidth > 140);
                setShowIcon(containerRef.current.offsetWidth > 174 || containerRef.current.offsetWidth < 140);
            }
        };

        // Initial check
        checkWidth();

        // Add resize observer for dynamic changes
        const resizeObserver = new ResizeObserver(checkWidth);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <button
            ref={containerRef}
            type="button"
            className={clsx(
                "ui-sidebar-link",
                "flex w-full items-center rounded leading-none transition-colors xl:justify-start",
                !isSubMenuItem && "h-10",
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
                <Dot className={clsx("mr-3 shrink-0", { "bg-white": isActive, "bg-gray": !isActive })} />
            ) : (
                showIcon && (
                    <div className={clsx(!showText && "flex w-full justify-center")}>
                        <Icon className={clsx("h-5 w-5 shrink-0", showText && "mr-3")} />
                    </div>
                )
            )}

            {(showText || isSubMenuItem) && (
                <span className={clsx("px-1", { "text-left": isSubMenuItem || align === "left" }, classNames?.text)}>
                    {children}
                </span>
            )}

            {!isSubMenuItem && showText && <ChevronRightIcon className="ml-auto h-3 w-3" />}
        </button>
    );
};

SidebarLink.displayName = "Sidebar.Link";

SidebarLink.propTypes = {
    align: PropTypes.oneOf(["center", "left", "right"]),
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
