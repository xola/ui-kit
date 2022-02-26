import React from "react";
import { createIcon } from "../helpers/icon";

export const VeteranIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.5 7.642a.6.6 0 01.933-.499L6.667 9.3a.6.6 0 00.666 0l3.234-2.157a.6.6 0 01.933.5V9.93a.6.6 0 01-.267.5l-3.9 2.599a.6.6 0 01-.666 0l-3.9-2.602a.6.6 0 01-.267-.5V7.642zM7.283 1.172L7.9 2.5h1.2a.293.293 0 01.207.513L8.265 4.04l.577 1.324a.314.314 0 01-.448.393L7 4.973l-1.394.784a.314.314 0 01-.448-.393l.577-1.324-1.041-1.026A.293.293 0 014.9 2.5h1.2l.617-1.328a.318.318 0 01.566 0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

VeteranIcon.tags = ["military", "soldier"];