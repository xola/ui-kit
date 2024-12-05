import React from "react";
import { createIcon } from "./helpers/icon";

export const CircleInfoIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M7 12.9A5.9 5.9 0 117 1.1a5.9 5.9 0 110 11.8z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M7 10.278V7h-.655" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={6.836} cy={4.542} r={0.656} fill="currentColor" />
        </svg>
    );
});
