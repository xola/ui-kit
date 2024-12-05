import React from "react";
import { createIcon } from "./helpers/icon";

export const ShoppingBagIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" {...props}>
            <path
                d="M13.249 5.5h-8.49a.7.7 0 00-.699.653l-.557 8.354A1.4 1.4 0 004.9 16h8.207a1.4 1.4 0 001.397-1.493l-.557-8.354a.7.7 0 00-.698-.653v0z"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.104 6.9V4.1a2.1 2.1 0 00-2.1-2.1h0a2.1 2.1 0 00-2.1 2.1v2.8"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

ShoppingBagIcon.tags = ["cart", "shopping", "bag", "store"];
