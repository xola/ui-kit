import React from "react";

export const EmptyChecklistIcon = (props) => (
    <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect
            x={2}
            y={2}
            width={4}
            height={4}
            rx={1.333}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <rect
            x={2}
            y={8}
            width={4}
            height={4}
            rx={1.333}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path d="M7.667 4h4M7.667 10h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
