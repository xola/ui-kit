import React from "react";
import { createIcon } from "./helpers/icon";

export const DashboardIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M8.08 4.525L6.9 8.065M11.846 10.117v0a8.262 8.262 0 00-9.892 0"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.072 2.728a5.9 5.9 0 11-8.344 8.344 5.9 5.9 0 018.344-8.344"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
