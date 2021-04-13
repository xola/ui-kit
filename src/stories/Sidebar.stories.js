import React from "react";
import { Sidebar, SidebarLink, StarIcon } from "..";

export default {
    title: "Sidebar",
    component: Sidebar,
};

export const Default = () => {
    return (
        <Sidebar>
            <SidebarLink icon={StarIcon} active>
                Hello
            </SidebarLink>

            <SidebarLink icon={StarIcon}>World</SidebarLink>
        </Sidebar>
    );
};
