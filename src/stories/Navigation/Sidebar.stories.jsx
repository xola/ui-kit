import PropTypes from "prop-types";
import React, { useState } from "react";
import { expect, fn, spyOn, waitFor } from "storybook/test";
import {
    AnnounceIcon,
    Button,
    CheckIcon,
    HelpCenterIcon,
    LogoutIcon,
    PiggyBankIcon,
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

                <Sidebar.Menu
                    content={
                        <div className="space-y-5 py-6">
                            <Sidebar.Heading icon={PiggyBankIcon} label="Bookings" />
                            <div>
                                <Sidebar.Link isActive isSubMenuItem>
                                    Purchases
                                </Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>Gifts</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>Other Gifts</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>Things</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem>Other Things</Sidebar.Link>
                                <Sidebar.Separator />
                                <Sidebar.Link isSubMenuItem>Global Settings</Sidebar.Link>
                            </div>
                        </div>
                    }
                >
                    <Sidebar.Link hasSubmenu icon={PiggyBankIcon}>
                        Bookings
                    </Sidebar.Link>
                </Sidebar.Menu>

                <Sidebar.Link
                    icon={StarIcon}
                    info={
                        <span className="ml-auto shrink-0 pl-2">
                            <span className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-danger p-2.5 text-sm font-medium text-white">
                                3
                            </span>
                        </span>
                    }
                >
                    Favorites
                </Sidebar.Link>

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
                    <Sidebar.Link hasSubmenu icon={AnnounceIcon}>
                        Marketing
                    </Sidebar.Link>
                </Sidebar.Menu>
            </Sidebar>
        </div>
    );
};

const MENU_SELECTOR = ".ui-sidebar-menu";

const queryMenu = (canvasElement, text) => {
    const menus = canvasElement.ownerDocument.querySelectorAll(MENU_SELECTOR);

    return [...menus].find((menu) => menu.textContent.includes(text));
};

const findMenu = (canvasElement, text) => {
    return waitFor(() => {
        const menu = queryMenu(canvasElement, text);
        expect(menu).toBeInstanceOf(HTMLElement);

        return menu;
    });
};

const expectNoMenu = (canvasElement, text, options) => {
    return waitFor(() => expect(queryMenu(canvasElement, text)).toBeUndefined(), options);
};

/** Clears the 150ms open delay, the 100ms close delay and the fade-in, so a menu that was going to change has. */
const waitForChangeWindow = () => new Promise((resolve) => setTimeout(resolve, 400));

