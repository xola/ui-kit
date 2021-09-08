import React from "react";
import { createIcon } from "../helpers/icon";

export const FunnelIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M13.333 2.747v-.005a.38.38 0 00-.358-.403c-.01-.005-.02-.005-.025-.005H2.38a.374.374 0 00-.378.377v.02l-.005-.01c.005-.01 4.523 5.154 4.523 5.154v4.979l-.005-.005c0 .207.166.373.378.373a.406.406 0 00.237-.09l1.513-1.261v-.005a.37.37 0 00.13-.293V7.847s4.524-4.736 4.524-5.158l.035.058z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
