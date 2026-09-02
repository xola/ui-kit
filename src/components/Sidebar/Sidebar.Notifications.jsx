import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { AnnounceIcon, BellIcon } from "../../icons";
import { Counter } from "../Counter";
import { Drawer } from "../Drawer";

const LeftDrawerCountStyle = {
    // From Figma
    background: "linear-gradient(138.65deg, #583DFF 19.59%, #F849C7 62.96%, #FFC03D 97.07%)",
};

const counterSize = (isCollapsed) => {
    const size = isCollapsed ? "30px" : "48px";

    return {
        minWidth: size,
        width: size,
        minHeight: "20px",
        height: "20px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
    };
};

export const SidebarNotifications = ({
    notifications,
    isCollapsed,
    width,
    isLeftDrawerOpen,
    isRightDrawerOpen,
    onDrawerStateChange,
}) => {
    const { announcements: leftDrawer, notices: rightDrawer } = notifications ?? {};

    if (!leftDrawer && !rightDrawer) {
        return null;
    }

    // A negative count means the consumer has no permission to see the badge, not zero notices.
    const hideRightDrawer = rightDrawer?.count <= 0 || !rightDrawer;

    return (
        <>
            <div
                className={clsx(
                    "sticky top-0 z-50 flex w-full gap-2 bg-black p-2",
                    isCollapsed ? "flex-col justify-center" : "justify-between",
                )}
            >
                {leftDrawer && (
                    <div className={clsx("cursor-pointer text-center", leftDrawer.hide && "hidden")}>
                        <Counter
                            style={{ ...LeftDrawerCountStyle, ...counterSize(isCollapsed) }}
                            onClick={() => onDrawerStateChange("left")}
                        >
                            <AnnounceIcon className={clsx(isCollapsed && "hidden")} />
                            {leftDrawer.count}
                        </Counter>
                    </div>
                )}

                {rightDrawer && (
                    <div className={clsx("cursor-pointer text-center", hideRightDrawer && "hidden")}>
                        <Counter
                            className="text-sm"
                            style={counterSize(isCollapsed)}
                            onClick={() => onDrawerStateChange("right")}
                        >
                            <BellIcon className={clsx(isCollapsed && "hidden")} />
                            {rightDrawer.count}
                        </Counter>
                    </div>
                )}
            </div>

            {leftDrawer && (
                <Drawer
                    classNames={{ dialogContent: `left-[${width}px]` }}
                    sideIndent={width}
                    position="left"
                    size="xl"
                    title={leftDrawer.title}
                    content={leftDrawer.content}
                    isOpen={isLeftDrawerOpen}
                    onClose={(event) => !!event && onDrawerStateChange("left")}
                />
            )}

            {rightDrawer && (
                <Drawer
                    classNames={{ dialogContent: `left-[${width}px]` }}
                    sideIndent={width}
                    position="left"
                    size="xl"
                    title={rightDrawer.title}
                    content={rightDrawer.content}
                    isOpen={isRightDrawerOpen}
                    onClose={(event) => !!event && onDrawerStateChange("right")}
                />
            )}
        </>
    );
};

SidebarNotifications.displayName = "Sidebar.Notifications";

const drawerShape = PropTypes.shape({
    count: PropTypes.number,
    content: PropTypes.node,
    title: PropTypes.string,
    hide: PropTypes.bool,
    onClose: PropTypes.func,
});

SidebarNotifications.propTypes = {
    notifications: PropTypes.shape({ announcements: drawerShape, notices: drawerShape }),
    isCollapsed: PropTypes.bool,
    width: PropTypes.number.isRequired,
    isLeftDrawerOpen: PropTypes.bool,
    isRightDrawerOpen: PropTypes.bool,
    onDrawerStateChange: PropTypes.func,
};
