import { useMount } from "ahooks";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import {
    AnnounceIcon,
    CheckIcon,
    HelpCenterIcon,
    LogoutIcon,
    PolicyIcon,
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
                            <Sidebar.Separator className="my-0 mx-0 mt-4" />
                            <Sidebar.Button icon={PolicyIcon} label="Privacy Policy" />

                            <Sidebar.Button icon={HelpCenterIcon} label="Help Center" />

                            <Sidebar.Separator className="mx-0" />
                            <Sidebar.Button icon={LogoutIcon} label="Logout" />
                        </div>
                    </div>
                }
            >
                <Sidebar.Account name="Old South Carriage Company" />
            </Sidebar.Menu>
        </Sidebar.Footer>
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
const KitchenSink = () => (
    <>
        <Sidebar.Link isActive icon={UserIcon}>
            Sellers
        </Sidebar.Link>
        <Sidebar.Link icon={StarIcon}>Favorites</Sidebar.Link>
        <Sidebar.Link icon={AnnounceIcon} info={<span className="ml-auto text-xs text-gray">12</span>}>
            Marketing
        </Sidebar.Link>
        <Sidebar.Button icon={PolicyIcon} label="Scan QR" />
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

export const VariantIcons = () => <AtWidth width={64} />;
export const VariantText = () => <AtWidth width={150} />;
export const VariantIconsAndText = () => <AtWidth width={200} />;

export const BandBoundaryIcons = () => (
    <div className="flex">
        <AtWidth width={139} />
        <AtWidth width={140} />
    </div>
);

export const BandBoundaryText = () => (
    <div className="flex">
        <AtWidth width={173} />
        <AtWidth width={174} />
    </div>
);

// Not AtWidth: it pins minWidth === maxWidth === width, so "drag cannot widen it" would hold
// trivially with no `variant` at all. This needs a real, non-inverted range — Sidebar's own
// defaults (64-200) — so the icons ceiling is what narrows effectiveMaxWidth down to 64, not an
// accidental clamp(x, 200, 64) ordering artifact.
export const VariantPropAsCeiling = () => (
    <div className="h-screen">
        <p>
            Renders at 64px even though maxWidth allows up to 200 — `variant="icons"` lowers the
            ceiling. Drag the handle right: it must not widen past 64.
        </p>
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
            <p>
                Click to collapse and expand. Reported width must match the uncontrolled toggle's (64 collapsed, 200
                expanded).
            </p>
            <button type="button" onClick={() => setIsCollapsed(!isCollapsed)}>
                Toggle (reported width: {reported})
            </button>
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

export const ToggleRoundTrip = () => {
    const [reported, setReported] = useState("");

    return (
        <div className="h-screen">
            <p>Drag to ~150, collapse, expand. Expect 150, not 200. Reported: {reported}</p>
            <Sidebar
                isCollapsible
                storageKey={null}
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
        <p>Resize the Storybook canvas across 1024px. Down collapses; up restores the prior width.</p>
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
        <p>
            Set localStorage["x2-14336-demo"] = "200", remove "x2-14336-demo:intent", shrink the canvas below
            1024px, reload. Expect the line below to print 64, not 200.
        </p>
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
            <p>Toggle the sidebar. The third-party node below the kitchen sink must react to the variant too.</p>
            <Sidebar isCollapsible storageKey={null} footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
                <KitchenSink />
                <ConsumerNode />
            </Sidebar>
        </div>
    );
};

export const ConsumerInfoNode = () => (
    <div>
        <p>The `12` badge on Marketing must stay visible in all three sidebars, unlike the chevron it replaces.</p>
        <div className="flex">
            <AtWidth width={64} />
            <AtWidth width={150} />
            <AtWidth width={200} />
        </div>
    </div>
);

// Both instances intentionally share one target to exercise Sidebar's same-reference collision
// guard; the second mount must warn exactly once.
export const TwoSidebars = () => (
    <div className="flex">
        <AtWidth width={64} cssVariableTarget={document.body} />
        <AtWidth width={200} cssVariableTarget={document.body} />
    </div>
);

export const DomShapeInspector = () => {
    const [shape, setShape] = useState("");
    const ref = useRef(null);

    useMount(() => {
        const link = ref.current?.querySelector(".ui-sidebar-link");
        // .toUpperCase(): browsers report SVG elements' tagName in lowercase (namespaced), unlike
        // HTML elements, which are always uppercase. Normalizing keeps this comparable to the
        // literal "SVG" above without changing which element the shape check actually found.
        setShape(
            [...(link?.children ?? [])]
                .map((node, index) => `${index + 1}:${node.tagName.toUpperCase()}`)
                .join(" "),
        );
    });

    return (
        <div className="h-screen" ref={ref}>
            <p>Expect 1:DIV 2:SPAN 3:SVG</p>
            <p>Actual: {shape}</p>
            <AtWidth width={200} />
        </div>
    );
};

export const KeyboardResize = () => (
    <div className="h-screen">
        <p>Tab to the handle. Arrows resize by 8px, Shift+Arrow by 32px, Home collapses, End expands.</p>
        <Sidebar isCollapsible storageKey={null} footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
            <KitchenSink />
        </Sidebar>
    </div>
);

export default SidebarStories;
