import React from "react";
import { createIcon } from "../helpers/icon";

export const WaitlistIcon = createIcon((props) => {
    return (
        <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" {...props}>
            <rect
                x={2}
                y={2}
                width={4}
                height={4}
                rx={2}
                stroke="#222324"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M4 3.333V4l.333.333.167.167" stroke="#222324" strokeLinecap="round" strokeLinejoin="round" />
            <rect
                x={2}
                y={8}
                width={4}
                height={4}
                rx={2}
                stroke="#222324"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4 9.333V10l.333.333.167.167M7.667 4h4M7.667 10h4"
                stroke="#222324"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
