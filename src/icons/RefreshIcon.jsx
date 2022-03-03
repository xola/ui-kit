import React from "react";
import { createIcon } from "../helpers/icon";

export const RefreshIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={16} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M4.289 4.083a4.813 4.813 0 018.523 3.061v1.314M11.5 10.446a4.813 4.813 0 01-8.313-3.302v-.875"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.563 6.707l-1.75 1.75-1.75-1.75M1.438 8.019l1.75-1.75 1.75 1.75"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

RefreshIcon.tags = ["switch"];
