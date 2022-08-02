import React, { useState } from "react";
import { Drawer } from "../..";
import { AnnounceIcon, CheckIcon, ExportIcon, Sidebar, StarIcon, UserIcon } from "../..";

const SidebarStories = {
    title: "Navigation/Sidebar",
    component: Sidebar,
};

export const Default = () => {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isAnnouncementsOpen, setIsAnnouncementsOpen] = useState(false);

    return (
        <div className="h-screen">
            <Sidebar
                components={{
                    Left: {
                        content: () => (
                            <Drawer
                                title="Announcements"
                                content={<div>Hello some content</div>}
                                isOpen={isAnnouncementsOpen}
                                onClose={() => setIsAnnouncementsOpen(false)}
                            />
                        ),
                        count: 3,
                        clickHandler: () => setIsAnnouncementsOpen(true),
                    },
                    Right: {
                        content: () => (
                            <Drawer
                                title="Notifications & Pending items"
                                content={<div>Hello some content</div>}
                                isOpen={isNotificationsOpen}
                                onClose={() => setIsNotificationsOpen(false)}
                            />
                        ),
                        count: 3,
                        clickHandler: () => setIsNotificationsOpen(true),
                    },
                }}
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

export default SidebarStories;