Default.play = async ({ canvas, canvasElement, userEvent }) => {
    await expect(canvas.getByText("Sellers")).toBeInTheDocument();
    await expect(canvas.getByText("Favorites")).toBeInTheDocument();

    const account = canvasElement.querySelector(".ui-sidebar-footer .ui-sidebar-account");
    await expect(queryMenu(canvasElement, "Privacy Policy")).toBeUndefined();

    await userEvent.hover(account);
    await findMenu(canvasElement, "Privacy Policy");

    await userEvent.unhover(account);
    await expectNoMenu(canvasElement, "Privacy Policy");
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

CustomLogo.play = async ({ canvas, canvasElement }) => {
    await expect(canvasElement.querySelector("img")).toBeInTheDocument();
    await expect(canvas.getByText("Sellers")).toBeInTheDocument();
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

SidebarWithNotifications.play = async ({ canvas }) => {
    await expect(canvas.getByText("Sellers")).toBeInTheDocument();
    await expect(canvas.getByText("Favorites")).toBeInTheDocument();
};

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
            // Side-by-side stories mount several of these, and they would otherwise all claim
            // document.documentElement. TwoSidebars overrides this to demonstrate that collision.
            cssVariableTarget={null}
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

VariantIcons.play = async ({ canvas }) => {
    await expect(canvas.getByRole("separator", { name: "Resize sidebar" })).toHaveAttribute("aria-valuenow", "64");
    await expect(canvas.getByText("Sellers")).not.toBeVisible();
};

VariantText.play = async ({ canvas }) => {
    await expect(canvas.getByRole("separator", { name: "Resize sidebar" })).toHaveAttribute("aria-valuenow", "150");
    await expect(canvas.getByText("Sellers")).toBeVisible();
};

VariantIconsAndText.play = async ({ canvas }) => {
    await expect(canvas.getByRole("separator", { name: "Resize sidebar" })).toHaveAttribute("aria-valuenow", "200");
    await expect(canvas.getByText("Sellers")).toBeVisible();
};

// The pair is the assertion: one sidebar either side of 140 must land in different bands, and
// neither may show a mix. Ordered left-to-right by the DOM, so [0] is the narrower rail.
BandBoundaryIcons.play = async ({ canvas }) => {
    const [narrow, wide] = canvas.getAllByText("Sellers");

    await expect(narrow).not.toBeVisible();
    await expect(wide).toBeVisible();
};

BandBoundaryText.play = async ({ canvas }) => {
    const [narrow, wide] = canvas.getAllByText("Sellers");

    await expect(narrow).toBeVisible();
    await expect(wide).toBeVisible();
};

// variant="text", not "icons": the icons ceiling equals the default minWidth, so that range is the
// single point 64 and a drag has nowhere to travel. The text ceiling (173) sits inside 64-200, so
// the drag can move and still be stopped short of 200.
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

// A sibling component, not an inline hook: React renders siblings in JSX order, so this reads the
// width Sidebar wrote only when declared AFTER it. That ordering reproduces a consumer app reading
// the key during its own first render.
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

// Module scope, not nested in the story: a component declared during render is a new type every
// render, so React remounts the subtree.
const ConsumerNode = () => {
    const { showText } = useSidebar();

    return <div className="p-4 text-white">{showText ? "Third-party label" : "3P"}</div>;
};

export const ThirdPartyChild = () => {
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

// The resize handle is a focusable separator, so a keyboard user can widen the rail without a
// pointer. ArrowRight steps by 8px from the 64px this story mounts at.
ThirdPartyChild.play = async ({ canvas, userEvent }) => {
    const handle = canvas.getByRole("separator", { name: "Resize sidebar" });

    await userEvent.click(canvas.getByText("Sellers"));
    handle.focus();
    await userEvent.keyboard("{Home}");
    await expect(handle).toHaveAttribute("aria-valuenow", "64");

    await userEvent.keyboard("{ArrowRight}");
    await expect(handle).toHaveAttribute("aria-valuenow", "72");

    await userEvent.keyboard("{End}");
    await expect(handle).toHaveAttribute("aria-valuenow", "200");
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

// Four submenu triggers stacked with no gap, the shape the seller app uses. A synthetic pointer
// cannot drive this: CDP mouse moves reach the parent document even over iframe pixels, so the
// stacking has to be checked by hovering the rail by hand.
const SUBMENU_GROUPS = [
    { icon: StarIcon, label: "Products", items: ["Experiences", "Add-ons", "Gift Cards"] },
    { icon: AnnounceIcon, label: "Reports", items: ["Analytics", "Earnings Report", "Payouts", "Disputes"] },
    {
        icon: AnnounceIcon,
        label: "Marketing",
        items: ["Abandoned Reservation Recovery", "Conversion Tracking", "Coupons", "XolaBot"],
    },
    { icon: PolicyIcon, label: "Settings", items: ["Account", "Users", "Integrations"] },
];

export const AdjacentSubMenus = () => (
    <div className="h-screen">
        <StoryNote title="Interactive: sweep the pointer down Products, Reports, Marketing, Settings">
            Exactly one submenu may be on screen at any moment. Two or three stacked menus, each offset from the last,
            is the bug. The iframe stands in for the seller app&apos;s legacy page host, which an open menu overlays: a
            pointer crossing iframe pixels is one way the parent document stops seeing the move, and nothing then tells
            the menu to close.
        </StoryNote>
        <div className="flex h-full">
            <Sidebar isFixed={false} storageKey={null} footer={<SidebarFooter />} onLogoClick={handleLogoClick}>
                <Sidebar.Link isActive icon={UserIcon}>
                    Dashboard
                </Sidebar.Link>

                {SUBMENU_GROUPS.map(({ icon, label, items }) => (
                    <Sidebar.Menu
                        key={label}
                        content={
                            <div className="space-y-5 py-6">
                                <Sidebar.Heading icon={icon} label={label} />
                                <div>
                                    {items.map((item) => (
                                        <Sidebar.Link key={item} isSubMenuItem>
                                            {item}
                                        </Sidebar.Link>
                                    ))}
                                </div>
                            </div>
                        }
                    >
                        <Sidebar.Link hasSubmenu icon={icon}>
                            {label}
                        </Sidebar.Link>
                    </Sidebar.Menu>
                ))}
            </Sidebar>

            <iframe
                title="Legacy page host"
                className="h-full flex-1 border-0"
                srcDoc="<body style='margin:0;background:#f6f7f9;font:14px system-ui;padding:24px'>Legacy page content</body>"
            />
        </div>
    </div>
);

/** Long enough that a menu still open after it is only open because nothing else closed it. */
const SLOW_CLOSE_DELAY = [0, 2000];

/** Well inside `SLOW_CLOSE_DELAY`'s close, so a menu gone by then was closed by something else. */
const BEFORE_SLOW_CLOSE = { timeout: 500 };

const SubMenu = ({ items }) => (
    <div className="py-2">
        {items.map((item) => (
            <Sidebar.Link key={item} isSubMenuItem>
                {item}
            </Sidebar.Link>
        ))}
    </div>
);

SubMenu.propTypes = { items: PropTypes.arrayOf(PropTypes.string).isRequired };

/**
 * A full-width rail whose width no viewport or stored value changes, with two submenus and an account menu, each
 * taking its own props.
 */
const MenuRail = ({ bookingsMenuProps, marketingMenuProps, accountMenuProps, children }) => (
    <div className="flex h-screen">
        <Sidebar
            isFixed={false}
            storageKey={null}
            cssVariableTarget={null}
            autoCollapseBelow={null}
            footer={
                <Sidebar.Footer>
                    <Sidebar.Menu
                        content={
                            <div>
                                <Sidebar.Button icon={HelpCenterIcon} label="Help Center" />
                                <Sidebar.Button icon={LogoutIcon} label="Logout" />
                            </div>
                        }
                        {...accountMenuProps}
                    >
                        <Sidebar.Account name="Old South Carriage Company" />
                    </Sidebar.Menu>
                </Sidebar.Footer>
            }
        >
            <Sidebar.Menu content={<SubMenu items={["Purchases", "Gifts"]} />} {...bookingsMenuProps}>
                <Sidebar.Link hasSubmenu icon={PiggyBankIcon}>
                    Bookings
                </Sidebar.Link>
            </Sidebar.Menu>

            <Sidebar.Menu content={<SubMenu items={["Coupons", "Partners"]} />} {...marketingMenuProps}>
                <Sidebar.Link hasSubmenu icon={AnnounceIcon}>
                    Marketing
                </Sidebar.Link>
            </Sidebar.Menu>
        </Sidebar>

        <div className="space-y-2 p-4">
            <p>Outside</p>
            {children}
        </div>
    </div>
);

MenuRail.propTypes = {
    bookingsMenuProps: PropTypes.object,
    marketingMenuProps: PropTypes.object,
    accountMenuProps: PropTypes.object,
    children: PropTypes.node,
};

const slowClose = { delay: SLOW_CLOSE_DELAY };

const getTrigger = (canvas, name) => canvas.getByRole("button", { name }).parentElement;

const getResizeHandle = (canvas) => canvas.getByRole("separator", { name: "Resize sidebar" });

const dispatchPointer = (target, type, init) => {
    const pointer = { bubbles: true, cancelable: true, pointerId: 1, pointerType: "mouse", isPrimary: true };
    target.dispatchEvent(new PointerEvent(type, { ...pointer, ...init }));
};

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));

/**
 * Drags the resize handle `deltaX` px with a mouse. Each event waits for the render it causes: the rail drops its width
 * transition only while a drag is rendered as in progress, and a width committed after release animates instead.
 */
const dragHandle = async (handle, deltaX) => {
    const { left, top, width, height } = handle.getBoundingClientRect();
    const start = { clientX: left + width / 2, clientY: top + height / 2 };
    const end = { ...start, clientX: start.clientX + deltaX };
    const startWidth = handle.getAttribute("aria-valuenow");

    dispatchPointer(handle, "pointerdown", { ...start, button: 0, buttons: 1 });
    await nextFrame();
    dispatchPointer(handle, "pointermove", { ...end, buttons: 1 });
    await waitFor(() => expect(handle).not.toHaveAttribute("aria-valuenow", startWidth));
    dispatchPointer(handle, "pointerup", end);
    await nextFrame();
};

const ancestorsOf = (element) => {
    const ancestors = [];
    for (let node = element; node; node = node.parentElement) {
        ancestors.push(node);
    }

    return ancestors;
};

/**
 * Chrome's events for a finger tap: touch pointer events, then compatibility mouse events and `click`. Mouse boundary
 * events fire only when the tap lands somewhere new, measured from `previousTarget`. Nothing gets focus, as on iOS
 * Safari, which does not focus a tapped button.
 */
const tap = (target, previousTarget) => {
    const { left, top, width, height } = target.getBoundingClientRect();
    const init = { bubbles: true, cancelable: true, clientX: left + width / 2, clientY: top + height / 2 };
    const finger = { ...init, pointerId: 2, pointerType: "touch", isPrimary: true };
    const targetChain = ancestorsOf(target);
    const enterTargets = targetChain.filter((node) => !previousTarget || !node.contains(previousTarget));
    const leaveTargets = previousTarget ? ancestorsOf(previousTarget).filter((node) => !node.contains(target)) : [];
    const isNewTarget = enterTargets.length > 0;

    target.dispatchEvent(new PointerEvent("pointerover", finger));
    targetChain.forEach((node) => {
        node.dispatchEvent(new PointerEvent("pointerenter", { ...finger, bubbles: false }));
    });
    target.dispatchEvent(new PointerEvent("pointerdown", { ...finger, button: 0, buttons: 1 }));
    target.dispatchEvent(new PointerEvent("pointerup", finger));
    target.dispatchEvent(new PointerEvent("pointerout", finger));
    targetChain.forEach((node) => {
        node.dispatchEvent(new PointerEvent("pointerleave", { ...finger, bubbles: false }));
    });

    if (isNewTarget) {
        previousTarget?.dispatchEvent(new MouseEvent("mouseout", init));
        leaveTargets.forEach((node) => node.dispatchEvent(new MouseEvent("mouseleave", { ...init, bubbles: false })));
        target.dispatchEvent(new MouseEvent("mouseover", init));
        enterTargets.forEach((node) => node.dispatchEvent(new MouseEvent("mouseenter", { ...init, bubbles: false })));
    }

    target.dispatchEvent(new MouseEvent("mousemove", init));
    target.dispatchEvent(new MouseEvent("mousedown", { ...init, button: 0, buttons: 1 }));
    target.dispatchEvent(new MouseEvent("mouseup", init));
    target.dispatchEvent(new MouseEvent("click", init));
};

export const OneMenuAtATime = () => <MenuRail bookingsMenuProps={slowClose} marketingMenuProps={slowClose} />;

OneMenuAtATime.play = async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(getTrigger(canvas, "Bookings"));
    await findMenu(canvasElement, "Purchases");

    await userEvent.hover(getTrigger(canvas, "Marketing"));
    await findMenu(canvasElement, "Coupons");
    await expectNoMenu(canvasElement, "Purchases", BEFORE_SLOW_CLOSE);
};

export const ResizeClosesMenus = () => <MenuRail bookingsMenuProps={slowClose} />;

ResizeClosesMenus.play = async ({ canvas, canvasElement, userEvent }) => {
    const trigger = getTrigger(canvas, "Bookings");
    const handle = getResizeHandle(canvas);
    const { left, top } = handle.getBoundingClientRect();

    await userEvent.hover(trigger);
    await findMenu(canvasElement, "Purchases");
    dispatchPointer(handle, "pointerdown", { clientX: left, clientY: top, button: 0, buttons: 1 });
    await expectNoMenu(canvasElement, "Purchases", BEFORE_SLOW_CLOSE);
    dispatchPointer(handle, "pointerup", { clientX: left, clientY: top });

    await userEvent.unhover(trigger);
    await userEvent.hover(trigger);
    await findMenu(canvasElement, "Purchases");
    handle.focus();
    await userEvent.keyboard("{ArrowLeft}");
    await expectNoMenu(canvasElement, "Purchases", BEFORE_SLOW_CLOSE);
};

const getCenterY = ({ top, height }) => top + height / 2;

const getAttachment = (trigger, menu) => {
    const triggerBox = trigger.getBoundingClientRect();
    const menuBox = menu.getBoundingClientRect();
    const gap = menuBox.left - triggerBox.right;

    return { gap, menuLeft: menuBox.left, centerOffset: getCenterY(menuBox) - getCenterY(triggerBox) };
};

export const MenuFollowsRailResize = () => <MenuRail />;

MenuFollowsRailResize.play = async ({ canvas, canvasElement, userEvent }) => {
    const trigger = getTrigger(canvas, "Bookings");
    const handle = getResizeHandle(canvas);

    const getWidth = () => Number(handle.getAttribute("aria-valuenow"));
    const widthBefore = getWidth();

    await userEvent.hover(trigger);
    const before = getAttachment(trigger, await findMenu(canvasElement, "Purchases"));
    await expect(before.gap).toBeCloseTo(4, 0);
    await expect(before.centerOffset).toBeCloseTo(0, 0);

    await dragHandle(handle, -100);
    await expect(widthBefore - getWidth()).toBeGreaterThan(90);
    await expectNoMenu(canvasElement, "Purchases");

    await userEvent.unhover(trigger);
    await userEvent.hover(trigger);
    const after = getAttachment(trigger, await findMenu(canvasElement, "Purchases"));

    await expect(after.menuLeft).toBeCloseTo(before.menuLeft - (widthBefore - getWidth()), 0);
    await expect(after.gap).toBeCloseTo(before.gap, 0);
    await expect(after.centerOffset).toBeCloseTo(before.centerOffset, 0);
};

export const UnmountWhileOpen = ({ onOpenChange }) => {
    const [mountCount, setMountCount] = useState(0);
    const handleRemount = () => setMountCount(mountCount + 1);

    return (
        <MenuRail key={mountCount} bookingsMenuProps={{ ...slowClose, onOpenChange }}>
            <Button onClick={handleRemount}>Remount rail</Button>
        </MenuRail>
    );
};

UnmountWhileOpen.args = { onOpenChange: fn() };

UnmountWhileOpen.play = async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.hover(getTrigger(canvas, "Bookings"));
    await findMenu(canvasElement, "Purchases");

    // Keyboard, not a click: a press outside would close the menu before it unmounts
    canvas.getByRole("button", { name: "Remount rail" }).focus();
    await userEvent.keyboard("{Enter}");
    await expectNoMenu(canvasElement, "Purchases");

    // A menu that unmounted open must not still be asked to close
    getResizeHandle(canvas).focus();
    await userEvent.keyboard("{ArrowLeft}");
    await waitForChangeWindow();
    await expect(args.onOpenChange).not.toHaveBeenCalledWith(false);
};

