import React from "react";
import { createIcon } from "./helpers/icon";

export const MinusIcon = createIcon((props) => {
    return (
        <svg width="14" height="3" fill="none" viewBox="0 0 14 3" {...props}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
                d="M13.93 1.447H1.071"
            />
        </svg>
    );
});

MinusIcon.tags = ["subtract", "hyphen"];
