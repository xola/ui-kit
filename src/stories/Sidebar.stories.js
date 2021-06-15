import React, { useState } from "react";
import { Sidebar, StarIcon, UserIcon } from "..";
import { ExportIcon } from "../icons/ExportIcon";

const SidebarStories = {
    title: "Components/Sidebar",
    component: Sidebar,
};

export const Default = () => {
    const [openFooter, setOpenFooter] = useState(false);

    const handleAvatarClick = () => {
        setOpenFooter(!openFooter);
    };

    return (
        <div className="h-screen">
            <Sidebar
                notifications={3}
                footer={
                    <Sidebar.Footer>
                        <Sidebar.Footer.Avatar name="Scott" onClick={handleAvatarClick} />
                        {openFooter ? <Sidebar.Footer.Button icon={ExportIcon} label="Logout" /> : null}
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
