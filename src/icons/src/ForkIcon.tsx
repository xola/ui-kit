import React from "react";
import { createIcon } from "./helpers/icon";

export const ForkIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M4.7 2.023v3.465a2.3 2.3 0 002.31 2.298A2.317 2.317 0 009.31 5.465V2M7.01 2.028V13"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

ForkIcon.tags = ["trident"];
