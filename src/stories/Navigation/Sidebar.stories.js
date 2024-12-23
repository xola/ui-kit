import React, { useState } from "react";
import {
    AnnounceIcon,
    CheckIcon,
    HelpCenterIcon,
    LogoutIcon,
    PiggyBankIcon,
    PolicyIcon,
    Sidebar,
    StarIcon,
    UserIcon,
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
                <Sidebar.Account isResponsive name="Old South Carriage Company" />
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
                    <Sidebar.Link icon={PiggyBankIcon}>Bookings</Sidebar.Link>
                </Sidebar.Menu>

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
                    <Sidebar.Link hasSubmenu icon={AnnounceIcon}>Marketing</Sidebar.Link>
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

export default SidebarStories;
