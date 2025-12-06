import React from "react";
import { createIcon } from "./helpers/icon";

export const CircleCrossIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.9 12.8A5.9 5.9 0 106.9 1a5.9 5.9 0 000 11.8zM4.54 9.26l4.72-4.72M9.26 9.26L4.54 4.54"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

CircleCrossIcon.tags = ["x", "close"];
