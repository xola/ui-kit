import React from "react";
import { createIcon } from "../helpers/icon";

export const CompassIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.9 12.8A5.9 5.9 0 106.9 1a5.9 5.9 0 000 11.8z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.617 5.617l3.792-1.56v0a.257.257 0 01.335.334L8.183 8.183"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.183 8.183L5.618 5.617 4.057 9.41v0a.257.257 0 00.335.335l3.791-1.561z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
