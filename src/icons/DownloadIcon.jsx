import React from "react";
import { createIcon } from "../helpers/icon";

export const DownloadIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.04 9.36V1.1M10.58 5.82L7.04 9.36 3.5 5.82M3.5 12.9h7.08"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

DownloadIcon.tags = ["arrow"];