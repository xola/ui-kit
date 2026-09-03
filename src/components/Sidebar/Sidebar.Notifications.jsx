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

    // A positive count is the only state worth a bubble: negative means no permission to see the
    // badge rather than zero notices, and absent means nothing to report.
    const hasNoticeCount = rightDrawer?.count > 0;

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
                            onClick={() => onDrawerStateChange?.("left")}
                        >
                            <AnnounceIcon className={clsx(isCollapsed && "hidden")} />
                            {leftDrawer.count}
                        </Counter>
                    </div>
                )}

                {rightDrawer && (
                    <div className={clsx("cursor-pointer text-center", !hasNoticeCount && "hidden")}>
                        <Counter
                            className="text-sm"
                            style={counterSize(isCollapsed)}
                            onClick={() => onDrawerStateChange?.("right")}
                        >
                            <BellIcon className={clsx(isCollapsed && "hidden")} />
                            {rightDrawer.count}
                        </Counter>
                    </div>
                )}
            </div>

            {leftDrawer && (
                <Drawer
                    isOpen={isLeftDrawerOpen}
                    sideIndent={width}
                    position="left"
                    size="xl"
                    title={leftDrawer.title}
                    content={leftDrawer.content}
                    onClose={(event) => !!event && onDrawerStateChange?.("left")}
                />
            )}

            {rightDrawer && (
                <Drawer
                    isOpen={isRightDrawerOpen}
                    sideIndent={width}
                    position="left"
                    size="xl"
                    title={rightDrawer.title}
                    content={rightDrawer.content}
                    onClose={(event) => !!event && onDrawerStateChange?.("right")}
                />
            )}
        </>
    );
};

SidebarNotifications.displayName = "Sidebar.Notifications";

const drawerSection = {
    count: PropTypes.number,
    content: PropTypes.node,
    title: PropTypes.string,
    onClose: PropTypes.func,
};

const noticesShape = PropTypes.shape(drawerSection);

// `hide` is announcements-only, matching `index.d.ts`. The notices badge derives its visibility
// from its own count, so accepting a flag there would advertise an override the render ignores.
const announcementsShape = PropTypes.shape({ ...drawerSection, hide: PropTypes.bool });

SidebarNotifications.propTypes = {
    notifications: PropTypes.shape({ announcements: announcementsShape, notices: noticesShape }),
    isCollapsed: PropTypes.bool,
    width: PropTypes.number.isRequired,
    isLeftDrawerOpen: PropTypes.bool,
    isRightDrawerOpen: PropTypes.bool,
    // Optional: Sidebar forwards its own optional `handleDrawerStateChange` prop here, so a
    // consumer can render notification badges without wiring up drawer toggling.
    onDrawerStateChange: PropTypes.func,
};
