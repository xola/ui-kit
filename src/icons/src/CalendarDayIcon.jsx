import React from "react";
import { createIcon } from "./helpers/icon";

export const CalendarDayIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M10.333 12.5H3.667C2.747 12.5 2 11.754 2 10.833V4.167c0-.92.746-1.667 1.667-1.667h6.666c.92 0 1.667.746 1.667 1.667v6.666c0 .92-.746 1.667-1.667 1.667zM4.5 1.5v2.174M9.5 1.5v2.174"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.56 6.227v-.1h-.779l-.024.016-.81.513-.047.03V7.533l.153-.095.616-.386V9.6H7.56V6.227z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={0.2}
            />
        </svg>
    );
});

CalendarDayIcon.tags = ["date"];
