import React from "react";
import { createIcon } from "../helpers/icon";

export const CalendarDayIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M12.426 2.87h-9.52a.24.24 0 00-.24.24v8.65c0 .133.108.24.24.24h9.52a.24.24 0 00.24-.24V3.11a.24.24 0 00-.24-.24zM4.84 2v2.174M10.492 2v2.174"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.227 6.227v-.1h-.78l-.024.016-.81.513-.047.03V7.533l.153-.095.616-.386V9.6H8.227V6.227z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={0.2}
            />
        </svg>
    );
});
