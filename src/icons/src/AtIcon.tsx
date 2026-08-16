import React from "react";
import { createIcon } from "./helpers/icon";

export const AtIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M9.655 6.9a2.754 2.754 0 11-5.508 0 2.754 2.754 0 015.508 0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.653 6.9v1.18a1.574 1.574 0 003.147 0V6.9a5.9 5.9 0 10-2.36 4.72"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

AtIcon.tags = ["email"];
