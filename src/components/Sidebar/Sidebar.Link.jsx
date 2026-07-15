/* eslint-disable no-undef */
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import cn from "../../helpers/classnames";
import { ChevronRightIcon } from "../../icons";
import { Dot } from "../Dot/Dot";

export const SidebarLink = ({
    isActive = false,
    hasSubmenu = false,
    icon: Icon,
    info,
    children,
    isSubMenuItem,
    align,
    classNames,
    ...rest
}) => {
    const showInfo = info ? true : hasSubmenu;
    const containerRef = useRef(null);
    const [showText, setShowText] = useState(true);
    const [showIcon, setShowIcon] = useState(true);

    useEffect(() => {
        const checkWidth = () => {
            if (containerRef.current) {
                setShowText(containerRef.current.offsetWidth >= 140);
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
            className={cn(
                "ui-sidebar-link",
                "flex w-full items-center rounded leading-none transition-colors xl:justify-start",
                !isSubMenuItem && "h-10",
                {
                    "bg-primary text-white hover:bg-primary-dark": isActive,
                    "text-gray hover:bg-gray-darker": !isActive,
                    "justify-start px-6 py-2": isSubMenuItem,
                    "justify-center py-3 px-6": !isSubMenuItem,
                },
                classNames?.button,
            )}
            {...rest}
        >
            {isSubMenuItem ? (
                <Dot className={cn("mr-3 shrink-0", { "bg-white": isActive, "bg-gray": !isActive })} />
            ) : (
                showIcon && (
                    <div className={cn(!showText && "flex w-full justify-center")}>
                        <Icon className={cn("h-5 w-5 shrink-0", showText && "mr-3")} />
                    </div>
                )
            )}

            {(showText || isSubMenuItem) && (
                <span className={cn("px-1", { "text-left": isSubMenuItem || align === "left" }, classNames?.text)}>
                    {children}
                </span>
            )}

            {!isSubMenuItem && showText && showInfo && (info ?? <ChevronRightIcon className="ml-auto h-3 w-3" />)}
        </button>
    );
};

SidebarLink.displayName = "Sidebar.Link";

SidebarLink.propTypes = {
    align: PropTypes.oneOf(["center", "left", "right"]),
    isActive: PropTypes.bool,
    hasSubmenu: PropTypes.bool,
    icon: PropTypes.func,
    children: PropTypes.node.isRequired,
    isSubMenuItem: PropTypes.bool,
};

export const SidebarSeparator = ({ className }) => {
    return <hr className={cn("mx-3 my-4 border-gray-lighter/20", className)} />;
};

SidebarSeparator.displayName = "Sidebar.Separator";

SidebarSeparator.propTypes = {
    className: PropTypes.string,
};
