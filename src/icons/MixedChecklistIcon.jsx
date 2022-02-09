import React from "react";
import { createIcon } from "../helpers/icon";

export const MixedChecklistIcon = createIcon((props) => {
    return (
        <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" {...props}>
            <path d="M2 4.638l.983.983L5.603 3" stroke="#222324" strokeLinecap="round" strokeLinejoin="round" />
            <rect
                x={2}
                y={8}
                width={4}
                height={4}
                rx={1.333}
                stroke="#222324"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M7.667 4h4M7.667 10h4" stroke="#222324" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});
