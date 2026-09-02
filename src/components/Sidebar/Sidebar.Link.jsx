import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { ChevronRightIcon } from "../../icons";
import { Dot } from "../Dot/Dot";
import { useSidebar } from "./SidebarContext";

export const SidebarLink = ({
    isActive = false,
    icon: Icon,
    info,
    children,
    isSubMenuItem,
    align,
    classNames,
    className,
    ...rest
}) => {
    const { showIcons, showText } = useSidebar();

    // Sub-items render inside a Sidebar.Menu flyout, which is not width-bound: a Dot plus a label
    // is already the narrow presentation, so the variant does not apply to them.
    if (isSubMenuItem) {
        return (
            <button
                type="button"
                className={clsx(
                    "ui-sidebar-link",
                    "flex w-full items-center justify-start rounded px-6 py-2 leading-none transition-colors",
                    isActive ? "bg-primary text-white hover:bg-primary-dark" : "text-gray hover:bg-gray-darker",
                    className,
                )}
                {...rest}
            >
                <Dot className={clsx("mr-3 shrink-0", isActive ? "bg-white" : "bg-gray")} />

                <span className={clsx("px-1 text-left", classNames?.text)}>{children}</span>
            </button>
        );
    }

    return (
        <button
            type="button"
            className={clsx(
                "ui-sidebar-link",
                "flex h-10 w-full items-center rounded leading-none transition-colors",
                "py-3",
                showText ? "justify-start" : "justify-center px-2",
                // No icon: the label sits nearer the edge instead of holding open the icon's gutter.
                showText && (showIcons ? "px-6" : "px-3"),
                isActive ? "bg-primary text-white hover:bg-primary-dark" : "text-gray hover:bg-gray-darker",
                className,
            )}
            {...rest}
        >
            <div className={clsx("shrink-0", !showIcons && "hidden")}>
                <Icon className={clsx("h-5 w-5 shrink-0", showIcons && showText && "mr-3")} />
            </div>

            <span
                className={clsx(
                    // leading-5 overrides the button's leading-none: `truncate` hides overflow, so a
                    // line box only as tall as the cap height clips the descenders off g, y, p.
                    "min-w-0 truncate px-1 leading-5",
                    !showText && "hidden",
                    align === "left" && "text-left",
                    classNames?.text,
                )}
            >
                {children}
            </span>

            {info ?? <ChevronRightIcon className={clsx("ml-auto h-3 w-3 shrink-0", !showText && "hidden")} />}
        </button>
    );
};

SidebarLink.displayName = "Sidebar.Link";

SidebarLink.propTypes = {
    align: PropTypes.oneOf(["center", "left", "right"]),
    isActive: PropTypes.bool,
    icon: PropTypes.func,
    // A consumer-supplied trailing node. Rendered in every variant, unlike the default chevron:
    // it carries opt-in content such as a badge or a portal target that must survive the rail.
    info: PropTypes.node,
    children: PropTypes.node.isRequired,
    isSubMenuItem: PropTypes.bool,
    className: PropTypes.string,
    classNames: PropTypes.shape({ text: PropTypes.string }),
};

export const SidebarSeparator = ({ className }) => {
    return <hr className={clsx("mx-3 my-4 border-gray-lighter/20", className)} />;
};

SidebarSeparator.displayName = "Sidebar.Separator";

SidebarSeparator.propTypes = {
    className: PropTypes.string,
};
