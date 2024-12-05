import React from "react";
import { createIcon } from "./helpers/icon";

export const MouseIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" {...props}>
            <path
                d="M9 8.5a1 1 0 01-1-1v-2a1 1 0 012 0v2a1 1 0 01-1 1z"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14 6.5a5 5 0 00-10 0v5a5 5 0 1010 0v-5z"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

MouseIcon.tags = ["pointer", "cursor"];
