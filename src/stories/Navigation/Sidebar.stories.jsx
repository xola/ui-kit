import PropTypes from "prop-types";
import React, { useState } from "react";
import {
    AnnounceIcon,
    Button,
    CheckIcon,
    HelpCenterIcon,
    LogoutIcon,
    PolicyIcon,
    ScanQrCodeIcon,
    Sidebar,
    StarIcon,
    UserIcon,
    useSidebar,
} from "../..";

const SidebarStories = {
    title: "Navigation/Sidebar",
    component: Sidebar,
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=2725%3A91116&viewport=2302%2C256%2C0.11",
        },
    },
};

const SidebarFooter = () => {
    return (
        <>
            <Sidebar.Button appearance="solid" icon={ScanQrCodeIcon} label="Scan QR" />

            <Sidebar.Footer>
                <Sidebar.Menu
                    content={
                        <div className="space-y-3">
                            <div className="space-y-2">
                                <Sidebar.Account
                                    name="Twitter"
                                    description="San Francisco, CA"
                                    icon={<CheckIcon className="text-green" />}
                                />
                                <Sidebar.Account name="Slack" description="San Francisco, CA" />
                            </div>

                            <div className="space-y-2">
                                <Sidebar.Separator className="mx-0 my-0 mt-4" />
                                <Sidebar.Button icon={PolicyIcon} label="Privacy Policy" />

                                <Sidebar.Button icon={HelpCenterIcon} label="Help Center" />

                                <Sidebar.Separator className="mx-0" />
                                <Sidebar.Button icon={LogoutIcon} label="Logout" />
                            </div>
                        </div>
                    }
                >
                    <Sidebar.Account name="Xola Custom Seller" />
                </Sidebar.Menu>
            </Sidebar.Footer>
        </>
    );
};

const handleLogoClick = () => {
    window.location.reload();
};

export const Default = () => {
    return (
        <div className="h-screen">
            <Sidebar footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
                <Sidebar.Link isActive icon={UserIcon}>
                    Sellers
                </Sidebar.Link>

                <Sidebar.Link icon={StarIcon}>Favorites</Sidebar.Link>

                <Sidebar.Menu
                    content={
                        <div className="space-y-5 py-6">
                            <Sidebar.Heading icon={AnnounceIcon} label="Marketing" />
                            <div>
                                <Sidebar.Link isActive isSubMenuItem>
                                    Abandoned Booking Recovery
                                </Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>Conversion Tracking</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>Coupons</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>Partners</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>XolaBot</Sidebar.Link>
                                <Sidebar.Separator />
                                <Sidebar.Link isSubMenuItem>Global Settings</Sidebar.Link>
                            </div>
                        </div>
                    }
                >
                    <Sidebar.Link icon={AnnounceIcon}>Marketing</Sidebar.Link>
                </Sidebar.Menu>
            </Sidebar>
        </div>
    );
};

export const CustomLogo = () => {
    const Logo = () => <img src="https://c02.xola.com/images/xola-logo-header.png" className="bg-green" />;

    return (
        <div className="h-screen">
            Pass in any component for the "logo" property
            <Sidebar logo={<Logo />} footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
                <Sidebar.Link isActive icon={UserIcon}>
                    Sellers
                </Sidebar.Link>
                <Sidebar.Link icon={StarIcon}>Favorites</Sidebar.Link>
                <Sidebar.Link icon={AnnounceIcon}>Marketing</Sidebar.Link>
            </Sidebar>
        </div>
    );
};