export const FocusOpens = () => <MenuRail />;

FocusOpens.play = async ({ canvas, canvasElement, userEvent }) => {
    canvas.getByRole("button", { name: "Bookings" }).focus();
    await findMenu(canvasElement, "Purchases");

    await userEvent.keyboard("{Escape}");
    await expectNoMenu(canvasElement, "Purchases");
};

export const TouchTapOpens = (args) => <MenuRail accountMenuProps={args} />;

TouchTapOpens.args = { onOpenChange: fn() };

TouchTapOpens.play = async ({ args, canvas, canvasElement }) => {
    const account = canvasElement.querySelector(".ui-sidebar-footer .ui-sidebar-account");
    const outside = canvas.getByText("Outside");

    tap(account);
    await findMenu(canvasElement, "Logout");

    // The finger lifting fires a touch pointerleave, which must not close a menu a tap opened
    await waitForChangeWindow();
    await expect(queryMenu(canvasElement, "Logout")).toBeInstanceOf(HTMLElement);

    // A second tap on the trigger is not a press outside: the menu stays open without closing in between
    tap(account, account);
    await waitForChangeWindow();
    await expect(queryMenu(canvasElement, "Logout")).toBeInstanceOf(HTMLElement);
    await expect(args.onOpenChange).toHaveBeenCalledTimes(1);

    tap(outside, account);
    await expectNoMenu(canvasElement, "Logout");
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(false);
};

