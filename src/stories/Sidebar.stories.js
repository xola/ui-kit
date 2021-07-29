import React from "react";
import { CheckIcon, ExportIcon, Sidebar, StarIcon, UserIcon } from "..";

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
                            <Sidebar.Account isResponsive name="Scott" />
                        </Sidebar.Menu>
                    </Sidebar.Footer>
                }
                onLogoClick={() => {}}
            >
                <Sidebar.Link isActive icon={UserIcon}>
                    Sellers
                </Sidebar.Link>

                <Sidebar.Link icon={StarIcon}>Favorites</Sidebar.Link>
            </Sidebar>
        </div>
    );
};

export default SidebarStories;
