import React from "react";
import { createIcon } from "./helpers/icon";

export const MenuIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path d="M2 4h10M2 7h10M2 10h10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});

MenuIcon.tags = ["hamburger", "sidebar"];