export const SidebarWithNotifications = () => {
    const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
    const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

    const notifications = {
        announcements: {
            count: 1,
            content: <div>Some content</div>,
            title: "Announcements",
            onClose: () => console.log("Announcements closed"),
        },
        notices: {
            count: 32,
            content: <div>Some content</div>,
            title: "Notifications & Pending items",
            onClose: () => console.log("Notifications closed"),
        },
    };

    const handleDrawerStateChange = (drawer) => {
        if (drawer === "left") {
            if (isRightDrawerOpen) {
                setIsRightDrawerOpen(false);
                notifications.notices.onClose();
            } else if (isLeftDrawerOpen) {
                notifications.announcements.onClose();
            }

            setIsLeftDrawerOpen(!isLeftDrawerOpen);
        } else if (drawer === "right") {
            if (isLeftDrawerOpen) {
                setIsLeftDrawerOpen(false);
                notifications.announcements.onClose();
            } else if (isRightDrawerOpen) {
                notifications.notices.onClose();
            }

            setIsRightDrawerOpen(!isRightDrawerOpen);
        }
    };
    return (
        <div className="h-screen">
            <Sidebar
                footer={<SidebarFooter />}
                notifications={notifications}
                isLeftDrawerOpen={isLeftDrawerOpen}
                isRightDrawerOpen={isRightDrawerOpen}
                handleDrawerStateChange={handleDrawerStateChange}
                onLogoClick={handleLogoClick}
            >
                <Sidebar.Link isActive icon={UserIcon}>
                    Sellers
                </Sidebar.Link>

                <Sidebar.Link icon={StarIcon}>Favorites</Sidebar.Link>

                <Sidebar.Menu
                    content={
                        <div className="space-y-5 py-6">
                            <Sidebar.Heading icon={AnnounceIcon} label="Marketing" />
                            <div>
                                <Sidebar.Link isActive isSubMenuItem>
                                    Abandoned Booking Recovery
                                </Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>Conversion Tracking</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>Coupons</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>Partners</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>XolaBot</Sidebar.Link>
                            </div>
                        </div>
                    }
                >
                    <Sidebar.Link icon={AnnounceIcon}>Marketing</Sidebar.Link>
                </Sidebar.Menu>
            </Sidebar>
        </div>
    );
};

// Shared by every story below: a long-labelled Button standing in for the "Scan QR" control that
// overflowed at an intermediate width, plus a Link with a consumer-supplied `info` badge.
// Storybook renders these bare on a white page, so the instructions need to read as instructions
// and the controls need to read as controls. Without that a reviewer cannot tell an interactive
// story from a static one.
const StoryNote = ({ title, children }) => (
    <div className="mb-4 max-w-3xl rounded border border-gray-light bg-white p-3">
        <p className="mb-1 text-sm font-bold text-gray-darker">{title}</p>
        <p className="text-sm text-gray-dark">{children}</p>
    </div>
);

StoryNote.propTypes = { title: PropTypes.string.isRequired, children: PropTypes.node.isRequired };

const KitchenSink = () => (
    <>
        <Sidebar.Link isActive icon={UserIcon}>
            Sellers
        </Sidebar.Link>
        <Sidebar.Link icon={StarIcon}>Favorites</Sidebar.Link>
        <Sidebar.Link icon={AnnounceIcon} info={<span className="ml-auto text-xs text-gray">12</span>}>
            Marketing
        </Sidebar.Link>
    </>
);

const AtWidth = ({ width, ...props }) => (
    <div className="h-screen">
        <Sidebar
            // Not fixed: several stories place two or three of these side by side to make a band
            // boundary comparable at a glance, which a `position: fixed` sidebar would defeat by
            // stacking every instance on top of the others.
            isFixed={false}
            storageKey={null}
            minWidth={width}
            maxWidth={width}
            footer={<SidebarFooter />}
            onLogoClick={handleLogoClick}
            {...props}
        >
            <KitchenSink />
        </Sidebar>
    </div>
);

AtWidth.propTypes = { width: PropTypes.number.isRequired };

export const VariantIcons = () => (
    <div>
        <StoryNote title="Baseline: icons variant at 64px">
            Below 140px every item shows its icon only. The `12` badge on Marketing is consumer-supplied `info` content
            and stays visible here, unlike the default chevron it replaces.
        </StoryNote>
        <AtWidth width={64} />
    </div>
);

export const VariantText = () => (
    <div>
        <StoryNote title="Baseline: text variant at 150px">
            Between 140px and 173px every item shows its label only, no icons. The `12` badge stays visible.
        </StoryNote>
        <AtWidth width={150} />
    </div>
);

