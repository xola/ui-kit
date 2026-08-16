import React from "react";
import { createIcon } from "./helpers/icon";

export const GlobeIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.001 1.1a5.89 5.89 0 015.9 5.9 5.89 5.89 0 01-5.9 5.9M7 12.9A5.89 5.89 0 011.1 7 5.89 5.89 0 017 1.1"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.8 1.795c-1.895 3.163-1.895 7.248 0 10.41a1.386 1.386 0 002.402 0c1.895-3.162 1.895-7.247 0-10.41a1.386 1.386 0 00-2.402 0zM1.1 7h11.8"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
