import React from "react";
import { createIcon } from "./helpers/icon";

export const WarningTriangleIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M7 8.04V6.17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={7} cy={9.7} r={0.5} fill="currentColor" />
            <path
                d="M8.015 3.55l3.83 6.702a1.169 1.169 0 01-1.015 1.749H3.17c-.897 0-1.46-.97-1.014-1.749l3.83-6.702a1.168 1.168 0 012.029 0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

WarningTriangleIcon.tags = ["exclamation"];