export const OpenChangeCallbacks = (args) => <MenuRail bookingsMenuProps={args} />;

OpenChangeCallbacks.args = { onOpenChange: fn() };

OpenChangeCallbacks.play = async ({ args, canvas, canvasElement, userEvent }) => {
    const trigger = getTrigger(canvas, "Bookings");

    await userEvent.hover(trigger);
    await findMenu(canvasElement, "Purchases");
    await waitFor(() => expect(args.onOpenChange).toHaveBeenCalledTimes(1));
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(true);

    // Clicking the hovered trigger is not a press outside: the menu stays open without closing in between
    await userEvent.click(canvas.getByRole("button", { name: "Bookings" }));
    await waitForChangeWindow();
    await expect(queryMenu(canvasElement, "Purchases")).toBeInstanceOf(HTMLElement);
    await expect(args.onOpenChange).toHaveBeenCalledTimes(1);

    await userEvent.unhover(trigger);
    await expectNoMenu(canvasElement, "Purchases");
    await waitFor(() => expect(args.onOpenChange).toHaveBeenCalledTimes(2));
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(false);
};

export const Controlled = ({ onOpenChange }) => {
    const [isOpen, setIsOpen] = useState();
    const handleShow = () => setIsOpen(true);
    const handleHide = () => setIsOpen(false);
    const handleRelease = () => setIsOpen(undefined);

    return (
        <MenuRail bookingsMenuProps={{ open: isOpen, onOpenChange }}>
            <Button onClick={handleShow}>Show menu</Button>
            <Button onClick={handleHide}>Hide menu</Button>
            <Button onClick={handleRelease}>Release menu</Button>
        </MenuRail>
    );
};