export const VariantIconsAndText = () => (
    <div>
        <StoryNote title="Baseline: icons and text variant at 200px">
            At 174px and above every item shows icon, label and trailing node together. The `12` badge stays visible.
        </StoryNote>
        <AtWidth width={200} />
    </div>
);

export const BandBoundaryIcons = () => (
    <div>
        <StoryNote title="Comparison: two sidebars, one pixel apart">
            139px on the left, 140px on the right, straddling the icons/text boundary. Each sidebar must be internally
            consistent: icons only on the left, labels only on the right. One sidebar showing a mix of both is the bug
            this change fixes.
        </StoryNote>
        <div className="flex">
            <AtWidth width={139} />
            <AtWidth width={140} />
        </div>
    </div>
);

export const BandBoundaryText = () => (
    <div>
        <StoryNote title="Comparison: two sidebars, one pixel apart">
            173px on the left, 174px on the right, straddling the text/iconsAndText boundary. The left shows labels
            only, the right shows icons and labels. Neither may show a mix.
        </StoryNote>
        <div className="flex">
            <AtWidth width={173} />
            <AtWidth width={174} />
        </div>
    </div>
);

// variant="text", not "icons": the icons ceiling is SIDEBAR_WIDTH.MIN, which equals the default
// minWidth, so that range collapses to the single point 64 and drag has nowhere to travel. A story
// promising "drag cannot widen it" would then pass without the ceiling doing anything. The text
// ceiling (173) sits inside the 64-200 range, so the drag can move and still be stopped short of
// the 200 it would otherwise reach.
export const VariantPropAsCeiling = () => (
    <div className="h-screen">
        <StoryNote title="Interactive: drag the sidebar's right edge outward">
            `variant="text"` lowers the ceiling to 173px even though maxWidth allows 200. Dragging right must move the
            sidebar but stop at 173, never reaching 200. Dragging left still narrows it to 64.
        </StoryNote>
        <Sidebar
            isFixed={false}
            storageKey={null}
            variant="text"
            footer={<SidebarFooter />}
            onLogoClick={handleLogoClick}
        >
            <KitchenSink />
        </Sidebar>
    </div>
);

// The icons ceiling equals the default minWidth, so this variant is a fixed-width rail by design:
// there is no drag range at all. Kept separate from the ceiling story above so that one can prove
// the ceiling actually constrains a live drag.
export const VariantIconsIsFixedWidth = () => (
    <div className="h-screen">
        <StoryNote title="Check: no drag range in the icons variant">
            `variant="icons"` pins the ceiling to 64, which is also the minimum, so the sidebar is a fixed rail.
            Dragging the right edge does nothing in either direction, deliberately.
        </StoryNote>
        <Sidebar
            isFixed={false}
            storageKey={null}
            variant="icons"
            footer={<SidebarFooter />}
            onLogoClick={handleLogoClick}
        >
            <KitchenSink />
        </Sidebar>
    </div>
);

export const ControlledCollapse = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [reported, setReported] = useState("");

    return (
        <div className="h-screen">
            <StoryNote title="Interactive: click the button below">
                The sidebar has no collapse button of its own, so the `isCollapsed` prop is the only way to collapse it
                programmatically. Expect a reported width of 64 collapsed and 200 expanded.
            </StoryNote>

            <div className="mb-4 flex items-center gap-3">
                <Button onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? "Expand" : "Collapse"} sidebar
                </Button>
                <span className="text-sm text-gray-dark">Reported width: {reported || "none yet"}</span>
            </div>
            <Sidebar
                storageKey={null}
                isCollapsed={isCollapsed}
                footer={<SidebarFooter />}
                onLogoClick={handleLogoClick}
                onSidebarResize={setReported}
            >
                <KitchenSink />
            </Sidebar>
        </div>
    );
};

