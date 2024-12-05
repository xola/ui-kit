import React from "react";
import { createIcon } from "./helpers/icon";

export const ServiceIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M2.008 4v5.863M13 9.13a2.2 2.2 0 00-2.198-2.199H8.053a2.2 2.2 0 00-2.198-2.198H2V9.13h11zM5.855 6.931h2.749"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
