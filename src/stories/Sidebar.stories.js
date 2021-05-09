import React from "react";
import { Sidebar, UserIcon, StarIcon } from "..";

export default {
    title: "Components/Sidebar",
    component: Sidebar,
};

export const Default = () => {
    return (
        <div className="h-screen">
            <Sidebar notifications={3} footer={<Sidebar.Footer name="Scott" />}>
                <Sidebar.Link icon={UserIcon} active>
                    Sellers
                </Sidebar.Link>

                <Sidebar.Link icon={StarIcon}>Favorites</Sidebar.Link>
            </Sidebar>
        </div>
    );
};
