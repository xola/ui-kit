import { Sidebar } from "@xola/ui-kit";
import React, { useRef } from "react";

interface MenuInstance {
    hide: () => void;
}

export const FooterMenu = ({ onLogout }: { onLogout: () => void }) => {
    const menuInstanceRef = useRef<MenuInstance>();

    const handleLogout = () => {
        menuInstanceRef.current?.hide();
        onLogout();
    };

    const handleMount = (instance: MenuInstance) => {
        menuInstanceRef.current = instance;
    };

    return (
        <Sidebar.Menu
            delay={200}
            content={<Sidebar.Button label="Logout" onClick={handleLogout} />}
            onMount={handleMount}
        >
            <Sidebar.Account name="Account" />
        </Sidebar.Menu>
    );
};
