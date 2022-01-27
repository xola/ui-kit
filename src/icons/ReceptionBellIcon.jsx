import React from "react";
import { createIcon } from "../helpers/icon";

export const ReceptionBellIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" fill="none" viewBox="0 0 19 18" {...props}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
                d="M9.715 3.857v3.568M8.429 3.857H11M3.535 14.56a.893.893 0 01-.884-1.018 7.135 7.135 0 0114.125 0 .894.894 0 01-.882 1.02l-12.36-.002z"
            />
        </svg>
    );
});
