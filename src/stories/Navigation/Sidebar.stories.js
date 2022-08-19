import React from "react";
import { AnnounceIcon, CheckIcon, ExportIcon, Sidebar, StarIcon, UserIcon } from "../..";

const SidebarStories = {
    title: "Navigation/Sidebar",
    component: Sidebar,
};

export const Default = () => {
    return (
        <div className="h-screen">
            <Sidebar
                footer={
                    <Sidebar.Footer>
                        <Sidebar.Menu
                            content={
                                <div className="space-y-2">
                                    <Sidebar.Account
                                        name="Twitter"
                                        description="San Francisco, CA"
                                        icon={<CheckIcon className="text-green" />}
                                    />

                                    <Sidebar.Account name="Slack" description="San Francisco, CA" />
                                    <Sidebar.Button icon={ExportIcon} label="Logout" />
                                </div>
                            }
                        >
                            <Sidebar.Account isResponsive name="Old South Carriage Company" />
                        </Sidebar.Menu>
                    </Sidebar.Footer>
                }
                onLogoClick={() => {}}
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

export const SidebarWithNotifications = () => {
    return (
        <div className="h-screen">
            <Sidebar
                footer={
                    <Sidebar.Footer>
                        <Sidebar.Menu
                            content={
                                <div className="space-y-2">
                                    <Sidebar.Account
                                        name="Twitter"
                                        description="San Francisco, CA"
                                        icon={<CheckIcon className="text-green" />}
                                    />

                                    <Sidebar.Account name="Slack" description="San Francisco, CA" />
                                    <Sidebar.Button icon={ExportIcon} label="Logout" />
                                </div>
                            }
                        >
                            <Sidebar.Account isResponsive name="Old South Carriage Company" />
                        </Sidebar.Menu>
                    </Sidebar.Footer>
                }
                notifications={{
                    announcements: {
                        count: 3,
                        content: <div>Some content</div>,
                        title: "Announcements",
                        onClose: () => {},
                    },
                    notices: {
                        count: 3,
                        content: <div>Some content</div>,
                        title: "Notifications & Pending items",
                    },
                }}
                onLogoClick={() => {}}
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