Controlled.args = { onOpenChange: fn() };

Controlled.play = async ({ args, canvas, canvasElement, userEvent }) => {
    const trigger = getTrigger(canvas, "Bookings");

    await userEvent.click(canvas.getByRole("button", { name: "Show menu" }));
    await findMenu(canvasElement, "Purchases");

    await userEvent.click(canvas.getByRole("button", { name: "Hide menu" }));
    await expectNoMenu(canvasElement, "Purchases");

    // Held closed, a hover only asks to open
    await userEvent.hover(trigger);
    await waitFor(() => expect(args.onOpenChange).toHaveBeenCalledWith(true));
    await waitForChangeWindow();
    await expect(queryMenu(canvasElement, "Purchases")).toBeUndefined();

    // Released after being held closed: stays closed until the next hover, as Tippy did
    await userEvent.unhover(trigger);
    await userEvent.click(canvas.getByRole("button", { name: "Release menu" }));
    await waitForChangeWindow();
    await expect(queryMenu(canvasElement, "Purchases")).toBeUndefined();

    await userEvent.hover(trigger);
    await findMenu(canvasElement, "Purchases");
};

export const HeldOpenFollowsRailResize = () => <MenuRail bookingsMenuProps={{ open: true }} />;

HeldOpenFollowsRailResize.play = async ({ canvas, canvasElement }) => {
    const trigger = getTrigger(canvas, "Bookings");
    const handle = getResizeHandle(canvas);
    const getWidth = () => Number(handle.getAttribute("aria-valuenow"));
    const widthBefore = getWidth();
    const before = getAttachment(trigger, await findMenu(canvasElement, "Purchases"));

    // The drag asks every menu to close, and a menu held open with no `onOpenChange` stays open through it
    await dragHandle(handle, -100);
    await expect(widthBefore - getWidth()).toBeGreaterThan(90);

    await waitFor(() => {
        const after = getAttachment(trigger, queryMenu(canvasElement, "Purchases"));

        expect(after.menuLeft).toBeCloseTo(before.menuLeft - (widthBefore - getWidth()), 0);
        expect(after.gap).toBeCloseTo(before.gap, 0);
        expect(after.centerOffset).toBeCloseTo(before.centerOffset, 0);
    });
};

