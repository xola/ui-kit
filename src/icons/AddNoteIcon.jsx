import React from "react";
import { createIcon } from "../helpers/icon";

export const AddNoteIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M4.295 4.868h4.59M4.295 7.163h2.868M10.75 9v3.5M9 10.75h3.5M11.179 7V3.147c0-.634-.514-1.147-1.148-1.147H3.147C2.513 2 2 2.513 2 3.147v7.458c0 .634.513 1.147 1.147 1.147H7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
