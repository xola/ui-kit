import React from "react";
import { Sidebar, SidebarLink, StarIcon, SidebarFooter } from "..";

export default {
    title: "Sidebar",
    component: Sidebar,
};

export const Default = () => {
    return (
        <Sidebar notifications={3} footer={<SidebarFooter name="Scott" />}>
            <SidebarLink icon={StarIcon} active>
                Hello
            </SidebarLink>

            <SidebarLink icon={StarIcon}>World</SidebarLink>
        </Sidebar>
    );
};
