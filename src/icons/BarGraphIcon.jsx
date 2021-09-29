import React from "react";
import { createIcon } from "../helpers/icon";

export const BarGraphIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" fill="none" viewBox="0 0 18 15" {...props}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.475 6.94h-1.98 0A.495.495 0 001 7.435v6.434h2.97V7.435v0a.495.495 0 00-.495-.495v0zM9.889 1h-1.98 0a.495.495 0 00-.495.495v12.374h2.97V1.495v0A.495.495 0 009.889 1v0zM16.303 3.97h-1.98 0a.495.495 0 00-.495.495v9.405h2.97V4.465v0a.495.495 0 00-.495-.495v0z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
});