// Mounting collapsed pins effectiveMaxWidth to minWidth, so the expand must resolve against the
// uncollapsed ceiling instead or it clamps straight back down and the sidebar never reopens.
export const ControlledCollapseStartsCollapsed = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [reported, setReported] = useState("");

    return (
        <div className="h-screen">
            <StoryNote title="Interactive: click the button below the sidebar">
                Mounts already collapsed. Expanding must reach 200 and never stick at 64.
            </StoryNote>
            <Sidebar
                storageKey={null}
                isCollapsed={isCollapsed}
                footer={<SidebarFooter />}
                onLogoClick={handleLogoClick}
                onSidebarResize={setReported}
            >
                <KitchenSink />
            </Sidebar>
            <div className="mt-4 flex items-center gap-3">
                <Button onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? "Expand" : "Collapse"} sidebar
                </Button>
                <span className="text-sm text-gray-dark">Reported width: {reported || "none yet"}</span>
            </div>
        </div>
    );
};

export const CollapseRoundTrip = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [reported, setReported] = useState("");

    return (
        <div className="h-screen">
            <StoryNote title="Interactive: drag first, then use the button">
                Drag the sidebar's right edge to about 150px, then collapse and expand with the button. The width must
                come back to 150, not jump to 200.
            </StoryNote>

            <div className="mb-4 flex items-center gap-3">
                <Button onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? "Expand" : "Collapse"} sidebar
                </Button>
                <span className="text-sm text-gray-dark">Reported width: {reported || "none yet"}</span>
            </div>
            <Sidebar
                storageKey={null}
                isCollapsed={isCollapsed}
                footer={<SidebarFooter />}
                onLogoClick={handleLogoClick}
                onSidebarResize={setReported}
            >
                <KitchenSink />
            </Sidebar>
        </div>
    );
};

export const AutoCollapseOnResize = () => (
    <div className="h-screen">
        <StoryNote title="Interactive: resize the Storybook canvas">
            Drag the preview pane across 1024px wide. Going narrower collapses the sidebar, going wider restores the
            width it had before.
        </StoryNote>
        <Sidebar storageKey={null} autoCollapseBelow={1024} footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
            <KitchenSink />
        </Sidebar>
    </div>
);

// A real sibling component, not a hook inline in FirstPaintPersistence: React renders siblings in
// JSX order, so this only reads the width Sidebar resolved and wrote if it is declared AFTER
// Sidebar. That ordering is what reproduces x2-seller Page.tsx:42, which reads this key during its
// own first render, immediately after the Sidebar it shares a parent with.
const FirstPaintReader = () => {
    const [readDuringFirstRender] = useState(() => window.localStorage.getItem("x2-14336-demo"));
    return <p>Read during first render: {String(readDuringFirstRender)}</p>;
};

export const FirstPaintPersistence = () => (
    <div className="h-screen">
        <StoryNote title="Setup required, then reload">
            Set localStorage["x2-14336-demo"] to "200", remove "x2-14336-demo:intent", shrink the canvas below 1024px,
            then reload. The line below reads the key during its own first render, the way a consumer app does, and must
            print 64 rather than 200.
        </StoryNote>
        <Sidebar
            storageKey="x2-14336-demo"
            autoCollapseBelow={1024}
            footer={<SidebarFooter />}
            onLogoClick={handleLogoClick}
        >
            <KitchenSink />
        </Sidebar>
        <FirstPaintReader />
    </div>
);

export const ThirdPartyChild = () => {
    const ConsumerNode = () => {
        const { showText } = useSidebar();
        return <div className="p-4 text-white">{showText ? "Third-party label" : "3P"}</div>;
    };

    return (
        <div className="h-screen">
            <StoryNote title="Interactive: drag the sidebar's right edge">
                The third-party node below the kitchen sink reads `useSidebar()` and must switch between its long and
                short label in step with ui-kit's own children.
            </StoryNote>
            <Sidebar storageKey={null} footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
                <KitchenSink />
                <ConsumerNode />
            </Sidebar>
        </div>
    );
};

export const TwoSidebars = () => (
    <div>
        <StoryNote title="Comparison: two sidebars sharing one CSS variable target">
            Both write `--ui-sidebar-width` to the same element, so each overwrites the other. Open the console: the
            collision warning must appear exactly once, from the second mount.
        </StoryNote>
        <div className="flex">
            <AtWidth width={64} cssVariableTarget={document.body} />
            <AtWidth width={200} cssVariableTarget={document.body} />
        </div>
    </div>
);

export default SidebarStories;
