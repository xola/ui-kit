import React from "react";
import { AnnounceIcon, CheckIcon, ExportIcon, Sidebar, StarIcon, UserIcon, LogoutIcon, HelpCenterIcon, PolicyIcon } from "../..";

const SidebarStories = {
    title: "Navigation/Sidebar",
    component: Sidebar,
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

                            <Sidebar.Separator className="my-0 mt-4 mx-0" />
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

export const SidebarWithNotifications = () => {
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
        },
    };
    return (
        <div className="h-screen">
            <Sidebar footer={<SidebarFooter />} notifications={notifications} onLogoClick={handleLogoClick}>
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
