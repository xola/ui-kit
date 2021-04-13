import React from "react";
import { Sidebar, SidebarLink, StarIcon, UserIcon, SidebarFooter } from "..";

export default {
    title: "Sidebar",
    component: Sidebar,
};

export const Default = () => {
    return (
        <Sidebar notifications={3} footer={<SidebarFooter name="Scott" />}>
            <SidebarLink icon={UserIcon} active>
                Sellers
            </SidebarLink>

            <SidebarLink icon={StarIcon}>Favorites</SidebarLink>
        </Sidebar>
    );
};
