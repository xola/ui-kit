import React from "react";
import { createIcon } from "./helpers/icon";

export const SeniorV3Icon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M5.098 2.74a1.864 1.864 0 113.728 0v9.32M8.56 13.125h.532"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

SeniorV3Icon.tags = ["old"];
