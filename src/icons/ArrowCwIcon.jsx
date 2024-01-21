import React from "react";
import { createIcon } from "./helpers/icon";

export const ArrowCwIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7 11.667A4.667 4.667 0 1111.667 7v.359"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.417 5.833l-1.75 1.75-1.75-1.75"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

ArrowCwIcon.tags = ["clockwise", "right", "rotate"];
