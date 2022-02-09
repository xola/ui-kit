import React from "react";
import { createIcon } from "../helpers/icon";

export const CircleCheckIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M10 5L5.875 9 4 7.182" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M7 12.9A5.9 5.9 0 107 1.1a5.9 5.9 0 000 11.8z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
