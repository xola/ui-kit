import React from "react";
import { createIcon } from "../helpers/icon";

export const CircleKeyIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M10.278 8.22V7M8.312 8.22V7M5.96 6.073a1.311 1.311 0 11-1.853 1.855A1.311 1.311 0 015.96 6.073"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.001 12.819A5.908 5.908 0 0012.818 6c-.4-2.445-2.373-4.417-4.818-4.819A5.907 5.907 0 001.183 8c.4 2.445 2.373 4.418 4.818 4.819zM10.278 7H6.345"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
