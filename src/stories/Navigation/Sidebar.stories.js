import React from "react";
import { AnnounceIcon, CheckIcon, ExportIcon, Sidebar, StarIcon, TicketIcon, UserIcon } from "../..";

const SidebarStories = {
    title: "Navigation/Sidebar",
    component: Sidebar,
};

export const Default = () => {
    return (
        <div className="h-screen">
            <Sidebar
                notifications={3}
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
                            <Sidebar.Account isResponsive className="!px-7" name="Scott" />
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
                                <Sidebar.Link isActive={true} isSubMenuItem={true}>
                                    Abandoned Booking Recovery
                                </Sidebar.Link>
                                <Sidebar.Link isSubMenuItem={true}>Conversion Tracking</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem={true}>Coupons</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem={true}>Partners</Sidebar.Link>
                                <Sidebar.Link isSubMenuItem={true}>XolaBot</Sidebar.Link>
                            </div>
                        </div>
                    }
                >
                    <Sidebar.Link isActive={false} icon={AnnounceIcon}>
                        Marketing
                    </Sidebar.Link>
                </Sidebar.Menu>
            </Sidebar>
        </div>
    );
};

export default SidebarStories;
