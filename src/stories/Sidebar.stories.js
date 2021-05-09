import React, { useState } from "react";
import { Sidebar, StarIcon, UserIcon } from "..";
import { ExportIcon } from "../icons/ExportIcon";

export default {
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
            >
                <Sidebar.Link icon={UserIcon} active>
                    Sellers
                </Sidebar.Link>

                <Sidebar.Link icon={StarIcon}>Favorites</Sidebar.Link>
            </Sidebar>
        </div>
    );
};
