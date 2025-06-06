import React from "react";
import { createIcon } from "./helpers/icon";

export const CustomizeColumnsIcon = createIcon((props) => {
    return (
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M13 11.5V15.5"
                stroke="#222324"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path d="M11 13.5H15" stroke="#222324" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
            <rect
                x="2.5"
                y="3.5"
                width="5"
                height="12"
                rx="1"
                stroke="#222324"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M15.5 9.5V4.5C15.5 3.94772 15.0523 3.5 14.5 3.5H13H11.5C10.9477 3.5 10.5 3.94772 10.5 4.5V9.5"
                stroke="#222324"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
});
