/* eslint-disable no-undef */
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { ChevronRightIcon } from "../../icons";
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
    const containerRef = useRef(null);
    const [showText, setShowText] = useState(!isResponsive);
    const [showIcon, setShowIcon] = useState(!isResponsive);
    const accountImage = image ?? <Avatar size="tiny" name={name} />;

    useEffect(() => {
        if (!isResponsive) {
            setShowText(true);
            setShowIcon(true);
            return;
        }

        const checkWidth = () => {
            if (containerRef.current) {
                setShowText(containerRef.current.offsetWidth > 135);
                setShowIcon(containerRef.current.offsetWidth > 175 || containerRef.current.offsetWidth < 135);
            }
        };

        // Initial check
        checkWidth();

        // Add resize observer for dynamic changes
        const resizeObserver = new ResizeObserver(checkWidth);
        const currentRef = containerRef.current;

        if (currentRef) {
            resizeObserver.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                resizeObserver.unobserve(currentRef);
            }
        };
    }, [isResponsive]);

    return (
        <button
            ref={containerRef}
            type="button"
            className={clsx(
                "ui-sidebar-account",
                "flex h-12 w-full cursor-pointer items-center justify-center rounded px-4 py-3 hover:bg-gray-darker",
                "xl:justify-start", // Full layout on xl screens
                className,
            )}
            {...rest}
        >
            {showIcon && <div className={clsx(isResponsive && "m-auto", "flex-shrink-0")}>{accountImage}</div>}

            {/* Text container - conditionally rendered */}
            {showText && (
                <div className="ml-2 min-w-0 text-left">
                    <div className="truncate text-base">{name}</div>
                    {description && <div className="truncate text-sm text-gray-dark">{description}</div>}
                </div>
            )}

            {/* Icon - only shown when text is visible */}
            {showText && <span className="ml-auto">{icon}</span>}
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
