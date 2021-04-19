import React from "react";

export const WaitlistIcon = (props) => (
    <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect
            x={2}
            y={2}
            width={4}
            height={4}
            rx={2}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path d="M4 3.333V4l.333.333.167.167" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <rect
            x={2}
            y={8}
            width={4}
            height={4}
            rx={2}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M4 9.333V10l.333.334.167.166M7.667 4h4M7.667 10h4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
