import React, { type ComponentType, useEffect, useRef, useState } from "react";
import cn from "../../helpers/classnames";
import { ChevronRightIcon } from "../../icons";
import { Dot } from "../Dot/Dot";

type SidebarLinkAlign = "center" | "left" | "right";

export interface SidebarLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive?: boolean;
    icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
    isSubMenuItem?: boolean;
    align?: SidebarLinkAlign;
    children: React.ReactNode;
    classNames?: {
        text?: string;
    };
}

export const SidebarLink = ({
    isActive = false,
    icon: Icon,
    isSubMenuItem,
    align,
    children,
    classNames,
    ...rest
}: SidebarLinkProps) => {
    const containerRef = useRef<HTMLButtonElement>(null);
    const [showText, setShowText] = useState(true);
    const [showIcon, setShowIcon] = useState(true);

    useEffect(() => {
        const checkWidth = () => {
            if (containerRef.current) {
                setShowText(containerRef.current.offsetWidth >= 140);
                setShowIcon(containerRef.current.offsetWidth >= 140 || containerRef.current.offsetWidth < 100);
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
                !isSubMenuItem && "h-11",
                {
                    "bg-primary text-white hover:bg-primary-dark": isActive,
                    "text-gray hover:bg-gray-darker": !isActive,
                    "justify-start px-6 py-2": isSubMenuItem,
                    "justify-center px-6 py-3": !isSubMenuItem,
                },
            )}
            {...rest}
        >
            {isSubMenuItem ? (
                <Dot className={cn("mr-3 shrink-0", { "bg-white": isActive, "bg-gray": !isActive })} />
            ) : (
                showIcon &&
                Icon && (
                    <div className={cn(!showText && "flex w-full justify-center")}>
                        <Icon className={cn("h-5 w-5 shrink-0", showText && "mr-3")} />
                    </div>
                )
            )}

            {(showText || isSubMenuItem) && (
                <span className={cn("px-1", { "text-left": isSubMenuItem ?? align === "left" }, classNames?.text)}>
                    {children}
                </span>
            )}

            {!isSubMenuItem && showText && <ChevronRightIcon className="ml-auto h-3 w-3" />}
        </button>
    );
};

SidebarLink.displayName = "Sidebar.Link";

export interface SidebarSeparatorProps {
    className?: string;
}

export const SidebarSeparator = ({ className }: SidebarSeparatorProps) => {
    return <hr className={cn("mx-3 my-4 border-gray-lighter/20", className)} />;
};

SidebarSeparator.displayName = "Sidebar.Separator";
