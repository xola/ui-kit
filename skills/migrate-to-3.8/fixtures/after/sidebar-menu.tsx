import { LogoutIcon, Sidebar } from "@xola/ui-kit";
import React, { useState } from "react";

export const FooterMenu = ({ onLogout }: { onLogout: () => void }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        setIsMenuOpen(false);
        onLogout();
    };

    return (
        <Sidebar.Menu
            open={isMenuOpen}
            delay={200}
            content={<Sidebar.Button label="Logout" icon={LogoutIcon} onClick={handleLogout} />}
            onOpenChange={setIsMenuOpen}
        >
            <Sidebar.Account name="Account" />
        </Sidebar.Menu>
    );
};