let removedWarnSpy;

export const RemovedPropWarns = () => {
    const handleTippyEvent = () => {};

    return (
        <MenuRail
            bookingsMenuProps={{
                visible: false,
                onMount: handleTippyEvent,
                onShow: handleTippyEvent,
                onHide: handleTippyEvent,
                onHidden: handleTippyEvent,
                onDestroy: handleTippyEvent,
            }}
        />
    );
};

RemovedPropWarns.beforeEach = () => {
    removedWarnSpy = spyOn(console, "warn");
};

RemovedPropWarns.play = async () => {
    const expected = [
        "UI Kit Sidebar.Menu: 'visible' was removed in 3.8, use 'open'",
        "UI Kit Sidebar.Menu: 'onMount' was removed in 3.8, use 'onOpenChange'",
        "UI Kit Sidebar.Menu: 'onShow' was removed in 3.8, use 'onOpenChange'",
        "UI Kit Sidebar.Menu: 'onHide' was removed in 3.8, use 'onOpenChange'",
        "UI Kit Sidebar.Menu: 'onHidden' was removed in 3.8, use 'onOpenChange'",
        "UI Kit Sidebar.Menu: 'onDestroy' was removed in 3.8, use 'onOpenChange'",
    ];
    const warnings = removedWarnSpy.mock.calls.map(([text]) => text);

    expected.forEach((message) => {
        expect(warnings.filter((text) => text === message)).toHaveLength(1);
    });
};

export default SidebarStories;
